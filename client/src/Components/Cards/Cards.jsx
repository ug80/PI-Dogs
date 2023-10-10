import React from 'react'
import Card from '../Card/Card'
import style from './Cards.module.css'
const Cards = ({info}) => {
    const dogs = info;
    
  return (
    <div className={style.cardsContainer}>
      {
        dogs?.map(dog=>{
            return <Card
                key={dog.id}
                id={dog.id}
                name={dog.name}
                image={dog.image}
                weight={dog.weight}
                temperament={dog.temperament}
                />
            })
      }
    </div>
  )
}

export default Cards
