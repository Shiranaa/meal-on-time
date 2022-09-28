import { Navigate } from 'react-router-dom';
import { verifyToken } from '../../services/auth';

const PrivateRoute = (props: { children: React.ReactNode }): JSX.Element => {
    const { children } = props;
    const isLoggedIn = verifyToken();

    return isLoggedIn ? (
        <>{children}</>
    ) : (
        <Navigate
            replace={true}
            to="/login"
        />
    )
}

export default PrivateRoute;