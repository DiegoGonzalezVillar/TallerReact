import { configureStore } from '@reduxjs/toolkit'

import paisesSlice from '../slices/paisesSlice'
import alimentosSlice from '../slices/alimentosSlice'
import registrosSlice from '../slices/registrosSlice'
import usuariosSlice from '../slices/usuariosSlice'

export const store = configureStore({
    reducer: {
        paisesSlice,
        alimentosSlice,
        registrosSlice,
        usuariosSlice,
    },
})