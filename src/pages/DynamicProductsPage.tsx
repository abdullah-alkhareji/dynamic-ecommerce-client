import { useEffect, useState } from "react";
import axios from "axios";
import DynamicRenderer from "../components/dynamic/DynamicRenderer";

type DynamicComponent = {
  type: string;
  props?: any;
  children?: DynamicComponent[];
};

export default function DynamicProductsPage() {
  const [components, setComponents] = useState<DynamicComponent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5053/api/PageRenderer/products")
      .then((res) => {
        setComponents(res.data.components);
      })
      .catch((err) => console.error("Failed to load dynamic page", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return <p className="text-center py-10 text-gray-600">Loading page...</p>;

  return <DynamicRenderer components={components} />;
}
