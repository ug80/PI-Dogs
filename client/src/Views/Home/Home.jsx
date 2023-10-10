import React from 'react'
import Cards from '../../Components/Cards/Cards';
import style from './Home.module.css';
import { useDispatch, useSelector } from 'react-redux'; 
import { useState, useEffect } from 'react';
import { filterDogsAction, filterOriginAction, getDogs, getTeperaments, 
  orderDogsAction, paginateDogs, orderByWeightAction } from '../../Redux/actions';


const Home = () => {
    const dispatch = useDispatch();
    const dogs = useSelector((state)=>state.dogs);
    const temperaments = useSelector((state) => state.temperaments)

    useEffect(()=>{
        dispatch(getDogs());
        dispatch(getTeperaments());
    },[])

    
  
    const paginate = (event) =>{
      dispatch(paginateDogs(event.target.name));
    }

    const filterDogs = (event) =>{
      dispatch(filterDogsAction(event.target.value));
    }
    
    const orderDogsAlf = (event) => {
      dispatch(orderDogsAction(event.target.value));
    }

    const filterOrigin = (event) => {
      dispatch(filterOriginAction(event.target.value))
    }

    const orderByWeight = (event) => {
      dispatch(orderByWeightAction(event.target.value))
    }

  return (
    <div className={style.container}>
      <div className = {style.filtersContainer}>
        <h4>Filtro/Ordenamientos:</h4>
        
        <span>orden alfabetico:</span>
        <select onClick={orderDogsAlf}  >
          <option value="-">-</option>
          <option value="AZ">A - Z</option>
          <option value="ZA">Z - A</option>
        </select>

        <span>orden por peso:</span>
        <select onClick={orderByWeight}  >
          <option value="minWeight">menor peso</option>
          <option value="maxWeight">mayor peso</option>
        </select>
        
        
        <span>filtrar por temperamentos:</span>
        <select  name='temperament' onClick={filterDogs} >
          <option value=''>temperamentos</option>
          {temperaments.map((temp, index) => (
              <option key={index} value={temp}>
                {temp}
              </option>
            ))}
        </select>
        
        <span>filtrar por origen:</span>
        <select onClick={filterOrigin}>
          <option value='DBB'>DBB</option>
          <option value='API'>API</option>
        </select>
      </div>
      <h1>Esto es el home</h1>
      <Cards info={dogs}/>
      <div>
        <button onClick={paginate} name = 'prev'>Prev</button><button onClick={paginate} name='next'>Next</button>
      </div>
    </div>
  )
}

export default Home
