import React from 'react';
import {Nav, NavDropdown} from "react-bootstrap";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import './index.css'

const Navbar = () => {
  const user = useSelector((state) => state.auth.user)
  const navigate = useNavigate()

  const handleNavigate = (eventKey) => navigate(eventKey)

  return (
      <Nav variant="pills" defaultActiveKey="/" onSelect={handleNavigate} className='mb-2.5 navbar flex'>
        <div className='nav__items'>
          {user ?
              <>
                <Nav.Item>
                  <Nav.Link onClick={() => handleNavigate('/')}>Главная</Nav.Link>
                </Nav.Item>
                {user.is_moderator &&
                    <Nav.Item>
                      <Nav.Link onClick={() => handleNavigate('/create')}>Создать задачу</Nav.Link>
                    </Nav.Item>
                }
                <Nav.Item>
                  <Nav.Link onClick={() => handleNavigate('/tasks')}>Все задачи</Nav.Link>
                </Nav.Item>
              </> :
              <Nav.Item>
                <Nav.Link onClick={() => handleNavigate('/')}>Главная</Nav.Link>
              </Nav.Item>
          }
        </div>

        <NavDropdown title="Действия" id="nav-dropdown">
          {user ? <div>
                <NavDropdown.Item eventKey="/" className='media__item'>Главная</NavDropdown.Item>
                {user.is_moderator && <NavDropdown.Item eventKey="/create" className='media__item'>Создать задачу</NavDropdown.Item>}
                <NavDropdown.Item eventKey="/tasks" className='media__item'>Все задачи</NavDropdown.Item>
                <NavDropdown.Item eventKey="/logout">Выход</NavDropdown.Item>
          </div> :
              <>
                <NavDropdown.Item eventKey="/" className='media__item'>Главная</NavDropdown.Item>
                <NavDropdown.Item eventKey="/login">Войти</NavDropdown.Item>
                <NavDropdown.Item eventKey="/registration">Зарегистрироваться</NavDropdown.Item>
              </>
          }
        </NavDropdown>
      </Nav>
  );
};

export default Navbar;