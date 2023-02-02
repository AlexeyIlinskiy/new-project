import { FC } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useSelector } from '../../services/hooks/hooks';

export const ProtectedRoute: FC<RouteProps & { children: React.ReactNode }> = ({ children, ...rest }) => {
  const { isAuth } = useSelector((store) => store.authReducer);

  return (
    <Route
      {...rest}
      render={({ location }) => (
        isAuth
          ? (children)
          : (
            <Redirect to={{
              pathname: '/login',
              state: { from: location },
            }}
            />
          )
      )}
    />
  );
}