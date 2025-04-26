import axios from "axios";
import { useEffect, useState } from "react";
import AdminLayout from "../components/admin/AdminLayout";

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5053/api/Admin/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Failed to load products", err));
  }, []);

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-6">Manage Products</h2>
      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100 text-gray-700 text-left">
            <th className="p-4">Name</th>
            <th className="p-4">Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-t">
              <td className="p-4">{product.name}</td>
              <td className="p-4">${product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
}
