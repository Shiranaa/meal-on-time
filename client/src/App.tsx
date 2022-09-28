import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/auth/Login';
import PrivateRoute from './components/auth/PrivateRoute';
import SignUp from './components/auth/SignUp';
// import Counter from './Counter/Counter';
import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import Order from './components/Order/Order';
import UpdateItem from './components/UpdateItem/UpdateItem';

function App() {
    return (
        // <Counter initCounter={50} />
        <>
            <Header />

            <Routes>
                <Route
                    path='/'
                    element={
                        <PrivateRoute>
                            <Menu defaultDisplay='grid' />
                        </PrivateRoute>
                    }
                />
                <Route
                    path='/update/:id'
                    element={
                        <PrivateRoute>
                            <UpdateItem />
                        </PrivateRoute>
                    }
                />
                <Route
                    path='order'
                    element={
                        <PrivateRoute>
                            <Order />
                        </PrivateRoute>
                    }
                />
                <Route
                    path='login'
                    element={<Login />}
                />
                <Route
                    path='signup'
                    element={<SignUp />}
                />
            </Routes>
        </>
    );
}

export default App;
