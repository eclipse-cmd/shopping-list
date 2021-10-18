import axios from "axios"
import * as helper from "app/helper"
import { toast } from 'react-toastify';
// import { actions as authAction } from "store/reducers/features/AuthSlice"
// import { IDLE } from "store/reducers/features/IsLoadingSlice"

const token = helper.fetchToken()?.token ?? null
export const
    get = (endpoint: string) => {
        return new Promise((resolve, reject) => {
            axios.get(`${process.env.REACT_APP_ENDPOINT}/${endpoint}`, {
                headers: {
                    "x-auth-token": token,
                }
            })
                .then((response) => {
                    resolve(response.data)
                })
                .catch((error) => {
                    reject(error)
                    handleError(error)
                })
        })
    },

    post = (endpoint: string, data: object) => {

        return new Promise((resolve, reject) => {
            axios.post(`${process.env.REACT_APP_ENDPOINT}/${endpoint}`, data, {
                headers: {
                    "x-auth-token": token,
                },
            })
                .then((response) => {
                    resolve(response.data)
                })
                .catch((error) => {
                    reject(error)
                    handleError(error)
                })
        })
    },

    handleError = (error: any) => {
        toast.error(JSON.parse(error.request.response).message, {
            position: "top-center",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
