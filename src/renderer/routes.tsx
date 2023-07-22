import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

// eslint-disable-next-line import/no-cycle
import exampleRoutes from './views/example/exampleRoutes';
import NotFoundPage from './views/404/NotFound';

const AlgoSuiteTool = lazy(() => import('./views/TestTool/AlgoSuite'));

export type TRoute = {
  path: string;
  name?: string;
  children?: TRoute[];
  parent?: TRoute;
  [key: string]: any;
};
const routes: TRoute[] = [
  {
    path: '/tool',
    name: 'Test Tool',
    active: true,
    children: [
      {
        path: '/tool/algo',
        name: 'AlgoSuite',
        element: <AlgoSuiteTool />,
      },
    ],
  },
  {
    path: '/',
    element: <Navigate to="/tool/algo" />,
  },
  { path: '*', element: <NotFoundPage /> },
  ...exampleRoutes,
];

export default routes;
