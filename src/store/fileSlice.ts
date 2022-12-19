import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabaseClient } from "../api/Supabase";
import { v4 as uuidv4 } from "uuid";

export const uploadFiles = createAsyncThunk(
  "files/uploadFiles",
  async (file: any, { rejectWithValue }) => {
    try {
      const { data, error } = await supabaseClient.storage
        .from("files")
        .upload(file.name, file);
      if (error) throw error;
      return data;
    } catch (e) {
      throw rejectWithValue(e);
    }
  }
);

export const getFiles = createAsyncThunk(
  "files/getFiles",
  async (file: any, { rejectWithValue }) => {
    try {
      const data = await supabaseClient.storage.from("files").list();
      if (data.error) throw console.log("error getting files");
      return data.data;
    } catch (e) {
      throw rejectWithValue(e);
    }
  }
);

export const getLink = async (file: any) => {
  try {
    const { data, error } = supabaseClient.storage
      .from("files")
      .getPublicUrl(file.name);
    const link = data?.publicURL;
    if (error) throw error;
    return link;
  } catch (e) {
    throw e;
  }
};

interface File {
  id: string;
  name: string;
  size?: string;
  lastModifiedDate: Date;
  type?: string;
  link?: string;
}

interface IFilesState {
  fileArray: File[];
  fileFromDB: File[];
}

const initialState: IFilesState = {
  fileArray: [],
  fileFromDB: [],
};

const filesSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    addFile: (state, { payload }) => ({
      ...state,
      fileArray: [
        ...state.fileArray,
        {
          id: uuidv4(),
          name: payload[0].name,
          size: payload[0].size,
          lastModifiedDate: new Date(),
          type: payload[0].type,
          link: payload[1],
        },
      ],
    }),
    deleteFile: (state, { payload }) => {
      state.fileArray = state.fileArray.filter((val) => val.id !== payload.id);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getFiles.fulfilled, (state, { payload }) => {
      if (payload) {
        payload.forEach((row) => {
          const { name, id, created_at } = row;
          state.fileFromDB.push({
            name: name,
            id: id,
            lastModifiedDate: new Date(created_at),
          });
        });
      }
    });
  },
});

export default filesSlice.reducer;
export const { addFile, deleteFile } = filesSlice.actions;
