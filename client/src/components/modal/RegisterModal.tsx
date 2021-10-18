
import React, { useState } from 'react'
import * as actions from "store/actions"
import { useAppDispatch, useAppSelector } from 'app/hooks'
import {
    Button,
    Modal,
    Form
} from 'react-bootstrap'
import { toast } from 'react-toastify';
import { actions as authAction } from "store/reducers/features/AuthSlice"


interface Props {
    show: boolean
    onHide: any
}

const RegisterModal: React.FC<Props> = ({ show, onHide }) => {
    const
        dispatch = useAppDispatch(),
        isLoadingUser = useAppSelector((state) => state.auth.isLoading),
        [formData, setFormData] = useState<any>({}),

        //Functions
        handleClose = () => {
            onHide(false)
        },
        handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData({ ...formData, [e.target.name]: e.target.value.trim() })
        },
        submitForm: React.FormEventHandler<HTMLFormElement> = (e: React.FormEvent) => {
            e.preventDefault()
            dispatch(authAction.USER_LOADING())
            toast.clearWaitingQueue()
            const userData = { ...formData }

            //Make request to the backend
            actions.post('user/create-account', userData).then((response: any) => {
                toast.success("You have been authenticated successfully", {
                    position: "top-center",
                    autoClose: 10000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                dispatch(authAction.AUTH_SUCCESS(response.data))
                handleClose()
            })
        }

    return (
        <Modal
            show={show}
            onHide={handleClose}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Register A New Account</Modal.Title>
            </Modal.Header>
            <Form onSubmit={submitForm}>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="formBasisName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" name="first_name" placeholder="Enter first name" required onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" name="last_name" placeholder="Enter last name" required onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" placeholder="Enter email address" required onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" placeholder="Enter password" required onChange={handleChange} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" style={{ width: "100%" }} type="submit">
                        {
                            isLoadingUser ?
                                (
                                    <span>Creating account...</span>
                                ) :
                                (
                                    <span>Create a account</span>
                                )
                        }
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}
export default RegisterModal