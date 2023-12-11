import React from 'react'
import Cards from '../../Components/Cards/Cards';
import style from './Home.module.css';
import { useDispatch, useSelector } from 'react-redux'; 
import { useState, useEffect } from 'react';
import { filterDogsAction, filterOriginAction, getDogs, getTeperaments, 
  orderDogsAction, paginateDogs, orderByWeightAction, searchByNameAction } from '../../Redux/actions';


const Home = () => {
    const dispatch = useDispatch();
    const dogs = useSelector((state)=>state.dogs);
    const temperaments = useSelector((state) => state.temperaments);
    const totalPages = useSelector((state)=> state.totalPages);
    useEffect(()=>{
        dispatch(getDogs());
        dispatch(getTeperaments());
    },[])

    const pages =[];
    for(let i=1; i <= totalPages;i++) pages.push(i);
    
    
    const [searchBreed, setSearchBreed] = useState('');

    const paginate = (event) =>{
      
      dispatch(paginateDogs(event.target.value));
    }

    const filterDogs = (event) =>{
      event.preventDefault();
      dispatch(filterDogsAction(event.target.value));
    }
    
    const orderDogsAlf = (event) => {
      event.preventDefault();
      dispatch(orderDogsAction(event.target.value));
    }

    const filterOrigin = (event) => {
      event.preventDefault();
      dispatch(filterOriginAction(event.target.value))
    }

    const orderByWeight = (event) => {
      event.preventDefault();
      dispatch(orderByWeightAction(event.target.value))
    }

    

    const handleSearchInputChange = (event) => {
      setSearchBreed(event.target.value);
    };

    

    const handleSearchSubmit = (event) => {
      event.preventDefault(); 
      dispatch(searchByNameAction(searchBreed));
    };

  return (
    <div className={style.container}>
      <div className = {style.filtersContainer}>
        
        <div className={style.filters}>
        
        <select onClick={orderDogsAlf}  >
        <option disabled selected defaultValue>Alphabetical order</option>
          <option value="-">-</option>
          <option value="AZ">A - Z</option>
          <option value="ZA">Z - A</option>
        </select>
        </div>
        
        <div className={style.filters}>
        <select onClick={orderByWeight}  >
          <option disabled selected defaultValue>Weight order</option>
          <option value="minWeight">Min</option>
          <option value="maxWeight">Max</option>
        </select>
        </div>
        
        <div className={style.filters}>
        
        <select  name='temperament' onClick={filterDogs} >
          <option disabled selected defaultValue>Filter by temperament</option>
          <option value={'all'}>All</option>
          {temperaments.map((temp, index) => (
              <option key={index} value={temp}>
                {temp}
              </option>
            ))}
        </select>
        </div>
        
        <div className={style.filters}>
        
        <select onClick={filterOrigin}>
        <option disabled selected defaultValue>Filter by Origin</option>
        <option value='All'>All</option>
          <option value='DBB'>DBB</option>
          <option value='API'>API</option>
        </select>
        </div>

        <div className={style.searchContainer}>
         <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Buscar..."
            value={searchBreed}
            onChange={handleSearchInputChange}
          />
          <button type="submit" className={style.searchButton}>Buscar</button>
          </form>
        </div>
        
        
      </div>
      
      <Cards info={dogs}/>
      <div className={style.buttonContainer}>
        <button onClick={paginate} value = 'prev'>Prev</button>
        {pages.map((page, i) =><button value={page} onClick={paginate}>{page}</button>)}
        <button onClick={paginate} value='next'>Next</button>
      </div>
    </div>
  )
}

export default Home
