import React from 'react'
import { Link } from 'react-router-dom'
import style from './Landing.module.css'
const Landing = () => {
  return (
    <div className={style.landing}>
        <div className={style.container}> 
         <h1 className={style.title}>Dogs API</h1>
          
        </div>
        <button className={style.button}>
             <Link to='/home'>
                Ingresar
              </Link>
          </button>
    </div>
  )
}

export default Landing



