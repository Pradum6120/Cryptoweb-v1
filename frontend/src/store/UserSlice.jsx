import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const base_url ="https://cryptoweb-8nuf.onrender.com";

// fetch all posts 
export const post = createAsyncThunk("posts", async ({search='', page = 1, limit = 8}, {rejectWithValue })=>{
   try {
      const options = {
         method:'GET',
         'Content-Type' : 'application/json'
    }
      const url = `${base_url}/api/v1/?search=${search}&page=${page}&limit=${limit}`;
      const result = await fetch(url, options);
      const data = await result.json();
      return data
      
    } catch (error) {
      console.error('Error fetching airdrops:', error);
      return rejectWithValue(error.message || "Error fetching airdrops");
    }
    }

)


// all users  

export const allusers = createAsyncThunk("allusers", async(_, {rejectWithValue })=>{
   try {
      const options = {
         method:'GET',
         'Content-Type' : 'application/json'
    }
      const url = `${base_url}/api/v1/users/?search=${search}&page=${page}&limit=${limit}`;
      const result = await fetch(url, options);
      const data = await result.json();
      return data
      
    } catch (error) {
      console.error('Error fetching airdrops:', error);
      return rejectWithValue(error.message || "Error fetching airdrops");
    }
    }

)




// userSlice

const UserSlice = createSlice({

  name: "User",
  initialState: {
    currentUser: null,
    token: null,
    posts: null,
    pinnedpost: null,
    allusers: null,
    allposts: null,
    loading: false,
    error: null,
  },
  reducers: {
    setcurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    settoken:(state, action)=> {
      state.token = action.payload;
    },
    setPinnedpost: (state, action) => {
      state.pinnedpost = action.payload;
    },
    setallusers: (state, action) => {
      state.allusers = action.payload;
    },
    setAllposts: (state, action) => {
      state.allposts = action.payload;
    },
  },
  extraReducers:(builder)=>{
   builder
   .addCase(post.pending,(state, action)=>{
      state.loading= true,
      state.error = null
   })
   .addCase(post.fulfilled,(state, action)=>{
       state.posts = action.payload,
       state.loading= false
   })
   .addCase(post.rejected,(state, action)=>{
      state.loading = false,
      state.error = action.payload 
   })

  }
});

// Export actions and reducer
export const { setcurrentUser, settoken, setPinnedpost, setallusers, setAllposts} = UserSlice.actions
export default UserSlice.reducer
