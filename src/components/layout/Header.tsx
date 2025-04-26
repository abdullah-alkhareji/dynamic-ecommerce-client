import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          MyShop
        </Link>
        <nav className="flex items-center gap-6">
          <Link to="/" className="hover:underline">
            Products
          </Link>
          <Link to="/cart" className="hover:underline">
            Cart
          </Link>
          <Link to="/admin/products" className="hover:underline">
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
