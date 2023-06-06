import React, {useEffect} from 'react'
import {useSelector} from "react-redux";
import {Routes, Route, useNavigate, useLocation} from "react-router-dom";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/Navbar/index.jsx";
import NotFound from "./pages/NotFound.jsx";
import Home from "./pages/Home.jsx";
import CreateTaskForm from "./components/CreateTaskForm/index.jsx";
import RegistrationForm from "./components/RegistrationForm/index.jsx";
import LoginForm from "./components/LoginForm/index.jsx";
import Tasks from './pages/Tasks'
import Logout from './pages/Logout.jsx';

function App() {
  const user = useSelector(state => state.auth.user)
  const navigate = useNavigate()
  const link = useLocation()

  useEffect(() => {
    if (user && paths.includes(link.pathname)) {
      navigate('/')
    }
  }, [user, link])

  const paths = ['/login', '/registration']

  return (
      <div className="App">
        <Navbar/>
        <div className="app__content">
          <Routes>
            <Route path={'/'} element={<Home/>}/>
            {user ?
                <>
                  <Route path={'/create'} element={<CreateTaskForm/>}/>
                  <Route path={'/tasks'} element={<Tasks/>}/>
                  <Route path={'/logout'} element={<Logout />}/>
                </>
              :
                <>
                  <Route path={'/registration'} element={<RegistrationForm/>}/>
                  <Route path={'/login'} element={<LoginForm/>}/>
                </>
            }
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
)
}

export default App