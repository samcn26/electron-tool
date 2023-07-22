import { lazy } from 'react';

// example
const ExampleUser = lazy(() => import('./User'));
const ExampleProfile = lazy(() => import('./Profile'));
const ExampleNest1 = lazy(() => import('./Nest1'));
const ExampleNest1C = lazy(() => import('./Nest1C'));
const ExampleNest2 = lazy(() => import('./Nest2'));
const Example403 = lazy(() => import('./Page403'));
const ExampleAuthGuard = lazy(() => import('./AuthGuard'));
// eslint-disable-next-line import/no-cycle
const ExampleNav = lazy(() => import('./Nav'));

const exampleRoutes = [
  {
    path: '/example',
    element: <ExampleNav />,
    name: 'Example',
    exact: true,
    children: [
      {
        path: '/example/user',
        element: <ExampleUser />,
        exact: true,
        name: 'Example User',
      },
      {
        path: '/example/profile',
        element: <ExampleProfile />,
        exact: true,
        name: 'Example Profile',
      },
      {
        path: '/example/nest',
        element: <ExampleAuthGuard />,
        children: [
          {
            path: '/example/nest/nest1',
            element: <ExampleNest1 />,
            exact: true,
            children: [
              {
                path: '/example/nest/nest1/nest1c',
                element: <ExampleNest1C />,
                exact: true,
              },
            ],
          },
          {
            path: '/example/nest/nest2',
            element: <ExampleNest2 />,
            exact: true,
          },
        ],
      },
      {
        path: '/example/403',
        element: <Example403 />,
        exact: true,
      },
    ],
  },
];

export default exampleRoutes;
