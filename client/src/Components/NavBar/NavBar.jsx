import React from 'react';
import style from './NavBar.module.css';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className={style.mainContainer}>
      
        <div>
          <Link to = '/home'>
           <h3>Home</h3>
          </Link>
        </div>
      
        <div>
          <Link to = '/create'>
           <h3>Crear raza</h3>
          </Link>
        </div>      
        
           <form className={style.fromStyle}>
            <input placeholder='busqueda'/>
            <button>Buscar</button>
          </form> 
        
      
    </div>
  )
}

export default NavBar
