import { Link } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-blue-800 text-white flex flex-col p-6 space-y-6">
      <Link to="/admin/products" className="hover:underline text-lg font-bold">
        Products
      </Link>
      <Link to="/admin/users" className="hover:underline text-lg font-bold">
        Users
      </Link>
    </aside>
  );
}
