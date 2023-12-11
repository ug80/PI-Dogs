import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect} from 'react';
import { getDetails, deleteDetails } from '../../Redux/actions';
import { useParams } from 'react-router-dom';
import style from './Detail.module.css'

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  
  

  useEffect(()=>{
    dispatch(getDetails(id));
    return ()=> dispatch(deleteDetails());
  },[id])
  
  const dog = useSelector((state) => state.detail);
  console.log("esto es dog de temperament:", dog);
  

  return (
    <div className={style.detailContainer} >
      <div  >
        <img className={style.imgContainer} src={dog.image} alt={dog.name} />
      </div>
      <div className={style.infoContainer}>
        
          <div>{dog.id} </div>
          <div>{dog.name}</div>
          <div>{dog.height} cm</div>
          <div>{dog.weight} kg</div>
          <div>{dog.life_span}</div>
        
        {dog?.temperament?.map((temp, i) => <div key={i}>{temp}</div>)}
      </div>
    </div>
  )
  
}

export default Detail
