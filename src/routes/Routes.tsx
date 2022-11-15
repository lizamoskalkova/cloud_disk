import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./list";

export const IRoutes = () => {
  return (
    <Router>
      <Routes>
        {routes.map(({ path, component: Component }) => {
          return (
            <Route path={path} key={`route ${path}`} element={<Component />} />
          );
        })}
      </Routes>
    </Router>
  );
};
