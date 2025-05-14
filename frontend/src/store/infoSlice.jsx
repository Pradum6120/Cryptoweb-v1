import createSlice from '@reduxjs/toolkit';
import { setLikedcount } from './UserSlice';


const userSlice = createSlice({
    name: "",
    initialState:{
        user: null,
        post: null,
        likedcount: null,
        pinned: null,
    },
    reducers:{
        setuser: (state, action)=>{
            state.user = action.payload
        },
        setpost: (action, payload) =>{
            state.post = action.payload
        },
        setLikedcount:(state,action)=>{
            state.likedcount = action.payload
        },
        setPinned:(state, action)=>{
            state.pinned = action.payload
        }
    }
})

export default userSlice.reducer;
export const {setuser, setpost, setLikedcount, setPinned} = userSlice.actions;