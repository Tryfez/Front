import React, {useEffect, useState} from 'react';
import {Button, Form, Dropdown} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {fetchColumns, createTask} from "../../store/tasks.slice.js";
import {fetchAllUsers} from "../../store/auth.slice.js";

const CreateTaskForm = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.auth.users)
  const columns = useSelector(state => state.tasks.columns)

  useEffect(() => {
      dispatch(fetchColumns())
      dispatch(fetchAllUsers())
  }, [dispatch])

  const initialState = {
    title: '',
    description: '',
    finished_at: '',
    column_id: null,
    user_id: null
  }

  const [taskData, setTaskData] = useState(initialState)

  const createTaskHandler = async () => {
    const data = {
      ...taskData,
      finished_at: taskData.finished_at.length ? taskData.finished_at : undefined
    }
    await dispatch(createTask(data))

    setTaskData(initialState)
  }

  return (
      <Form className='submit__form'>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className='text-white text-bold'>Название таски</Form.Label>
          <Form.Control
              placeholder="Введите название"
              value={taskData.title}
              onChange={event => setTaskData({...taskData, title: event.target.value})}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className='text-white text-bold'>Описание таски</Form.Label>
          <Form.Control
              placeholder="Введите описание"
              value={taskData.description}
              onChange={event => setTaskData({...taskData, description: event.target.value})}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className='text-white text-bold'>Введите дедлайн</Form.Label>
          <Form.Control
              type='date'
              value={taskData.finished_at}
              placeholder="Введите дедлайн"
              onChange={event => setTaskData({...taskData, finished_at: event.target.value})}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className='text-white text-bold'>Выберите столбец</Form.Label>
          <Dropdown className='w-100'>
            <Dropdown.Toggle variant="success" className='w-100 border-white' id="dropdown-basic">
              {columns?.find(column => column.id === taskData.column_id)?.title || 'Выберите столбец'}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <>
                {columns?.map(column =>
                    <Dropdown.Item onClick={() => setTaskData({...taskData, column_id: column.id})} key={column.id} id={column.id}>
                      {column.title}
                    </Dropdown.Item>
                )}
              </>
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className='text-white text-bold'>Выберите пользователя</Form.Label>
          <Dropdown className='w-100'>
            <Dropdown.Toggle variant="success" className='w-100 border-white' id="dropdown-basic">
              {users?.find(user => user.id === taskData.user_id)?.email || 'Выберите пользователя'}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <>
                {users?.map(user =>
                    <Dropdown.Item onClick={() => setTaskData({...taskData, user_id: user.id})} key={user.id} id={user.id}>
                      {user.email}
                    </Dropdown.Item>
                )}
              </>
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>

        <Button
            className='bg-success'
            variant="success"
            onClick={createTaskHandler}
        >
          Создать
        </Button>
      </Form>
  );
};

export default CreateTaskForm;