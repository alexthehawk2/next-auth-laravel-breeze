"use client"

import { useAuth } from "@/hooks/auth";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
export default function Login(){
    const {login} = useAuth()
    const router = useRouter();
    const dispatch = useDispatch()
    const loading = useSelector((state: RootState) => state.loading.value);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)
    // const loading = useSelector((state: RootState) => state.loading.value);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        login({ setErrors, setStatus, email, password })
    }
    if(loading) return <div>loading</div>
    return <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold">Login</h1>
        <form className="flex flex-col items-center justify-center" onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Login</button>
        </form>
    </div>
}