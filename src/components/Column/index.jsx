import React, {useCallback, useState} from 'react'
import Task from "../Task/index.jsx";
import {useDispatch, useSelector} from "react-redux";
import {fetchTasks, fetchTasksByUser, updateColumn, updateTask} from "../../store/tasks.slice.js";

const Column = ({column, children}) => {
  const dispatch = useDispatch()
  const [isEditTitle, setIsEditTitle] = useState(false)
  const [title, setTitle] = useState((column || {}).title || '')
  const user = useSelector((state) => state.auth.user)

  const updateColumnHandler = useCallback(async () => {
    await dispatch(updateColumn({id: column.id, description: column.description, title: title}))
    setIsEditTitle(false)
  }, [dispatch, title])

  const updateColumnInTask = useCallback(async (event) => {
    const data = JSON.parse(event.dataTransfer.getData('task'))
    await dispatch(updateTask({...data, column_id: column.id, user}))

    if (user.is_moderator) {
      await dispatch(fetchTasks())
    } else {
      await dispatch(fetchTasksByUser({user: user, query: query.trim() ? query : undefined}))
    }
  }, [dispatch, column])

  return (
      <>
        {column ? <div>
          {isEditTitle ?
              <input
                  className='bg-white text-sky-600 p-2 rounded-lg'
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  onBlur={updateColumnHandler}
              />:
              <div className='p-2' onClick={() => setIsEditTitle(true)}>{column.title}</div>
          }

          <div
              className='w-[220px] min-h-screen bg-gray-300 flex flex-col gap-y-3 items-center p-2 mt-3'
              onDragOver={(event) => event.preventDefault()}
              onDrop={updateColumnInTask}
          >
            {column?.tasks?.map(task => <Task key={task.id} task={task}/>)}
          </div>
        </div> : <div className='flex mt-5 cursor-pointer'>
          {children}
        </div>
        }
      </>
  )
}

export default Column