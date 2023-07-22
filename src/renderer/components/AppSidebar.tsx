import React, { useMemo } from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import routes, { TRoute } from '../routes';

interface Props {}
type MenuItem = Required<MenuProps>['items'][number];
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const AppSideBar: React.FC<Props> = () => {
  const navigate = useNavigate();
  const items: MenuItem[] = useMemo(() => {
    const activeRoutes = routes.filter((route) => route.active);

    function makeItems(pRoutes: TRoute[]) {
      const res: MenuItem[] = [];
      pRoutes.forEach((route) => {
        if (route.children) {
          res.push(
            getItem(
              route.name,
              route.path,
              route.icon,
              makeItems(route.children)
            )
          );
        } else {
          res.push(getItem(route.name, route.path, route.icon));
        }
      });

      return res;
    }

    return makeItems(activeRoutes);
  }, []);

  return (
    <Menu
      theme="dark"
      defaultSelectedKeys={['/tool/algo']}
      defaultOpenKeys={['/tool']}
      mode="inline"
      items={items}
      onClick={({ key }) => {
        navigate(key);
      }}
    />
  );
};

export default AppSideBar;
