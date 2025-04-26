import axios from "axios";
import { useEffect, useState } from "react";
import AdminLayout from "../components/admin/AdminLayout";

export default function AdminUsers() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5053/api/Admin/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Failed to load users", err));
  }, []);

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-6">Manage Users</h2>
      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100 text-gray-700 text-left">
            <th className="p-4">Username</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="p-4">{user.username}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
}
