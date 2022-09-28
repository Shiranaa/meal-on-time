import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleRequest } from "../../services/apiService";
import Title from "../Title/Title";

function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function submit() {
        const data = {
            name,
            email,
            password,
        };

        handleRequest('users/signup', data)
            .then(res => {
                // console.log('registered');
                navigate('/login');
            })
    }

    return (
        <div className="p-3 form-max-w m-auto">

            <Title text="Sign Up" />

            <div className="mb-3">
                <input
                    className="form-control"
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <input
                    className="form-control"
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <input
                    className="form-control"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <button
                onClick={submit}
                className="btn btn-primary btn-lg w-100">
                Sign Up
            </button>
        </div>
    );
}

export default SignUp;