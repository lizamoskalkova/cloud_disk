import {
  AppBar,
  Box,
  Button,
  Input,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabaseClient } from "../api/Supabase";
import { FilesTable } from "../components/FilesTable";
import { useAppDispatch, useAppSelector } from "../store";
import { fetchUsers } from "../store/userSlice";
import { useAuth } from "./Auth";

export const Dashboard = () => {
  const { user, signOut } = useAuth();
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.users);

  const uploadFile = async (event) => {
    const file = event.target.files[0];
    const fileExt = file.name.split(".").pop();
    const fileName = `${fileExt}`;
    //const filePath = uuid() + '-' + file.name
    console.log(file);
    await supabaseClient.storage.from("files").upload(file.name, file);
  };
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  console.log("ise" + users);
  /*useEffect(() => {
    console.log('ffff'+ users[0].email);
  }, [dispatch, users]);*/

  //supabaseClient.storage.from('files').download()

  const navigate = useNavigate();

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
      <FilesTable />
    </Box>
  );
};
