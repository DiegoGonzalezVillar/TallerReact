
const url = "https://calcount.develotion.com/";

export const obtenerPaisesAPI = () => {
    return fetch(url + "paises.php", {
        method: "GET",
        headers: {
            accept: "application/json",
        },
    }).then(response => response.json())
        .then(json => { return Array.from(Object.values(json.paises)); })
};

export const obtenerAlimentosAPI = (usuarioId, usuarioApiKey) => {
    return fetch(url + "alimentos.php", {
        method: "GET",
        headers: {
            accept: "application/json",
            apikey: usuarioApiKey,
            iduser: usuarioId,
        },
    })
        .then((response) => response.json())
        .then(json => { return Array.from(Object.values(json.alimentos)); })
}



export const loginUsuarioAPI = (username, password) => {
    return fetch(url + "login.php", {
        method: "POST",
        body: JSON.stringify({
            usuario: username,
            password: password,
        }),
        headers: {
            accept: "application/json",
        },
    })
        .then((response) => response.json())
        .then((json) => {
            return json
        })

}

export const registroUsuarioAPI = (username, password, selectValue, calorias) => {
    return fetch(url + "usuarios.php", {
        method: "POST",
        body: JSON.stringify({
            usuario: username,
            password: password,
            selectValue: selectValue,
            calorias: calorias,
        }),
        headers: {
            accept: "application/json",
        },
    })
        .then((response) => response.json())
        .then((json) => {
            return json
        })
}

export const agregarRegistroAPI = (userId, userApiKey, selectValueAlimento, cantidad, fecha) => {
    return fetch(url + "registros.php", {
        method: 'POST',
        body: JSON.stringify({
            userId: userId,
            alimentoId: selectValueAlimento,
            cantidad: cantidad,
            fecha: fecha
        }),
        headers: {
            'Content-Type': 'application/json',
            apikey: userApiKey,
            iduser: userId,
        }
    })
        .then((response) => response.json())
        .then((json) => {
            return json
        });
}

export const obtenerRegistrosPorUsuarioAPI = (userId, userApiKey) => {
    return fetch(`${url}registros.php?idUsuario=${userId}`, {
        method: 'GET',
        headers: {
            accept: "application/json",
            apikey: userApiKey,
            iduser: userId,
        },
    })
        .then((response) => response.json())
        .then(json => { return Array.from(Object.values(json.registros)); })
}
/*



export const borrarTareaAPI = (idBorrar) => {
    return fetch(`${urlBaseTodos}/todos/${idBorrar}`, {
        method: 'DELETE',
    });
}


*/

/*****USUARIOS  */


/*
export const obtenerUsuariosAPI = () => {
    return fetch(`${urlBaseTodos}/users/`)
        .then(response => response.json())
        .then(json => {
            console.log('json', json)
            return json
        })
}



/**********/


/*
const urlBase = "https://calcount.develotion.com"


export const loginObligatorio2 = (usuario, password) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "usuario": usuario,
        "password": password
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    return fetch(`${urlBase}/login.php`, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            if (result.codigo != 200) {
                //esto seria un error
                return Promise.reject(result);
            }
            return result
        })
        .catch(
            (error) => {
                console.log('error', error)
                throw new Error("Hubo un error");
            }
        );
}


export const loginObligatorio = (usuario, password) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({ "usuario": usuario, "password": password });
    const requestOptions = { method: 'POST', headers: myHeaders, body: raw };
    return fetch(`${urlBase}/login.php`, requestOptions)
        .then(response => {
            console.log('response', response);
            return response.text();
        })
        .then(result => {
            console.log('result', result);
            const parseo = JSON.parse(result);
            //la api devuelve el codigo en la respuesta y eventualmente
            //si hubo un error un mensaje acorde (esta api en caso de error devuelve mensaje y codigo)
            if (parseo.codigo != 200) {
                //como hubo un error, la api devuelve el objeto respuesta en un promise.reject
                //lo que implica que sera catcheado mas abajo ya que se esta diciendo que la promesa fallo
                return Promise.reject(parseo);
            } else {
                return result;
            }
        })
        .catch(
            //aca se puede llegar porque se lanzo un error en el segundo then o bien hubo un error que
            //no se pudo controlar
            (error) => {
                console.log('error', error)
                //se termina lanzando un error el mensaje depende de si el error tenia un mensaje
                //se muestra el mensaje que se supone nos devolvio la api, sino se muestra el mensaje
                //hubo un error
                throw new Error(error.mensaje ? error.mensaje : "Hubo un error");
            }
        );
}*/