const url = "https://calcount.develotion.com/";

export const obtenerPaisesAPI = () => {
  return fetch(url + "paises.php", {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      return Array.from(Object.values(json.paises));
    });
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
    .then((json) => {
      return Array.from(Object.values(json.alimentos));
    });
};

export const eliminarRegistroAPI = (id, usuarioId, usuarioApiKey) => {
  return fetch(`${url}registros.php?idRegistro=${id}`, {
    method: "DELETE",
    headers: {
      accept: "application/json",
      apikey: usuarioApiKey,
      iduser: usuarioId,
    },
  })
    .then((response) => response.json())
    .then((json) => {
      return json;
    });
};

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
      return json;
    });
};

export const registroUsuarioAPI = (
  username,
  password,
  selectValue,
  calorias
) => {
  return fetch(url + "usuarios.php", {
    method: "POST",
    body: JSON.stringify({
      usuario: username,
      password: password,
      idPais: selectValue,
      caloriasDiarias: calorias,
    }),
    headers: {
      accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      return json;
    });
};

export const agregarRegistroAPI = (
  userId,
  userApiKey,
  selectValueAlimento,
  cantidad,
  fecha
) => {
  return fetch(url + "registros.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: userApiKey,
      iduser: userId,
    },
    body: JSON.stringify({
      idUsuario: userId,
      idAlimento: selectValueAlimento,
      cantidad: cantidad,
      fecha: fecha,
    }),
  })
    .then((response) => response.json())
    .then((json) => {
      return json;
    });
};

export const obtenerRegistrosPorUsuarioAPI = (userId, userApiKey) => {
  return fetch(`${url}registros.php?idUsuario=${userId}`, {
    method: "GET",
    headers: {
      accept: "application/json",
      apikey: userApiKey,
      iduser: userId,
    },
  })
    .then((response) => response.json())
    .then((json) => {
      return Array.from(Object.values(json.registros));
    });
};

export const usuariosPorPaisAPI = (userId, userApiKey) => {
  return fetch(`${url}usuariosPorPais.php`, {
    method: "GET",
    headers: {
      accept: "application/json",
      apikey: userApiKey,
      iduser: userId,
    },
  })
    .then((response) => response.json())
    .then((json) => {
      return Array.from(Object.values(json.paises));
    });
};
