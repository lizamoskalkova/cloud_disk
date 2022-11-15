import { Stack } from "@mui/material";
import { AuthProvider } from "../pages/Auth";
import { IRoutes } from "../routes/Routes";

const App = () => {
  return (
    <div>
      <Stack
        sx={{
          alignItems: "center",
          mt: 10,
        }}
      >
        Welcome to your Cloud Disk!
      </Stack>
      <AuthProvider>
        <IRoutes />
      </AuthProvider>
    </div>
  );
};
export default App;
