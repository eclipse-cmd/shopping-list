import React from 'react'
import { actions as authAction } from "../store/reducers/features/AuthSlice"
import { useAppDispatch } from 'app/hooks'
import {
    Navbar,
    Container,
    Nav,
} from "react-bootstrap"
interface Props {
    showCreateAccountModal: any,
    isAuth: boolean
}

const AppNavbar: React.FC<Props> = ({ isAuth, showCreateAccountModal }) => {
    const
        dispatch = useAppDispatch(),
        logOut = () => {
            dispatch(authAction.AUTH_FAILED())
            window.location.reload()
        },
        showCreateAccount = () => {
            showCreateAccountModal(true)
        }


    return (
        <Navbar collapseOnSelect expand="sm" bg="dark" className="mb-5" variant="dark">
            <Container>
                <Navbar.Brand href="/">Shopping List</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" className="box-shadow-0" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    </Nav>
                    <Nav>
                        {
                            isAuth ? (
                                <Nav.Link type="button" onClick={logOut}>Logout</Nav.Link>
                            ) : (
                                <Nav.Link type="button" onClick={showCreateAccount}>Register</Nav.Link>
                            )
                        }
                        <Nav.Link href="https://github.com/eclipse-cmd" target="_blank">Github</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
export default AppNavbar