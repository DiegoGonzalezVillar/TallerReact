export const buscarAlimento = (idAlimento, alimentos) => {
    const alimento = alimentos.find(
        a => a.id === idAlimento
    )
    return alimento;
}

export const buscarUsuario = (id, usuarios) => {
    const usuario = usuarios.find(
        u => u.id === id
    )
    return usuario;
}
