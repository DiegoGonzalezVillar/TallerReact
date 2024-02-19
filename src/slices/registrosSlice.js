import { createSlice } from "@reduxjs/toolkit";

const initialState = { //estado inicial
    registros: [], //state
}
const registrosSlice = createSlice({
    name: "registros",
    initialState,
    reducers: {
        cargarRegistrosPorUsuario: (state, action) => {
            const registrosIniciales = action.payload
            state.registros = registrosIniciales;
        },
        borrarRegistro: (state, action) => {
            const idRegistroBorrar = action.payload;
            const copiaRegistroFiltrado = state.registros.filter(
                registro => registro.id !== idRegistroBorrar
            )
            state.registros = copiaRegistroFiltrado;
        },
        modificarRegistro: (state, action) => {
            let registroAModificar = action.payload;
            const registroEnListaDeRegistros = state.registros.find(
                registro => registro.id === registroAModificar.id
            )
            const targetRegistro = { ...registroEnListaDeRegistros, ...registroAModificar }
            Object.assign(registroEnListaDeRegistros, targetRegistro);
        },
        agregarRegistro: (state, action) => {
            const registroNuevo = action.payload;
            state.registros = [...state.registros, registroNuevo];
            console.log(state.registros)
        }

    },
});
export const { cargarRegistrosPorUsuario, borrarRegistro, modificarRegistro, agregarRegistro } = registrosSlice.actions;
export default registrosSlice.reducer;