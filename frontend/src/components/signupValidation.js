function validation(values) {
    let error = {}
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
    if(values.name === ''){
        error.name = "Name should bot be empty"
    }
    else{
        error.name = ""
    }
    
    if(values.email === ''){
        error.email = "Email should bot be empty"
    }
    else if(!emailPattern.test(values.email)){
        error.email = "Email Didn't match"
    }
    else{
        error.email = ""
    }

    if(values.password === ''){
        error.password = "Password should bot be empty"
    }
    else if(!passwordPattern.test(values.password)){
        error.password = "Password Didn't match"
    }
    else{
        error.password = ""
    }

    return error;

}
export default validation