import React, { useState } from 'react'
import * as actions from "store/actions"
import { useAppDispatch } from 'app/hooks'
import {
    Button,
    Modal,
    Form
} from 'react-bootstrap'
import { actions as ItemAction } from "store/reducers/features/ItemSlice"

interface Props {
    show: boolean
    onHide: any
}

const ItemModal: React.FC<Props> = ({ show, onHide }) => {
    const
        dispatch = useAppDispatch(),
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
            const newItem = {
                name: formData.item
            }
            //Make request to the backend
            actions.post('item', newItem).then((response: any) => {
                dispatch(ItemAction.ADD_ITEMS(response.data))
            })
            handleClose()
        }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Item To Shopping List</Modal.Title>
            </Modal.Header>
            <Form onSubmit={submitForm}>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" autoFocus name="item" placeholder="Enter list name" onChange={handleChange} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" style={{ width: "100%" }} type="submit">
                        Save Item
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}
export default ItemModal