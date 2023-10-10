
const validate = (input) => {
    
    let errors={};
    const regexName = /^[A-Za-z]+$/;
    const regexUrl = /^https?:\/\/\S+\.(?:png|jpe?g|gif|webp|bmp)$/i;
    const regexNum = /^\d+(\.\d+)?$/;

    //validacion del nombre
    if(!regexName.test(input.name)) errors.name = 'El nombre debe contener solo letras';
    if (!input.name.length) errors.name = "Debe ingresar un nombre";

    //validacion imagen
    if(!regexUrl.test(input.image)) errors.image = 'Debe ingresar una URL válida';
    //else errors.image = "";
    if(!input.image) errors.image = 'Debe ingresar URL  de imagen';

    //validacion weight
    if(!regexNum.test(input.weight_min)) errors.weight_min = 'solo puede ingresar  números';
    if(!input.weight_min) errors.weight_min ='Debe ingresar un peso mínimo';

    if(!regexNum.test(input.weight_max)) errors.weight_max = 'solo puede ingresar  números';
    if(!input.weight_max) errors.weight_max= 'Debe ingresar un peso máximo';
    if(+input.weight_max <= +input.weight_min) errors.weight_max = 'El peso máximo debe ser mayor al peso mínimo'

    //validaciones de height
    if(!regexNum.test(input.height_min)) errors.height_min = 'solo puede ingresar  números';
    if(!input.height_min) errors.height_min ='Debe ingresar una altura mínima';

    if(!regexNum.test(input.height_max)) errors.height_max = 'solo puede ingresar  números';
    if(!input.height_max) errors.height_max= 'Debe ingresar altura máxima';
    if(+input.height_max <= +input.height_min) errors.height_max = 'La altura máxima debe ser mayor que la mínima'
    
    //validaciones espectativa de vida
    if(!regexNum.test(input.life_span_min)) errors.life_span_min = 'solo puede ingresar  números';
    if(!input.life_span_min) errors.life_span_min ='Debe ingresar minima espectativa de vida';

    if(!regexNum.test(input.life_span_max)) errors.life_span_max = 'solo puede ingresar  números';
    if(!input.life_span_max) errors.life_span_max= 'Debe ingresar máxima espectativa de vida';
    if(+input.life_span_max <= +input.life_span_min) errors.life_span_max = 'Debe ser mayor a la espectativa mínima'


    return errors;
}


export default validate;