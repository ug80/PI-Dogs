import React from 'react'
import { Link } from 'react-router-dom'
import style from './Landing.module.css'
const Landing = () => {
  return (
    <div className={style.landing}>
        <div className={style.container}> 
         <h1>Dogs API</h1>
          <button>
             <Link to='/home'>
                Ingresar
              </Link>
          </button>
        </div>
    </div>
  )
}

export default Landing



