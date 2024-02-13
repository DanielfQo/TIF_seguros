function Validation(values){
    let error = {}
    //const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    //const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]+)$/;

    if(values.usuario === ""){
        error.usuario = "El campo esta vacio";
    }else{
        error.usuario = "";
    }
    /*else if(!email_pattern.test(values.email)){
        error.email = "El correo no coincide"*/
    

    if(values.password === ""){
        error.password = "La contraseña  esta vacio";
    }
    /*
    else if(!password_pattern.test(values.password)){
        error.password = "La contraseña no coincide";
    }*/
    else{
        error.password = "";
    }
    return error;
}

export default Validation;