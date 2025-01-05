import type Surreal from 'surrealdb';

import { createMutation, createQuery } from '@farfetched/core';
import { $db } from '@settings/surreal';
import { createFormInput } from '@shared/factories';
import { displayRequestError, displayRequestSuccess, type TTranslationOptions } from '@widgets/ToastNotification';
import { createEffect, createEvent, createStore, sample, type StoreWritable } from 'effector';
import { and, not, reset } from 'patronum';
import { z } from 'zod';

const $modalRef = createStore<HTMLDialogElement | null>(null);
export const modalRefChanged = createEvent<HTMLDialogElement>();

const NameSchema = z.string().min(1, 'empty');
export const input = createFormInput('name', '', NameSchema);

export const createFolder = createEvent();
export const closeModal = createEvent();
const closeModalFx = createEffect<HTMLDialogElement | null, void>((ref) => ref?.close());

const countDuplicateMut = createQuery<[{ db: Surreal; name: string }], number>({
  handler: async ({ db, name }) => {
    const [result] = await db.query<[{ count: number }]>(
      /* surql */ `
        SELECT count() as count FROM folder WHERE $auth.id = author 
          AND string::matches(name, $name) GROUP ALL
        ;
      `,
      {
        name: `^${name.trim()}(?: \\(\\d+\\))?$`
      }
    );

    return result.count;
  }
});

const createFolderMut = createMutation<{ db: Surreal; name: string }, void>({
  handler: async ({ db, name }) => {
    await db.query(
      /*surql */ `
        CREATE folder CONTENT {
          name: string::trim($name)
s        }
      `,
      {
        name
      }
    );
  }
});

export const $creationInProgress = and(countDuplicateMut.$pending, createFolderMut.$pending);

// Change modal ref
$modalRef.on(modalRefChanged, (_, ref) => ref);

// Reset model
reset({ clock: closeModal, target: [input.$nameInput, input.$nameInputError, input.$nameInputRef, $modalRef] });
sample({ clock: closeModal, target: [countDuplicateMut.reset, createFolderMut.reset] });

// Close modal
sample({ clock: closeModal, source: $modalRef, filter: (ref) => !!ref, target: closeModalFx });

// Checking the entered name
sample({
  clock: createFolder,
  target: input.nameInputValidate
});

// Check the have duplicate names
sample({
  clock: createFolder,
  source: { db: $db as StoreWritable<Surreal>, name: input.$nameInput },
  filter: and(not(input.$nameInputError), $db, not($creationInProgress)),
  target: countDuplicateMut.start
});

// Create folder
sample({
  clock: countDuplicateMut.finished.success,
  source: { db: $db as StoreWritable<Surreal>, name: input.$nameInput },
  filter: ({ db }) => !!db,
  fn: ({ db, name }, { result }) => {
    if (result > 0) name += ` (${result})`;

    return { db, name };
  },
  target: createFolderMut.start
});

sample({
  clock: countDuplicateMut.finished.failure,
  source: { db: $db as StoreWritable<Surreal>, name: input.$nameInput },
  filter: ({ db }) => !!db,
  target: createFolderMut.start
});

// If success created folder
sample({ clock: createFolderMut.finished.success, target: closeModal });
sample({
  clock: createFolderMut.finished.success,
  fn: ({ params: { name } }): TTranslationOptions<'modal'> => [
    'createFolder.success.success_create',
    { ns: 'modal', name }
  ],
  target: displayRequestSuccess
});

// If fail created folder
sample({ clock: createFolderMut.finished.failure, target: closeModal });
sample({
  clock: createFolderMut.finished.failure,
  fn: (): TTranslationOptions<'modal'> => ['createFolder.error.fail_create', { ns: 'modal' }],
  target: displayRequestError
});
