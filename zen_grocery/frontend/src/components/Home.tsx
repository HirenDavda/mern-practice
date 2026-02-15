import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Form, Row, Col, Toast, ToastContainer } from "react-bootstrap";
import { Product } from "../types";

const Home: React.FC = () => {
  // Store products from database
  const [products, setProducts] = useState<Product[]>([]);

  // Store selected category
  const [category, setCategory] = useState<string>("All");

  // Store cart product IDs
  const [cartItems, setCartItems] = useState<string[]>([]);

  // Toast visibility
  const [showToast, setShowToast] = useState<boolean>(false);

  const API = "http://localhost:8000"; // API Gateway

  // Fetch products from backend
  useEffect(() => {
    axios.get(`${API}/api/products`)
      .then(res => {
        setProducts(res.data);
      })
      .catch(err => {
        console.error("Error fetching products:", err);
      });
  }, []);

  // Filter products based on category
  const filteredProducts =
    category === "All"
      ? products
      : products.filter(p => p.category === category);

  // Add product to cart
  const handleAddToCart = async (productId: string) => {
    
    // Check cart limit
    if (cartItems.length >= 10) {
      setShowToast(true);
      return;
    }

    try {
      const response = await axios.post(`${API}/api/cart`, {
        productId,
        quantity: 1
      });

      // Add to local cart state
      setCartItems([...cartItems, productId]);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div className="container mt-4">

      {/* Category Filter */}
      <Form.Select
        className="mb-4"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option>All</option>
        <option>Fruits</option>
        <option>Vegetables</option>
        <option>Dairy</option>
        <option>Snacks</option>
      </Form.Select>

      {/* Product Grid */}
      <Row>
        {filteredProducts.map(product => (
          <Col md={3} key={product._id} className="mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={product.imageUrl}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                  ₹{product.price} <br />
                  <small>{product.category}</small>
                </Card.Text>

                <Button
                  variant={cartItems.includes(product._id) ? "success" : "primary"}
                  disabled={cartItems.includes(product._id)}
                  onClick={() => handleAddToCart(product._id)}
                >
                  {cartItems.includes(product._id)
                    ? "Added to Cart"
                    : "Add to Cart"}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Toast Notification */}
      <ToastContainer position="top-end" className="p-3">
        <Toast
          bg="danger"
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={3000}
          autohide
        >
          <Toast.Body className="text-white">
            Cart limit reached! Maximum 10 items allowed.
          </Toast.Body>
        </Toast>
      </ToastContainer>

    </div>
  );
};

export default Home;
