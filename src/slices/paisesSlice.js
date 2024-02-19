import { createSlice } from "@reduxjs/toolkit";

const initialState = { //estado inicial
    paises: [], //state
}

const paisesSlice = createSlice({
    name: "paises",
    initialState,
    reducers: {
        cargarPaises: (state, action) => {
            const paisesIniciales = action.payload 
            state.paises = paisesIniciales;
        },
    },
});
export const { cargarPaises} = paisesSlice.actions;
export default paisesSlice.reducer;