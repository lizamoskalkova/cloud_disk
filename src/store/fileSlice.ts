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
  size: string;
  lastModifiedDate: Date;
  type: string;
  webkitRelativePath: string;
  link?: string;
}

interface IFilesState {
  fileArray: File[];
}

const initialState: IFilesState = {
  fileArray: [],
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
          webkitRelativePath: payload.webkitRelativePath,
          link: payload[1]
        },
      ],
    }),
  },
});

export default filesSlice.reducer;
export const { addFile } = filesSlice.actions;
