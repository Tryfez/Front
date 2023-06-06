import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Form, Button, Alert} from "react-bootstrap";
import {login} from "../../store/auth.slice.js";
import '../RegistrationForm/index.css'

function RegistrationForm() {
  const dispatch = useDispatch()

  const error = useSelector((state) => state.auth.error)

  useEffect(() => {
    if (error) {
      setShowError(true)
    }
  }, [error])

  const [showError, setShowError] = useState(false)
  const [authData, setAuthData] = useState({
    email: '',
    password: '',
  })

  const submit = async (event) => {
    event.preventDefault()
    try {
      await dispatch(login(authData))
    } catch (e) {
      console.error(e)
    }
  }

  return (
      <>
        <Alert show={showError} variant="danger">
          <Alert.Heading>Ошибочка!</Alert.Heading>
          <p>
            Неверный логин или пароль
          </p>
          <hr />
          <div className="d-flex justify-content-end mt-4">
            <Button
                onClick={() => setShowError((prev) => !prev)}
                variant="outline-danger"
            >
              Принял
            </Button>
          </div>
        </Alert>

        <Form onSubmit={submit} className='submit__form'>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className='text-white font-bold'>Введите email</Form.Label>
            <Form.Control
                type="email"
                placeholder="Введите email"
                onChange={event => setAuthData({...authData, email: event.target.value})}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className='text-white font-bold'>Введите пароль</Form.Label>
            <Form.Control
                type="password"
                placeholder="Введите пароль"
                onChange={event => setAuthData({...authData, password: event.target.value})}
            />
          </Form.Group>
          <Button
              className='bg-success'
              variant="success"
              onClick={submit}
          >
            Войти
          </Button>
        </Form>
      </>
  );
}

export default RegistrationForm;