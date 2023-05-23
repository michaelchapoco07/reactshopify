import { FunctionComponent, useEffect, useState } from "react";
import { RouteComponentProps } from "wouter";
import { Product } from "./Products";
import { useCartContext } from "../contexts/CartContext";

const ViewProduct: FunctionComponent<RouteComponentProps> = ({ params }) => {
  const [product, setProduct] = useState<Product | undefined>();
  const { dispatch } = useCartContext();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${params.productId}`)
      .then((res) => res.json())
      .then((json) => setProduct(json));
  }, []);

  console.log(product);

  if (!product) {
    return <div>Loading...</div>; // Render a loading state while product is being fetched
  }

  return (
    <>
      <h2>Viewing a product</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        <div
          key={product.id}
          style={{ padding: "8px", border: "2px grey solid", width: "160px" }}
        >
          <img src={product.image} alt={product.title} style={{ width: "100%" }} />
          <p style={{ fontSize: ".8rem" }}>
            <strong>{product.title}</strong>
          </p>
          <p style={{ fontSize: ".6rem" }}>{product.description}</p>
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
      </div>
    </>
  );
};

export default ViewProduct;
