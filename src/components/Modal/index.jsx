import React, {useCallback} from "react";
import Button from 'react-bootstrap/Button';
import {useDispatch} from "react-redux";
import Modal from 'react-bootstrap/Modal';
import {deleteUserFromTask, deleteTask} from "../../store/tasks.slice.js";
import './index.css'

const ModalPopup = (props) => {
  const dispatch = useDispatch()
  const task = props.task



  const deleteUser = useCallback(async (id) => {
    await dispatch(deleteUserFromTask({id}))
  }, [dispatch])

  const deleteTaskHandler = useCallback(async () => {
    await dispatch(deleteTask({id: task.id}))
    props.onHide()
  }, [dispatch])

  return (
      <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {task.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Описание задачи:</h4>
          <div className='font-bold mt-2'>
            {task.description}
          </div>
        </Modal.Body>
        <Modal.Body>
          <h4>Все участники задачи</h4>
          <div className='task__members'>
            {task.pivot.map(pivot => pivot.user ?
                <div className='task__member' key={pivot.user.id}>
                  <span>{pivot.user.email}</span>
                  <span className="icon icon--delete" onClick={() => deleteUser(pivot.id)}>✖</span>
                </div> : '')}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className='bg-danger' onClick={deleteTaskHandler}>Удалить</Button>
          <Button className='bg-sky-600' onClick={props.onHide}>Закрыть</Button>
        </Modal.Footer>
      </Modal>
  );
}

export default ModalPopup