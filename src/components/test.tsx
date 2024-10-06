'use client'
import axios from '@/lib/axios';
import {  RootState, setLoading, setUser } from '@/store';
import { useRouter, redirect } from 'next/navigation';
// react functional component with children prop
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface TestProps {
  children: React.ReactNode;
}

const Test: React.FC<TestProps> = ({ children }) => {
    const router = useRouter()
    const loading = useSelector((state: RootState) => state.loading.value); // Type your state
    const dispatch = useDispatch()
    useEffect(() => {
        axios
            .get('/api/user')
            .then(res => {
              if(res.status === 200){
                dispatch(setUser(res.data))
                dispatch(setLoading(false))
                router.push('/')
              }
            })
            .catch(error => {
              console.log(error)
                if (error.response && error.response.status === 409) {
                    // router.push('/verify-email');
                } else if (error.response && error.response.status === 401) {
                  dispatch(setUser(null))
                  dispatch(setLoading(false))
                  router.push('/login')
                } else {
                    throw error;
                }
            })
    }, [router, loading])
    if(loading) {
      return <div>Loading...</div>
    }
    if(!loading){
      return children
    }
};

export default Test;