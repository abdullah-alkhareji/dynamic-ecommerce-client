import { useEffect, useState } from "react";
import axios from "axios";
import DynamicRenderer from "../dynamic/DynamicRenderer";

type DynamicComponent = {
  type: string;
  props?: any;
  children?: DynamicComponent[];
};

export default function DynamicHeaderLoader() {
  const [headerComponent, setHeaderComponent] =
    useState<DynamicComponent | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:5053/api/PageRenderer/header")
      .then((res) => {
        setHeaderComponent(res.data);
      })
      .catch((err) => console.error("Failed to load header", err));
  }, []);

  if (!headerComponent) return null;

  return <>{DynamicRenderer({ components: [headerComponent] })}</>;
}
