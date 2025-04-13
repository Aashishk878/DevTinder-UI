import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    name: "connection",
    initialState: [],
    reducers: {
        addConnections : (state, action) => action.payload,
        removeConnections : (state, action) => null, //same as return null
    },
});

export const {addConnections, removeConnections} = connectionSlice.actions;

export default connectionSlice.reducer;