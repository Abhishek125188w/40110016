import { configureStore } from '@reduxjs/toolkit';
import trains_reducer from './trains_reducer';

export default configureStore({
    reducer: {
        trains_reducer: trains_reducer,
    },
});