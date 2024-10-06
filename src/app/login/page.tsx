"use client"

import Login from "@/components/login"
import { withPublic } from "@/components/withPublic"
// import { useAuth } from "@/hooks/auth"
import { RootState } from "@/store"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useSelector } from "react-redux"

export default function Page() {
    const loading = useSelector((state: RootState) => state.loading.value);
    const user = useSelector((state: RootState)=> state.user.value) 
    console.log(user)
    const router = useRouter()
    
    if(user && user.id){
        router.push('/')
        return
    }
    return <Login />
}
