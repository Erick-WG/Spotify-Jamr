import { createSlice } from "@reduxjs/toolkit";


const searchSlice = createSlice({
    name: 'search',
    initialState: {
        searchTerm: '' //add tracks here as well in an array.
    },
    reducers: {
        saveSearchTerm: (state, action) => {
            state.searchTerm = action.payload
        }
    }
})

// selectors. functions that return the state of the slice
export const selectSearchTerm = (state) => state.search.searchTerm

// reducers to be used with dispatch to add state data.
export const { saveSearchTerm } = searchSlice.actions

const searchTermReducer = searchSlice.reducer

export default searchTermReducer