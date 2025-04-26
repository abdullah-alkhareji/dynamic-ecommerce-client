import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import Container from "../components/layout/Container";
import { toast } from "react-hot-toast";

export default function ProductList() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5053/api/Products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Failed to fetch products", err));
  }, []);

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

  return (
    <Container>
      <h1 className="text-3xl font-bold mb-6 text-center">Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-700 font-medium mb-4">${product.price}</p>

            <div className="flex flex-col gap-2">
              <Link to={`/product/${product.id}`}>
                <Button variant="primary" className="w-full">
                  View Details
                </Button>
              </Link>

              <Button
                variant="secondary"
                className="w-full"
                onClick={() => handleAddToCart(product.id)}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
