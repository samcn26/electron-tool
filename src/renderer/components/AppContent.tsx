import React, { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { Spin } from 'antd';
import { TRoute } from '../routes';

interface AppContentProps {
  routes: TRoute[];
}
const AppContent: React.FC<AppContentProps> = ({ routes }) => {
  const RoutesComponent = useRoutes(routes);

  return <Suspense fallback={<Spin />}>{RoutesComponent}</Suspense>;
};

export default AppContent;
