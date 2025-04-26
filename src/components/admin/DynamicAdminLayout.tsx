import { useEffect, useState } from "react";
import axios from "axios";
import DynamicRenderer from "../dynamic/DynamicRenderer";
import { Outlet } from "react-router-dom";

type DynamicComponent = {
  type: string;
  props?: any;
  children?: DynamicComponent[];
};

export default function DynamicAdminLayout() {
  const [sidebar, setSidebar] = useState<DynamicComponent | null>(null);
  const [header, setHeader] = useState<DynamicComponent | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:5053/api/PageRenderer/admin/sidebar")
      .then((res) => setSidebar(res.data));

    axios
      .get("http://localhost:5053/api/PageRenderer/admin/header")
      .then((res) => setHeader(res.data));
  }, []);

  if (!sidebar || !header)
    return <p className="text-center py-10">Loading layout...</p>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div>{DynamicRenderer({ components: [sidebar] })}</div>
      <div className="flex flex-col flex-1">
        <div>{DynamicRenderer({ components: [header] })}</div>
        <main className="p-6">{<Outlet />}</main>
      </div>
    </div>
  );
}
