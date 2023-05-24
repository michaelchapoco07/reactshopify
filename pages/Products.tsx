import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useCartContext } from "../contexts/CartContext";

export type Product = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  rating: { rate: number; count: number };
  title: string;
};
export default function Products() {
  const [_, setLocation] = useLocation();
  const [products, setProducts] = useState<Product[]>([]);
  const { dispatch } = useCartContext();
  const [search, setSearch] = useState("");
  const filteredProducts = products.filter((product) => {
    if (
      product.category.toLowerCase().includes(search) ||
      product.title.toLowerCase().includes(search)
    ) {
      return product;
    }
  });
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => setProducts(json));
  }, []);
  return (
    <>
      <h2>Products</h2>
      <div className="searchBarSection">
      <div className="searchBar">
      <input
  className="input"
  onChange={(e) => {
    setSearch(e.target.value.toLowerCase());
  }}
/>
        <button className="button">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            style={{ padding: "8px", border: "2px grey solid", width: "160px" }}
          >
            <img
              src={product.image}
              alt={product.title}
              style={{ width: "100%" }}
            />
            <p style={{ fontSize: ".8rem" }}>
              <strong>{product.title}</strong>
            </p>
            <p style={{ fontSize: ".6rem" }}>{product.description}</p>
            <button
              style={{ width: "100%" }}
              onClick={() => {
                setLocation(`/products/${product.id}`);
              }}
            >
              View
            </button>
            <div style={{ margin: "8px" }} />
            <button
              style={{
                width: "100%",
                backgroundColor: "red",
                border: "1px solid red",
                color: "white",
              }}
              onClick={() => {
                dispatch({ type: "addToCart", product });
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </>
  );
}