import { createSlice } from "@reduxjs/toolkit";

const initialState = { //estado inicial
    usuarios: [], //state
}

const usuarioSlice = createSlice({
    name: "usuarios",
    initialState,
    reducers: {
        cargarUsuarios: (state, action) => {
            const usuariosIniciales = action.payload
            state.usuarios = usuariosIniciales;
        },
        agregarUsuario: (state, action) => {
            const usuarioNuevo = action.payload;
            state.usuarios = [...state.usuarios, usuarioNuevo];
        }
    },
});
export const { cargarUsuarios, agregarUsuario } = usuarioSlice.actions;
export default usuarioSlice.reducer;
