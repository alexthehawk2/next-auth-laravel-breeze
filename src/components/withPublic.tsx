"use client"
import axios from "@/lib/axios";
import { RootState, setLoading } from "@/store";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const withPublic = (WrappedComponent) => {
    return (props) => {
      const router = useRouter();
      const dispatch = useDispatch()
      const loading = useSelector((state: RootState) => state.loading.value);
      useEffect(() => {
        axios
            .get('/api/user')
            .then(res => {
            //   router.push('/')
              dispatch(setLoading(false))
            })
            .catch(error => {
                if (error.response && error.response.status === 409) {
                    // router.push('/verify-email');
                } else if (error.response && error.response.status === 401) {
                    // Prevent retrying on 401 by explicitly returning null or a fallback value.
                    return null;
                } else {
                    throw error;
                }
            })
      }, [loading]);
  
      if (loading) {
        return <h1>Loading here!</h1>; // full-screen loader here
      }
  
      return <WrappedComponent {...props} />;
    };
  };