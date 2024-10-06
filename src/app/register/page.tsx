"use client"

import { useAuth } from "@/hooks/auth"
import { useState } from "react"

export default function Register() {
    const { register } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/'
    })

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        register({ setErrors, name, email, password, password_confirmation: password })
    }

    return <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold">Register</h1>
        <form className="flex flex-col items-center justify-center" onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Register</button>
        </form>
    </div>
}