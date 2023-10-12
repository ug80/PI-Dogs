import axios from "axios";
import { GET_DOGS, GET_DOG, GET_DETAILS, DELETE_DETAILS, GET_TEMPERAMENTS, PAGINATE, 
    FILTER, ORDER, FILTERORIGIN, ORDERBYWEIGHT, SEARCHBYNAME } from "./actionsType";


export const getDogs = () => {
    return async function(dispatch){
        const dogs = (await (axios.get('http://localhost:3001/dogs'))).data;
        dispatch({type: GET_DOGS, payload: dogs});
    }
}

export const getDog = (id) => {
    return async function(dispatch){
        const dog = (await (axios.get(`http://localhost:3001/dogs/${id}`))).data;
        dispatch({type: GET_DOG, payload: dog});
    }
}

export const getDetails = (id) => {
    return async function(dispatch){
        try {
            const dog = (await (axios.get(`http://localhost:3001/dogs/${id}`))).data;
            dispatch({type: GET_DETAILS, payload: dog});
        } catch (error) {
            console.log(error);
        }
    }
}

export const deleteDetails = (id) => {
    return async function(dispatch){
        
        dispatch({type: DELETE_DETAILS});
    }
}

export const getTeperaments = ()=> {
    return async function(dispatch){
        const temperaments = (await (axios.get(`http://localhost:3001/temperaments`))).data;
        dispatch({type: GET_TEMPERAMENTS, payload: temperaments})
    }
}

export const postDog = (state) => {
    return async function(dispatch){
        try {
            await axios.post('http://localhost:3001/dogs', state);
            alert('Nueva raza creada exitosamente');
        } catch (error) {
            alert("No se pudo crear, ocurrió un error");
        }
    }
}

export const paginateDogs = (order) =>{
    return async function(dispatch){
        try {
            dispatch({
                type: PAGINATE,
                payload: order
            })
        } catch (error) {
            
        }
    }
}

export const filterDogsAction = (temperament) =>{
    return async function(dispatch){
        console.log(temperament)
        try {
            dispatch({
                type: FILTER,
                payload: temperament
            })
        } catch (error) {
            
        }
    }
}

export const orderDogsAction = (order) =>{
    return async function(dispatch){
        
        try {
            dispatch({
                type: ORDER,
                payload: order
            })
        } catch (error) {
            
        }
    }
}

export const filterOriginAction = (origin) => {
    return async function(dispatch){
        try {
            dispatch({
                type: FILTERORIGIN,
                payload: origin
            })
        } catch (error) {
            
        }
    }
}

export const orderByWeightAction = (order) =>{
    return async function(dispatch){
        
        try {
            dispatch({
                type: ORDERBYWEIGHT,
                payload: order
            })
        } catch (error) {
            
        }
    }
}

export const searchByNameAction = (name) => {
    return async function(dispatch){
        try {
            const dogs = (await (axios.get(`http://localhost:3001/dogs?name=${name}`))).data;
            dispatch({type: SEARCHBYNAME, payload: dogs});
        } catch (error) {
            alert('No se encontro raza con ese nombre');
        }
    }
}