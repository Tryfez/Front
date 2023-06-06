import React, {useState} from 'react'
import ModalPopup from '../Modal'

const Task = ({task}) => {
  const [modalShow, setModalShow] = useState(false)

  return (
      <>
        <div
            className='w-[200px] h-[100px] p-2 bg-white pointer cursor-pointer'
            onClick={() => setModalShow(true)}
            onDragStart={(event) => event.dataTransfer.setData('task', JSON.stringify(task))}
            draggable
        >
          <div className='flex font-bold text-sky-800'>
            {task.title}
          </div>
        </div>

        <ModalPopup
          show={modalShow}
          onHide={() => setModalShow(false)}
          task={task}
        />
      </>

  )
}

export default Task