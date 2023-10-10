import React from 'react'
import { Link } from 'react-router-dom'
import style from './Card.module.css'

const Card = (props) => {
    console.log("esto es props",props)
  return (
    <Link to={`/detail/${props.id}`}>
        <div className={style.cardContainer}>
            <img className={style.cardImg} src={props.image} alt={props.name}/>
            <div className={style.carContain}>
                <p>{props.name}</p>
                <p>peso(kg):{props.weight}</p>
                <div className={style.temperament}>
                    {props.temperament.map((temp, i) => <p key={i}>{temp}</p>)}
                </div>
            </div>
        </div>
    </Link>
  )
}

export default Card
