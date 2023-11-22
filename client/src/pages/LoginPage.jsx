// import React from 'react'

import { useState } from "react"
import { Link } from "react-router-dom"
import { login } from "../api/userApi";
function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  async function loginUser(e){
    try {
      e.preventDefault()
      const {data} = await login({email,password});
      console.log('user',data);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="m-auto pt-20">
      <h1 className="text-4xl text-center">Login</h1>
      <form onSubmit={loginUser} className="max-w-xl mx-auto border border-gray-500">
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
        <button className="primary">Login</button>
        <div className="text-center py-2">
          Don&apos;t have an account?
          <Link to="/register" className="text-blue-500">Register Now</Link>
        </div>
      </form>
    </div>
  )
}

export default LoginPage