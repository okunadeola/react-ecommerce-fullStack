import Home from "./Pages/Home";
import ProductList from "./Pages/ProductList";
import Product from "./Pages/Product"
import Cart from "./Pages/Cart";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Success from "./Pages/Success";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import { useSelector } from "react-redux";
import ForgotPassword from "./Pages/ForgotPassword";

function App() {
  const user = useSelector(state => state.user.currentUser ? state.user.currentUser :"")
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/products/:category" exact>
          <ProductList />
        </Route>
        <Route path="/product/:id" exact>
          <Product />
        </Route>
        <Route path="/Cart" exact>
          {!user ? <Redirect to="/Login" /> : <Cart />}
        </Route>
        <Route path="/success" exact>
          <Success />
        </Route>
        <Route path="/Register" exact>
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/Login" exact>
          {user ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route path="/ForgotPassword" exact>
          {user ? <Redirect to="/" /> : <ForgotPassword />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
