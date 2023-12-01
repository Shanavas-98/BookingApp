import { useState } from 'react'
import { Link } from 'react-router-dom'
import { register } from '../api/userApi';

function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    async function registerUser(e){
        try {
            e.preventDefault();
            const formData = {
                name,
                email,
                password
            }
            const {data} = await register(formData);
            console.log('new user',data);
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div className="m-auto pt-20">
            <h1 className="text-4xl text-center">Register</h1>
            <form 
            className="max-w-xl mx-auto border border-gray-500"
            onSubmit={registerUser}>
                <input
                    type="text"
                    name="username"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)} />
                <input
                    type="email"
                    name="email"
                    placeholder="user@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                <input
                    type="password"
                    name="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" className="primary">Register</button>
                <div className="text-center py-2">
                    Already have an account?
                    <Link to="/login" className="text-blue-500">Login</Link>
                </div>
            </form>
        </div>
    )
}

export default RegisterPage