import { Button, Stack } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store";
import { fetchUsers } from "../store/userSlice";
import { useAuth } from "./Auth";

export const Dashboard = () => {
  const { user, signOut } = useAuth();
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.users);


  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  console.log('ise'+users);
  useEffect(() => {
    console.log('ffff'+ users[0].email);
  }, [dispatch, users]);


  const navigate = useNavigate();

  async function handleSignOut() {
    await signOut();

    navigate("/login");
  }

  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        spacing: 10,
        mt: 6,
      }}
    >
      <p>Welcome Dear {user?.email}!</p>
      <Button variant="contained" sx={{ mt: 4 }} onClick={handleSignOut}>
        Sign out
      </Button>
    </Stack>
  );
};
