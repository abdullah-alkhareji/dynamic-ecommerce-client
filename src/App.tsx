import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

import DynamicProductsPage from "./pages/DynamicProductsPage";
import DynamicCartPage from "./pages/DynamicCartPage";
import DynamicProductDetailsPage from "./pages/DynamicProductDetailsPage";
import DynamicAdminProductsPage from "./pages/DynamicAdminProductsPage";
import DynamicAdminUsersPage from "./pages/DynamicAdminUsersPage";

import DynamicHeaderLoader from "./components/layout/DynamicHeaderLoader";
import Container from "./components/layout/Container";

const pageComponentMap: any = {
  DynamicProductsPage,
  DynamicCartPage,
  DynamicProductDetailsPage,
  DynamicAdminProductsPage,
  DynamicAdminUsersPage,
};

type RouteDefinition = {
  path: string;
  page: string;
};

export default function App() {
  const [routes, setRoutes] = useState<RouteDefinition[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5053/api/PageRenderer/routes")
      .then((res) => setRoutes(res.data))
      .catch((err) => console.error("Failed to load routes", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center py-10">Loading app...</p>;

  return (
    <Router>
      <DynamicHeaderLoader />
      <Container>
        <Routes>
          {routes.map((route, idx) => {
            const Component = pageComponentMap[route.page];
            if (!Component) return null;
            return (
              <Route key={idx} path={route.path} element={<Component />} />
            );
          })}
        </Routes>
      </Container>
    </Router>
  );
}
