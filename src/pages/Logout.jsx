import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../store/auth.slice.js';
import {useNavigate} from 'react-router-dom';

const Logout = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(logout())

    navigate('/')
  }, [dispatch, user])
  return (
    <div>

    </div>
  );
};

export default Logout;