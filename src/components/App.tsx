import { Stack } from "@mui/material";
import { AuthProvider } from "../pages/Auth";
import { IRoutes } from "../routes/Routes";
import styles from './App.module.css';

const App = () => {
  return (
    <div className={styles.app}>
      <AuthProvider>
        <IRoutes />
      </AuthProvider>
    </div>
  );
};
export default App;
