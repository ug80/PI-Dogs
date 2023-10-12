const axios = require('axios');
require('dotenv').config();
const { API_KEY, URL } = process.env;
const {Dog, Temperament} = require('../db');
const { Op } = require('sequelize');

const getDogs = async () =>{
    
    
    const dbDogsRaw = await Dog.findAll({include: [{
      model: Temperament,
      attributes: ['name'],
      through: {
        attributes: [],
      }
    }]});
    
    const dbDogs = dbDogsRaw.map(dog => ({
      id: dog.id,
      name: dog.name,
      temperament: dog.Temperaments.map(temp => temp.name),
      weight: dog.weight,
      image: dog.image,
    }))



    //consulto la api
    const response = await axios(`${URL}${API_KEY}&limit=100`);
    const dogsApi = response.data;
    console.log("esto es response ", dogsApi);
    const dogs = dogsApi.map(dog =>{
        const temperaments = dog.temperament.split(',').map(temp => temp.trim())
        return {
            id: dog.id,
            name: dog.name,
            temperament: temperaments,
            weight: dog.weight.metric,
            image: dog.image && dog.image.url
        }
        

    })
    return [...dbDogs, ...dogs];
}









// const getDogsByName = async (name) => {
//   // Consultar la base de datos
//   const dbSearchByName = await Dog.findAll({
//     where: {
//       name: {
//         [Op.iLike]: `%${name}%`
//       }
//     },
//     include: [
//       {
//         model: Temperament,
//         attributes: ['name'],
//         through: { attributes: [] }
//       }
//     ]
//   });

  
//   const response = (await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}&api_key=${API_KEY}`)).data;
//   const apiDogs = response.map(dog => {
//     const temperaments = dog.temperament.split(',').map(temp => temp.trim());
//     return {
//       id: dog.id,
//       name: dog.name,
//       height: dog.height.metric,
//       weight: dog.weight.metric,
//       temperament: temperaments,
//       life_span: dog.life_span,
//       image: dog.image.url
//     };
//   });

//   // Combinar resultados de la base de datos y la API
//   //const allDogs = dbSearchByName.concat(apiDogs);
//   const allDogs = [...dbSearchByName, ...apiDogs];

//   return allDogs;
// };

const getDogsByName = async (name) => {
  // Consultar la base de datos
  const dbSearchByName = await Dog.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`
      }
    },
    include: [
      {
        model: Temperament,
        attributes: ['name'],
        through: { attributes: [] }
      }
    ]
  });

  // Mapear y transformar los temperamentos de la base de datos
  const dbDogs = dbSearchByName.map(dog => {
    const temperaments = dog.Temperaments.map(temp => temp.name);
    return {
      id: dog.id,
      name: dog.name,
      height: dog.height,
      weight: dog.weight,
      temperament: temperaments,
      life_span: dog.life_span,
      image: dog.image
    } 
  });

  // Consultar la API externa
  const response = (await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}&api_key=${API_KEY}`)).data;

  // Procesar los resultados de la API
  const apiDogs = response.map(dog => {
    const temperaments = dog.temperament.split(',').map(temp => temp.trim());
    return {
      id: dog.id,
      name: dog.name,
      height: dog.height.metric,
      weight: dog.weight.metric,
      temperament: temperaments,
      life_span: dog.life_span,
      image: dog.image.url
    };
  });

  // Combinar resultados de la base de datos y la API
  const allDogs = [...dbDogs, ...apiDogs];

  return allDogs;
};









const createNewDog = async (image, name, weight_min, weight_max, height_min, height_max, life_span_min, life_span_max, temperament) => {
  const height = `${height_min} - ${height_max}`;
  const weight = `${weight_min} - ${weight_max}`;
  const life_span = `${life_span_min} - ${life_span_max} years`;
  const newDog = await Dog.create({
    image,
    name,
    weight,
    height,
    life_span
  })
  //asocio los temperamentos
  const temp = await Temperament.findAll({where:{name: temperament}});
  await newDog.addTemperament(temp);
  return newDog;

}





const getDogByID = async (id, source) => {
  const dog = source === 'api'
    ? (await axios.get(`https://api.thedogapi.com/v1/breeds/${id}`)).data
    : await Dog.findByPk(id, {include: {model: Temperament, attributes: ['name'], through:{attributes:[],}}});

    if(source === 'api'){
      imageid = dog.reference_image_id;
      console.log("image id: ", imageid);
      dogImage = (await axios.get(`https://api.thedogapi.com/v1/images/${imageid}`)).data.url
      const temperaments = dog.temperament.split(',').map(temp => temp.trim());

      return {
        id: dog.id,
        name: dog.name,
        height: dog.height.metric,
        weight: dog.weight.metric,
        temperament: temperaments,
        life_span: dog.life_span,
        image: dogImage

      }
    }
    
    
    const temperaments = dog.Temperaments.map(temp => temp.name);
    return {
      id: dog.id,
      name: dog.name,
      height: dog.height,
      weight: dog.weight,
      temperament: temperaments,
      life_span: dog.life_span,
      image: dog.image
    }  

   

}


module.exports = {
    getDogs,
    getDogsByName,
    getDogByID,
    createNewDog
} 