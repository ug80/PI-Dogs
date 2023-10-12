const { getDogs, getDogsByName, createNewDog, getDogByID } = require("../controllers/dogsController");



const getDogsHandler = async (req, res)=>{
    const { name } = req.query;
    
    try {
        const results = name? await getDogsByName(name) : await getDogs();
        res.status(200).json(results);
        
    } catch (error) {
        res.status(400).json({error:error.message})        
    }
}




const getDogByIdHandler = async(req,res) =>{
    const {id} = req.params;
    const source = isNaN(id)? "dbb" : "api";
    try {
        const dog = await getDogByID(id, source);
        res.status(200).json(dog);
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}








const createNewDogHandler = async (req, res)=>{
    try {
        const {image, name, weight_min, weight_max, height_min, height_max, life_span_min, life_span_max, temperament} = req.body;
        const newDog = await createNewDog(image, name, weight_min, weight_max, height_min, height_max, life_span_min, life_span_max, temperament);
        res.status(200).json(newDog);
    } catch (error) {
        res.status(400).json({error:error.message});
    }

}


module.exports = {
    getDogByIdHandler,
    getDogsHandler,
    createNewDogHandler
}