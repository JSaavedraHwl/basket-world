document.addEventListener('DOMContentLoaded',()=> {
    const botonLogin = document.getElementById('login-button');

    botonLogin.addEventListener('click',(e)=> {
        let error = false;
        e.preventDefault();
        let listaErrores = '';
        const email = document.getElementById('inputEmail');
        const contrasena = document.getElementById('inputContrasena');
        const valorEmail = email.value;
        const valorContrasena = contrasena.value;
        console.log('valor email', valorEmail)
        if(!validarEmail(valorEmail)) {
            error = true;
            listaErrores += 'Email invalido.';
        }
        if(!validarContraseña(valorContrasena)) {
            error = true;
            listaErrores += 'Contraseña invalida.'
        }
        if(error === true) {
            let errores = `
                ${listaErrores}
            `
            alert(errores);
        }
        else {
            alert('Credenciales validas. :D')
        }
        
    })
});





function validarEmail(email) {
    if( typeof email === 'string') {
        return (email.includes('@') && email.includes('.'));
    }
    else{
        return false;
    }
}

function validarEmail(email) {
    if( typeof email === 'string') {
        return (email.includes('@') && email.includes('.'));
    }
    else{
        return false;
    }
}
function validarContraseña(contrasena) {
    if( typeof contrasena === 'string') {
       return validarMayusculas(contrasena);
    }
    return false;
}
function validarMayusculas(contrasena) {
    if( typeof contrasena === 'string') {
        const arregloContrasena = contrasena.split('');
        for (letra of arregloContrasena) {

            console.log('Letra a revisar ', letra);
            console.log('Letra en mayuscula', letra.toUpperCase());
            if( letra  === letra.toUpperCase()){
                return true;
            }
        }
    }
    return false;
}

