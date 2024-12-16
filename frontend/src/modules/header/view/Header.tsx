import { collectionRoute, communityRoute, mainRoute } from '@settings/routing';
import { AddIcon, HomeIcon } from '@shared/icons';
import { Button, IconButton } from '@shared/ui/Button';
import { NavigationLink } from '@shared/ui/Link';
import { Link } from 'atomic-router-react';

import st from './Header.module.scss';

function Header() {
  return (
    <header className={st.header}>
      <div className={st.primary}>
        <Link className={st.logo} to={mainRoute}>
          {'Flippo'}
        </Link>
        <Button iconLeft={<AddIcon type={'set'} />} size={'large'} variant={'primary'}>
          {'Создать набор'}
        </Button>
      </div>

      <nav>
        <ul>
          <li>
            <NavigationLink icon={<HomeIcon />} size={'large'} title={'Главная'} to={mainRoute} />
          </li>
          <li>
            <NavigationLink icon={<HomeIcon />} size={'large'} title={'Сообщество'} to={communityRoute} />
          </li>
          <li>
            <NavigationLink icon={<HomeIcon />} size={'large'} title={'Коллекция'} to={collectionRoute} />
          </li>
        </ul>

        <section aria-labelledby={'recent-header'} className={st.recentSection}>
          <h3 id={'recent-header'}>{'Недавние'}</h3>
          <ul></ul>
        </section>

        <section aria-labelledby={'your-folders-header'} className={st.folderSection}>
          <div>
            <h3 id={'your-folders-header'}>{'Ваши папки'}</h3>
            <IconButton aria-label={'Add folder'} size={'small'} variant={'label'}>
              <AddIcon />
            </IconButton>
          </div>
          <ul aria-labelledby={'your-folders-header'}></ul>
        </section>
      </nav>
    </header>
  );
}

export default Header;
