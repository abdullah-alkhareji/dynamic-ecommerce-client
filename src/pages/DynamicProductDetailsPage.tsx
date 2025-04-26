import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import DynamicRenderer from "../components/dynamic/DynamicRenderer";

type DynamicComponent = {
  type: string;
  props?: any;
  children?: DynamicComponent[];
};

export default function DynamicProductDetailsPage() {
  const { id } = useParams();
  const [components, setComponents] = useState<DynamicComponent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    axios
      .get(`http://localhost:5053/api/PageRenderer/product/${id}`)
      .then((res) => {
        setComponents(res.data.components);
      })
      .catch((err) => console.error("Failed to load product details", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <p className="text-center py-10 text-gray-600">Loading product...</p>
    );

  return <DynamicRenderer components={components} />;
}
