import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Row, Col, Alert } from "react-bootstrap";
import { Product } from "../types";

interface CartItem {
  _id: string;
  productId: string;
  quantity: number;
}

interface MergedItem extends CartItem, Product {}

const Cart: React.FC = () => {
  const API = "http://localhost:8000";

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch cart + products
  const fetchData = async () => {
    try {
      const [cartRes, productRes] = await Promise.all([
        axios.get(`${API}/api/cart`),
        axios.get(`${API}/api/products`)
      ]);

      setCartItems(cartRes.data);
      setProducts(productRes.data);
    } catch (error) {
      console.error("Error loading cart:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Remove item
  const handleRemove = async (id: string) => {
    // debugger;
    try {
      const response = await axios.delete(`${API}/api/cart/${id}`);
      setCartItems(prev => {
        const updated = prev.filter(item => item._id !== id);
        return updated;
      });
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  // Merge cart items with product details
  const mergedItems: MergedItem[] = cartItems
    .map(cartItem => {
      const product = products.find(p => p._id === cartItem.productId);
      if (!product) return null;
      return { ...product, ...cartItem };
    })
    .filter((item): item is MergedItem => item !== null);

  if (loading) {
    return <div className="container mt-4">Loading cart...</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Your Cart</h2>

      {/* Empty Cart Message */}
      {mergedItems.length === 0 && (
        <Alert variant="info">
          No items in your cart!
        </Alert>
      )}

      <Row>
        {mergedItems.map(item => (
          <Col md={3} key={item._id} className="mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={item.imageUrl}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>
                  ₹{item.price} <br />
                  <small>{item.category}</small>
                </Card.Text>

                <Button variant="danger" onClick={() => handleRemove(item._id)}> 
                  Remove from Cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Cart;
