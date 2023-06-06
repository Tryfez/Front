import React, {useEffect, useCallback, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {fetchTasks, createColumn, fetchTasksByUser, subscribeToFetchTasks} from "../store/tasks.slice.js";
import Column from "../components/Column/index.jsx";
import './tasks.css'
import {Alert, Button} from 'react-bootstrap';

const Tasks = () => {
  const dispatch = useDispatch()
  const columns = useSelector((state) => state.tasks.tasks)
  const user = useSelector((state) => state.auth.user)
  const notify = useSelector((state) => state.tasks.notification)

  const [query, setQuery] = useState('')
  const [showNotify, setShowNotify] = useState(false);

  const addColumnHandler = useCallback(async () => {
    await dispatch(createColumn({title: 'Новая колонка', description: 'Новая колонка'}))
  }, [dispatch])

  useEffect(() => {
    dispatch(subscribeToFetchTasks({user}))
  }, [])

  useEffect(() => {
    if (notify.user && notify.task) {
      setShowNotify(true);
    }
  }, [notify])

  useEffect(() => {
    if (!user) {
      return;
    }

    if (user.is_moderator) {
      dispatch(fetchTasks())
      return;
    }

    dispatch(fetchTasksByUser({user: user, query: query.trim() ? query : undefined}))
  }, [dispatch, query, user])

  return (
      <>
        <input
          className='input__query'
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />

        <Alert show={showNotify} variant="warning">
          <Alert.Heading>Внимание!</Alert.Heading>
          {
            (notify.user && notify.task) &&
            <p className="font-bold mt-2">
              Пользователь {notify.user.email} изменил задачу {notify.task.title}
            </p>
          }
          <div className="d-flex justify-content-end mt-4">
            <Button
              onClick={() => setShowNotify((prev) => !prev)}
              variant="outline-success"
            >
              Принял
            </Button>
          </div>
        </Alert>

        <div className='flex gap-x-2 overflow-y-scroll'>
          {columns?.map(column => <Column key={column.id} column={column}/>)}
          {
              user?.is_moderator &&
              <Column>
                <div className='plus' onClick={addColumnHandler}/>
              </Column>
          }
        </div>
      </>
  )
}

export default Tasks