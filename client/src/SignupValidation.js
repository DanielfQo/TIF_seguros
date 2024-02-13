function Validation(values){
    let error = {}
    //const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    //const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]+)$/


    if(values.nombre === ""){
        error.nombre = "El campo esta vacio"
    }
    else {
        error.nombre = ""
    }
    if(values.email === ""){
        error.email = "El campo esta vacio"
    }else{
        error.email =""
    }
    /*else if(!email_pattern.test(values.email)){
        error.email = "El correo no coincide"*/
    if(values.password === ""){
        error.password = "La contraseña  esta vacia"
    }
    /*
    else if(!password_pattern.test(values.password)){
        error.password = "La contraseña no es correcta"
    }
    */
    else{
        error.password =""
    }
    return error;
}

export default Validation;