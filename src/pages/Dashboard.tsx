import { Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Auth";

export const Dashboard = () => {
  const { user, signOut } = useAuth();

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
