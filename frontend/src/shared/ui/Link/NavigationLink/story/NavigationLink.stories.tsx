import { HomeIcon } from '@shared/icons';
import { type Meta, type StoryObj } from '@storybook/react';
import { createHistoryRouter, createRoute, type UnmappedRouteObject } from 'atomic-router';
import { createRoutesView, RouterProvider } from 'atomic-router-react';

import { type TNavigationLinkProps } from '../types/TNavigationLinkProps';
import { default as NavigationLink } from '../ui/NavigationLink';
import st from './Decorator.module.scss';

const meta: Meta<TNavigationLinkProps<object>> = {
  args: {
    icon: <HomeIcon />,
    title: 'Main'
  },
  argTypes: {
    icon: { control: false, description: 'Icon to display on the left relative to the link.' },
    size: { control: 'select', description: 'The size of the link.', options: ['large', 'small'] },
    title: { control: 'text', description: 'The text content of the link.' },
    to: {
      control: false,
      description: 'The redirect address an instance of RouteInstance.'
    }
  },
  component: NavigationLink,
  parameters: {
    docs: {
      description: {
        component:
          'The Navigation Link component is used for site navigation and is a wrapper over the Link from the atomic-router-react library (https://atomic-router.github.io/react/api/link.html ).'
      }
    }
  },
  title: 'UIKit/Link/NavigationLink'
};

export default meta;

type NavigationLinkStory = StoryObj<typeof NavigationLink>;

export const Default: NavigationLinkStory = {
  render: () => <WithRouter />
};

function WithRouter() {
  const storyRoute1 = createRoute<{ number: number }>();

  const storyRoutes: UnmappedRouteObject<any>[] = [
    {
      path: '/main_link_1/:number',
      route: storyRoute1
    }
  ];

  const RoutesView = createRoutesView({
    otherwise() {
      return <div className={st.text}>{'Page not found!'}</div>;
    },
    routes: [{ route: storyRoute1, view: () => <div className={st.text}>{'Link 1'}</div> }]
  });

  const storyRouter = createHistoryRouter({ routes: storyRoutes });

  return (
    <RouterProvider router={storyRouter}>
      <NavigationLink
        icon={<HomeIcon />}
        params={{ number: 1 }}
        query={{ number: 1, path: '/story/uikit-link-navigationlink--default' }}
        title={'Main'}
        to={storyRoute1}
      />
      <RoutesView />
    </RouterProvider>
  );
}
