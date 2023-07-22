import { NavLink, Outlet } from 'react-router-dom';
// eslint-disable-next-line import/no-cycle
import exampleRoutes from './exampleRoutes';
import { TRoute } from '../../routes';
// import { startTransition } from 'react'
// import { useNavigate } from 'react-router-dom'

function Navigation() {
  const getExampleRoute = (routes: TRoute[]) => {
    const res: string[] = [];

    routes.forEach((route) => {
      const { children, path } = route;
      res.push(path);
      if (children) {
        res.push(...getExampleRoute(children));
      }
    });

    return res;
  };

  const routes = getExampleRoute(exampleRoutes);
  //   const navigate = useNavigate()

  //   const handleClick = (route: string) => {
  //     startTransition(() => {
  //       navigate(route)
  //     })
  //   }

  return (
    <>
      <nav>
        <ul>
          {routes.map((route, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={index}>
              <NavLink to={route}>{route}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <Outlet />
    </>
  );
}

export default Navigation;
