import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Nav from "./Components/Nav";
import AddPost from "./Components/AddTodo";
import Todo from "./Components/Todo";

function App() {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Router>
      <div className="App">
        {isAuth && <Nav />}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/add-post" component={AddPost} />
          <Route path="/todo/:id" children={<Todo />}></Route>
          <Route exact path="*">
            Route Not Found
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
