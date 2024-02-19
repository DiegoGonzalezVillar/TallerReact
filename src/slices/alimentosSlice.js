import { createSlice } from "@reduxjs/toolkit";

const initialState = { //estado inicial
    alimentos: [], //state
}

const alimentosSlice = createSlice({
    name: "alimentos",
    initialState,
    reducers: {
        cargarAlimentos: (state, action) => {
            const alimentosIniciales = action.payload
            state.alimentos = alimentosIniciales;
        },
        obtenerAlimento: (state, action) => {
            let alimentoABuscar = action.payload;
            const alimentoEnListaDeAlimentos = state.alimentos.find(
                alimento => alimento.id === alimentoABuscar.id
            )
            return alimentoEnListaDeAlimentos
            /*const targetTarea = { ...tareaEnListaDeTareas, ...tareaAModificar }
            Object.assign(tareaEnListaDeTareas, targetTarea);*/
        },
    },
});
export const { cargarAlimentos } = alimentosSlice.actions;
export default alimentosSlice.reducer;