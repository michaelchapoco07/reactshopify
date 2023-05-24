import Products from "./pages/Products";
import ViewProduct from "./pages/ViewProduct";
import { CartProvider } from "./contexts/CartContext";
import CartCount from "./CartCount";
import Cart from "./pages/Cart";
import { Link, Route, Switch } from "wouter";

function App() {


  return (
    <>
    <CartProvider>
        <div style={{ display: "flex", gap: "8px" }}>
          <Link href="/">Home</Link>
          <div style={{ flexGrow: 1 }} />
          <CartCount />
        </div>

        <Switch>
          <Route path="/cart" component={Cart} />
          <Route path="/products/:productId" component={ViewProduct} />
          <Route path="/" component={Products} />
        </Switch>
      </CartProvider>
    </>
  )
}

export default App
