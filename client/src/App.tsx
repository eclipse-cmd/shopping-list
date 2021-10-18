import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { actions as authAction } from "store/reducers/features/AuthSlice"
import * as actions from "store/actions"
import { ToastContainer } from 'react-toastify';
import AppNavbar from 'components/Navbar'
import ShoppingList from 'components/ShoppingList';
import RegisterModal from 'components/modal/RegisterModal';
import LoginModal from 'components/modal/LoginModal';
import { setToken } from 'app/helper';

interface Props { }

const App: React.FC<Props> = () => {
  const
    dispatch = useAppDispatch(),
    isAuth = useAppSelector((state) => state.auth.isAuth),
    [createAccountModal, setCreateAccountModal] = useState<boolean>(false),
    [loginModal, setLoginModal] = useState<boolean>(false),
    [openPage, setOpenPage] = useState<boolean>(true)

  useEffect(() => {
    actions.get('user')
      .then((response: any) => {
        if (response.status) {
          setToken(response.data)
          dispatch(authAction.AUTH_SUCCESS(response.data))
        }
        setOpenPage(false)
      })
      .catch(() => {
        dispatch(authAction.USER_NOT_LOADING())
        dispatch(authAction.AUTH_FAILED())
        setOpenPage(false)
      })
  }, [dispatch])
  return (
    <>
      <ToastContainer limit={1} />
      <AppNavbar isAuth={isAuth} showCreateAccountModal={setCreateAccountModal} />
      {
        !openPage && isAuth ? (
          <ShoppingList />
        ) : (<></>)
      }
      {
        !openPage && !isAuth ? (
          <div className="dis-view-exit">
            <h4 className="mb-1">You are logged out.</h4>
            <p className="mb-4">Please login to view your shopping list.</p>
            <button type="button" className="btn btn-dark" onClick={() => setLoginModal(true)}>Login</button>
          </div>
        ) : (<></>)
      }
      <RegisterModal show={createAccountModal} onHide={setCreateAccountModal} />
      <LoginModal show={loginModal} onHide={setLoginModal} />
    </>
  );
}

export default App