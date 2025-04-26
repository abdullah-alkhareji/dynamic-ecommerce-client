import PageTitle from "../ui/PageTitle";
import Card from "../ui/Card";
import Container from "../layout/Container";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import DynamicHeader from "./DynamicHeader";
import DynamicAdminSidebar from "../admin/DynamicAdminSidebar";
import DynamicAdminHeader from "../admin/DynamicAdminHeader";

type DynamicComponent = {
  type: string;
  props?: any;
  children?: DynamicComponent[];
};

type DynamicRendererProps = {
  components: DynamicComponent[];
};

const gridCols = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
};

const handleAddToCart = async (productId: number) => {
  try {
    await axios.post("http://localhost:5053/api/Cart/add", {
      productId,
      quantity: 1,
    });
    toast.success("✅ Added to cart!");
  } catch (error) {
    console.error("Failed to add to cart", error);
    toast.error("❌ Failed to add to cart.");
  }
};

const handleRemoveFromCart = async (cartItemId: number) => {
  try {
    await axios.delete(`http://localhost:5053/api/Cart/${cartItemId}`);
    toast.success("✅ Removed from cart!");

    // Refresh page after removing
    window.location.reload();
  } catch (error) {
    console.error("Failed to remove from cart", error);
    toast.error("❌ Failed to remove from cart.");
  }
};

const handleDeleteProduct = async (productId: number) => {
  try {
    await axios.delete(`http://localhost:5053/api/Admin/products/${productId}`);
    toast.success("✅ Product deleted!");
    window.location.reload(); // Refresh page
  } catch (error) {
    console.error("Failed to delete product", error);
    toast.error("❌ Failed to delete product.");
  }
};

const handleDeleteUser = async (userId: number) => {
  try {
    await axios.delete(`http://localhost:5053/api/Admin/users/${userId}`);
    toast.success("✅ User deleted!");
    window.location.reload();
  } catch (error) {
    console.error("Failed to delete user", error);
    toast.error("❌ Failed to delete user.");
  }
};

const renderComponent = (component: DynamicComponent) => {
  const { type, props, children } = component;

  switch (type) {
    case "PageTitle":
      return <PageTitle {...props} />;
    case "Card":
      return (
        <Card>
          {props.title && (
            <h2 className="text-lg font-bold mb-2">{props.title}</h2>
          )}
          {props.description && (
            <p className="text-gray-600">{props.description}</p>
          )}
          {props.price && (
            <p className="text-blue-600 font-semibold mb-4">{props.price}</p>
          )}
          {children &&
            children.map((child, idx) => (
              <div key={idx} className="mt-2">
                {renderComponent(child)}
              </div>
            ))}
        </Card>
      );

    case "Grid":
      return (
        <div
          className={`grid gap-6 ${
            gridCols[props.columns as keyof typeof gridCols] || "grid-cols-3"
          }`}
        >
          {children &&
            children.map((child, idx) => (
              <div key={idx}>{renderComponent(child)}</div>
            ))}
        </div>
      );

    case "Button":
      if (props.href) {
        return (
          <Link to={props.href}>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
              {props.label}
            </button>
          </Link>
        );
      } else if (props.action === "addToCart") {
        return (
          <button
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
            onClick={() => handleAddToCart(props.productId)}
          >
            {props.label}
          </button>
        );
      } else if (props.action === "removeFromCart") {
        return (
          <button
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
            onClick={() => handleRemoveFromCart(props.cartItemId)}
          >
            {props.label}
          </button>
        );
      } else if (props.action === "deleteProduct") {
        return (
          <button
            className="w-full bg-red-700 hover:bg-red-800 text-white font-semibold py-2 px-4 rounded"
            onClick={() => handleDeleteProduct(props.productId)}
          >
            {props.label}
          </button>
        );
      } else if (props.action === "deleteUser") {
        return (
          <button
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
            onClick={() => handleDeleteUser(props.userId)}
          >
            {props.label}
          </button>
        );
      } else {
        return (
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
            {props.label}
          </button>
        );
      }

    case "Table":
      return (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-left">
                {props.headers.map((header: string, idx: number) => (
                  <th key={idx} className="p-4">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {children &&
                children.map((child, idx) => (
                  <tr key={idx}>{renderComponent(child)}</tr>
                ))}
            </tbody>
          </table>
        </div>
      );

    case "TableRow":
      return (
        <>
          {props.cells.map((cell: any, idx: number) => (
            <td key={idx} className="p-4 border-t">
              {typeof cell === "object" ? renderComponent(cell) : cell}
            </td>
          ))}
        </>
      );

    case "Header":
      return <DynamicHeader {...props} />;

    case "AdminSidebar":
      return <DynamicAdminSidebar {...props} />;

    case "AdminHeader":
      return <DynamicAdminHeader {...props} />;

    default:
      return null;
  }
};

export default function DynamicRenderer({ components }: DynamicRendererProps) {
  return (
    <Container>
      {components.map((component, idx) => (
        <div key={idx}>{renderComponent(component)}</div>
      ))}
    </Container>
  );
}
