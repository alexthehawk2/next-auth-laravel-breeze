/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import useSWR from 'swr'
import axios from '@/lib/axios'
import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { decrement, increment } from '@/store'
export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
    const router = useRouter()
    const params = useParams()
    // const dispatch = useDispatch();
    const { data: user, error, mutate, isLoading, isValidating } = useSWR('/api/user', () => {
        // dispatch(increment())
        return axios
            .get('/api/user')
            .then(res => {
                router.push('/')
                // dispatch(decrement())
                return res.data
            })
            .catch(error => {
                if (error.response && error.response.status === 409) {
                    router.push('/verify-email');
                } else if (error.response && error.response.status === 401) {
                    // Prevent retrying on 401 by explicitly returning null or a fallback value.
                    return null;
                } else {
                    throw error;
                }
            }),
            { revalidateOnFocus: false,
                revalidateOnReconnect: false,
                refreshWhenOffline: false,
                refreshWhenHidden: false,
                refreshInterval: 0,
            }
})

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const register = async ({ setErrors, ...props }) => {
        await csrf()

        setErrors([])

        axios
            .post('/register', props)
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const login = async ({ setErrors, setStatus, ...props }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/login', props)
            .then(() => {
                router.push('/')
                mutate()
            })
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const forgotPassword = async ({ setErrors, setStatus, email }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/forgot-password', { email })
            .then(response => setStatus(response.data.status))
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const resetPassword = async ({ setErrors, setStatus, ...props }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/reset-password', { token: params.token, ...props })
            .then(response =>
                router.push('/login?reset=' + btoa(response.data.status)),
            )
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const resendEmailVerification = ({ setStatus }) => {
        axios
            .post('/email/verification-notification')
            .then(response => setStatus(response.data.status))
    }

    const logout = async () => {
        if (!error) {
            await axios.post('/logout').then(() => mutate())
        }

        window.location.pathname = '/login'
    }

    

    return {
        user,
        register,
        login,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout,
        isLoading,
    }
}