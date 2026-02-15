// This tells TypeScript what Product and CartItem look like

export interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
}

export interface CartItem {
  _id: string;
  productId: string;
  quantity: number;
}