import React, { useState, useEffect } from 'react'
import * as actions from "store/actions"
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { Container, ListGroup, ListGroupItem, Button } from "react-bootstrap"
import { CSSTransition, TransitionGroup } from "react-transition-group"
import { connect } from "react-redux"
import { actions as ItemAction } from 'store/reducers/features/ItemSlice'
import { IDLE, ACTIVE } from 'store/reducers/features/IsLoadingSlice'
import ItemModal from './modal/AddItemModal'


interface Props {
    items?: Array<object>
}

const ShoppingList: React.FC<Props> = ({ items }) => {
    const
        dispatch = useAppDispatch(),
        isLoading = useAppSelector(state => state.isLoading.value),
        [addItemModal, setAddItemModal] = useState<boolean>(false),

        //Functions
        deleteItem = (id: string) => {
            actions.post('item/delete', { id }).then((response: any) => {
                if (response.status) {
                    dispatch(ItemAction.DELETE_ITEM(id))
                }
            })
        }

    useEffect(() => {
        dispatch(ACTIVE())
        actions.get('item')
            .then((response: any) => {
                dispatch(ItemAction.SET_ITEMS(response.data))
                dispatch(IDLE())
            })
    }, [dispatch])

    
    return (
        <>
            <Container>
                <Button
                    variant="dark"
                    style={{ marginBottom: "2rem" }}
                    onClick={() => setAddItemModal(true)}
                >Add Items</Button>
                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        {
                            items?.map((item: any) => (
                                <CSSTransition in={true} key={item._id} timeout={500} className="my-node">
                                    <ListGroupItem style={{ textTransform: "capitalize" }}>
                                        <Button
                                            className="remove-btn"
                                            variant="danger"
                                            size="sm"
                                            onClick={() => deleteItem(item._id)}
                                        >
                                            &times;</Button>
                                        {item.name}
                                    </ListGroupItem>
                                </CSSTransition>
                            ))
                        }
                        {
                            isLoading === true ? (
                                <div className="loader">
                                    <img src="./assets/img/35.gif" alt="loader.gif" />
                                    <span>Loading...</span>
                                </div>
                            ) : (<></>)
                        }
                        {
                            !isLoading && (!items || items.length < 1) ? (
                                <div style={{ textAlign: "center" }} >No items found</div>
                            ) : (<></>)
                        }
                    </TransitionGroup>
                </ListGroup>
            </Container>

            {/* Modals */}
            <ItemModal show={addItemModal} onHide={setAddItemModal} />
        </>
    );
}

const mapState = (state: any) => ({
    items: state.items.value
})

export default connect(mapState, {})(ShoppingList)