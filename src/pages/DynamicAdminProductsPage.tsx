import { useEffect, useState } from "react";
import axios from "axios";
import DynamicRenderer from "../components/dynamic/DynamicRenderer";

type DynamicComponent = {
  type: string;
  props?: any;
  children?: DynamicComponent[];
};

export default function DynamicAdminProductsPage() {
  const [components, setComponents] = useState<DynamicComponent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5053/api/PageRenderer/admin/products")
      .then((res) => {
        setComponents(res.data.components);
      })
      .catch((err) => console.error("Failed to load admin products", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <p className="text-center py-10 text-gray-600">Loading products...</p>
    );

  return <DynamicRenderer components={components} />;
}
