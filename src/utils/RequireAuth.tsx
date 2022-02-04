import { useContext, useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { AuthContext } from '../context/AuthContext';

export default function RequireAuth() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        if (user) {
          setIsAuth(true);
          setUser(user);
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    if (isAuth) {
      return <Outlet />;
    } else {
      return <Navigate to="/" state={{ from: location }} />;
    }
  }
}
