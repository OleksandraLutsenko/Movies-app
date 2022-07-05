import { createStore } from 'redux';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {pageNumber: 0}

createSlice({
    name: 'pagination',
    initialState: initialState
})