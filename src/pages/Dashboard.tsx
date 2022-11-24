import {
  AppBar,
  Box,
  Button,
  Input,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabaseClient } from "../api/Supabase";
import { FilesTable } from "../components/FilesTable";
import { useAppDispatch, useAppSelector } from "../store";
import { addFile, getLink, uploadFiles } from "../store/fileSlice";
import { fetchUsers } from "../store/userSlice";
import { useAuth } from "./Auth";

export const Dashboard = () => {
  const { user, signOut } = useAuth();
  const [file, setFile] = useState();
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.users);
  const { fileArray } = useAppSelector((state) => state.files);

  const uploadFile = async (event) => {
    setFile(event.target.files[0]);
  };


  useEffect(() => {
    dispatch(uploadFiles(file));
    if (file !== undefined ) {
      getLink(file).then((val) => dispatch(addFile([file,val])))
    }
  }, [file]); 


  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  

  const navigate = useNavigate();
  const downloadFiles = async (event) => {
    console.log(fileArray);
    const { data, error } = await supabaseClient.storage
      .from("public/files")
      .download("222.png");
    console.log(data);
  };

  async function handleSignOut() {
    await signOut();

    navigate("/login");
  }

  return (
    <Box>
      <AppBar
        position="static"
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          spacing: 10 + "!important",
        }}
      >
        <Toolbar>
          <Typography sx={{ mr: 60 }}>
            Welcome Dear {user?.email?.split("@").slice(0, -1)}!
          </Typography>
          <Input
            placeholder="Search"
            sx={{ background: "white", borderRadius: 1 }}
            type="search"
          />
          <Button
            variant="contained"
            sx={{ ml: 6, mb: 0.7 }}
            onClick={handleSignOut}
          >
            Sign out
          </Button>
        </Toolbar>
      </AppBar>
      <Button sx={{ ml: 15, mt: 8 }} variant="contained" component="label">
        Upload File
        <input type="file" onChange={uploadFile} hidden />
      </Button>
      <FilesTable/>
      <Button id="outlined" onClick={downloadFiles}>
        {" "}
        Download
      </Button>
    </Box>
  );
};
