import finalPropsSelectorFactory from "react-redux/es/connect/selectorFactory";
import { GET_DOGS, GET_DOG, GET_DETAILS, DELETE_DETAILS, 
         GET_TEMPERAMENTS, PAGINATE, FILTER, ORDER, FILTERORIGIN, ORDERBYWEIGHT, SEARCHBYNAME} from "./actionsType";

const initialState = {
    dogs: [],
    temperaments:[],
    dog:[],
    dogsBackUP: [],
    dogsBackUp2: [],
    detail: [],
    currentPage: 0,
    dogsFiltered:[],
    filter: false,
    order: false,
    
    dogsOrdered:[],
    dogsSortedWeight: [],
    totalPages: 0,
        
}

const rootReducer = (state = initialState, action) =>{
    const ITEMS_PER_PAGE = 8;

    switch(action.type){
        case GET_DOGS:
            const totalPages = Math.ceil(action.payload.length / ITEMS_PER_PAGE);
            return {...state, 
                dogs:[...action.payload].splice(0, ITEMS_PER_PAGE), 
                dogsBackUP:action.payload,
                dogsBackUp2: action.payload,
                totalPages: totalPages
            };  

        case GET_DOG:
            return{state, dog:action.payload}

        case GET_DETAILS:
            return{
                ...state,
                detail: action.payload
            }

        case DELETE_DETAILS:
            return{
                ...state,
                detail: []
            }

        case GET_TEMPERAMENTS:{
            return{
                ...state,
                temperaments:action.payload
            }
        }

        case PAGINATE:{
            const next_page = state.currentPage + 1;
            const prev_page = state.currentPage - 1;
            const firstIndex = action.payload === 'next' ? next_page * ITEMS_PER_PAGE : prev_page * ITEMS_PER_PAGE;

            if (!isNaN(action.payload)) {
                const pageNumber = Number(action.payload) - 1;
                return {
                  ...state,
                  currentPage: pageNumber,
                  dogs: [...state.dogsBackUP].splice(pageNumber * ITEMS_PER_PAGE, ITEMS_PER_PAGE),
                };
            }
            
            if(state.filter){

                if (!isNaN(action.payload)) {
                    const pageNumber = Number(action.payload) - 1;
                    return {
                      ...state,
                      currentPage: pageNumber,
                      dogs: [...state.dogsFiltered].splice(pageNumber * ITEMS_PER_PAGE, ITEMS_PER_PAGE),
                    };
                }
                if(action.payload === 'next' && firstIndex >= state.dogsFiltered.length) return state;
                else if(action.payload === 'prev' && prev_page < 0) return state;
                
                return {
                    ...state,
                    dogs:[...state.dogsFiltered].splice(firstIndex, ITEMS_PER_PAGE),
                    currentPage: action.payload === 'next'? next_page : prev_page                                
                }
            }

            


            console.log("ACTION payload:---------------------------- ", action.payload)
            if(action.payload === 'next' && firstIndex >= state.dogsBackUP.length) return state;
            else if(action.payload === 'prev' && prev_page < 0) return state;
            else if(action.payload !== 'next' && action.payload !== 'prev') return state.currentPage = action.payload;
            return {
                ...state,
                dogs:[...state.dogsBackUP].splice(firstIndex, ITEMS_PER_PAGE),
                currentPage: action.payload === 'next'? next_page : prev_page                                
            }
        }

        case FILTER:
            console.log("esto es action.payload", action.payload);
            
            let filterByTemperament = [];
            if(action.payload == 'all'){
                
                return{
                    ...state,
                    dogs: [...state.dogsBackUp2].splice(0, ITEMS_PER_PAGE),
                    filter: false
                }
            } else{
                filterByTemperament = [...state.dogsBackUP].filter((d)=>d.temperament.includes(action.payload));
                
            } 
            
            const  tPages = Math.ceil(filterByTemperament.length/ ITEMS_PER_PAGE);
            // console.log("esto es total de paginas de temper", totalPages)
            
            return{
                ...state,
                dogs: [...filterByTemperament].splice(0, ITEMS_PER_PAGE),
                dogsFiltered: filterByTemperament,
                totalPages: tPages,
                filter: true, 
            }
        

        

        case ORDER:
            let orderByName = [];
            if (action.payload === "AZ") {
                orderByName = [...state.dogsBackUP].sort((prev, next) => {
                    if (prev.name > next.name) return 1;
                    if (prev.name < next.name) return -1;
                    return 0;
                });
            } else if (action.payload === "ZA") {
                orderByName = [...state.dogsBackUP].sort((prev, next) => {
                    if (prev.name > next.name) return -1;
                    if (prev.name < next.name) return 1;
                    return 0;
                });
            } else {
                return {
                    ...state,
                    dogs: [...state.dogsBackUp2].splice(0, ITEMS_PER_PAGE),
                    filter: false,
                };
            }

            return {
                ...state,
                dogs: [...orderByName].splice(0, ITEMS_PER_PAGE),
                dogsFiltered: orderByName, 
                totalPages: Math.ceil(orderByName.length / ITEMS_PER_PAGE), 
                filter: true,
            };

        
        case FILTERORIGIN:
            let filterByOrigin = [];
            if(action.payload === 'DBB'){
                filterByOrigin = [...state.dogsBackUP].filter((d) => isNaN(d.id) );
            }else if(action.payload === 'API'){
                    filterByOrigin = [...state.dogsBackUP].filter((d) => !isNaN(d.id) );
            }else{
                return state;
            }
                
            
            return{
                ...state,
                dogs: [...filterByOrigin].splice(0, ITEMS_PER_PAGE),
                dogsFiltered: filterByOrigin,
                filter: true, 
                totalPages: Math.ceil(filterByOrigin.length / ITEMS_PER_PAGE)
            }
                
        
        
       case ORDERBYWEIGHT:
            const sortedWeight =
            action.payload === "minWeight"
               ? state.dogsBackUP.sort((a, b) => {
                if (parseInt(a.weight.split('-')[0]) > parseInt(b.weight.split('-')[0])) {
                    console.log("estos son los pesos", a.weight.split('-')[1])
                    return 1;
                }
                if (parseInt(b.weight.split('-')[0]) > parseInt(a.weight.split('-')[0])) {
                    return -1;
                }
                return 0;
            })
            : state.dogsBackUP.sort((a, b) => {
                if (parseInt(a.weight.split('-')[1]) > parseInt(b.weight.split('-')[1])) {
                    return -1;
                }
                if (parseInt(b.weight.split('-')[1]) > parseInt(a.weight.split('-')[1])) {
                    return 1;
                }
              return 0;
            });
            return {
              ...state,
            dogs: [...sortedWeight].splice(0, ITEMS_PER_PAGE),
            dogsFiltered: sortedWeight,
            filter:true,
        };
        
       case SEARCHBYNAME:
            console.log("esto es currentPage ", state.currentPage)
            
            return {...state, 
                dogs:[...action.payload].splice(0, ITEMS_PER_PAGE),
                dogsFiltered: action.payload,
                filter: true,
                totalPages: Math.ceil(action.payload.length / ITEMS_PER_PAGE) 
            };
            
        default:
            return {...state}
    }
}

export default rootReducer;
