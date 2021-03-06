import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Success from "./pages/Success";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import { useSelector } from "react-redux";

const App = () => {
  const user = useSelector(state => state.user.currentUser)

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user? <Home /> : <Redirect to="/login"/> }
        </Route>
        <Route path="/products/:category">
          <ProductList />
        </Route>
        <Route path="/product/:id">
          <Product />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="/success">
          <Success />
        </Route>
        <Route path="/login">
          {!user?  <Login /> : <Redirect to="/" />}
        </Route>
        <Route path="/register">
          {!user ? <Register /> : <Home />}
        </Route>
      </Switch>
    </Router>
  )
}

export default App;