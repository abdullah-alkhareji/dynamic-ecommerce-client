import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "../components/ui/Button";
import Container from "../components/layout/Container";
import { toast } from "react-hot-toast";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    if (!id) return;

    axios
      .get(`http://localhost:5053/api/Products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Failed to fetch product details", err));
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await axios.post("http://localhost:5053/api/Cart/add", {
        productId: product.id,
        quantity: 1,
      });
      toast.success("✅ Added to cart!");
    } catch (error) {
      console.error("Failed to add to cart", error);
      toast.error("❌ Failed to add to cart.");
    }
  };

  if (!product)
    return <p className="text-center py-10 text-gray-600">Loading...</p>;

  return (
    <Container>
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <h2 className="text-xl text-gray-700 font-semibold mb-6">
          ${product.price}
        </h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          {product.description}
        </p>

        <Button variant="primary" className="w-full" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </div>
    </Container>
  );
}
