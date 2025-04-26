import { useEffect, useState } from "react";
import axios from "axios";
import Container from "../components/layout/Container";
import Button from "../components/ui/Button";
import { toast } from "react-hot-toast";

export default function Cart() {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5053/api/Cart")
      .then((res) => setCart(res.data))
      .catch((err) => console.error("Failed to fetch cart", err));
  }, []);

  const handleRemoveFromCart = async (cartItemId: number) => {
    try {
      await axios.delete(`http://localhost:5053/api/Cart/${cartItemId}`);
      toast.success("✅ Removed from cart!");
      setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    } catch (error) {
      console.error("Failed to remove from cart", error);
      toast.error("❌ Failed to remove from cart.");
    }
  };

  return (
    <Container>
      <h1 className="text-3xl font-bold mb-6 text-center">My Cart</h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-left">
                <th className="p-4">Product</th>
                <th className="p-4">Price</th>
                <th className="p-4">Quantity</th>
                <th className="p-4">Total</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="p-4">{item.product?.name}</td>
                  <td className="p-4">${item.product?.price}</td>
                  <td className="p-4">{item.quantity}</td>
                  <td className="p-4">
                    $
                    {item.product
                      ? (item.product.price * item.quantity).toFixed(2)
                      : "0"}
                  </td>
                  <td className="p-4">
                    <Button
                      variant="secondary"
                      onClick={() => handleRemoveFromCart(item.id)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Container>
  );
}
