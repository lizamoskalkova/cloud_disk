import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { supabaseClient } from '../api/Supabase';

/*export const supabaseApi = createApi({
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getTodos: builder.query({
      queryFn: async () => {
        const todos = await supabaseClient
          .from('todo')

        return {data: todos}
      }
    })
  })
})*/


export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async function (_, { rejectWithValue }) {
    try {
      const { data, error } = await supabaseClient
        .from('users')
        .select('id, email')
      if (error) throw error
      return data
    } catch (e) {
      throw(rejectWithValue(e))
    }
  }
);


type UserState = {
  id: string,
  email: string
}


interface UsersState {
  users: UserState[],
  //loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState : UsersState= {
  users: [],
  //loading: 'idle',
} 

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, { payload}) => {
      if (payload) {
       payload.forEach((el) => {
         state.users.push({id: el.id, email: el.email})
         ///console.log(el.id)
       })
      };
      })
    }
});
export default usersSlice.reducer;
