import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import AdminProducts from "./pages/AdminProducts";
import AdminUsers from "./pages/AdminUsers";
import { Toaster } from "react-hot-toast";
import DynamicProductsPage from "./pages/DynamicProductsPage";
import DynamicCartPage from "./pages/DynamicCartPage";
import DynamicProductDetailsPage from "./pages/DynamicProductDetailsPage";
import DynamicAdminProductsPage from "./pages/DynamicAdminProductsPage";
import DynamicAdminUsersPage from "./pages/DynamicAdminUsersPage";
import DynamicHeaderLoader from "./components/layout/DynamicHeaderLoader";
import DynamicAdminLayout from "./components/admin/DynamicAdminLayout";

function App() {
  return (
    <Router>
      <DynamicHeaderLoader />
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/dynamic-products" element={<DynamicProductsPage />} />
        <Route path="/dynamic-cart" element={<DynamicCartPage />} />
        <Route
          path="/dynamic-product/:id"
          element={<DynamicProductDetailsPage />}
        />
        <Route path="/admin" element={<DynamicAdminLayout />}>
          <Route
            path="/admin/dynamic-products"
            element={<DynamicAdminProductsPage />}
          />
          <Route
            path="/admin/dynamic-users"
            element={<DynamicAdminUsersPage />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
