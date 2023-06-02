import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute.jsx";
import App from "./App.jsx";
import Home from "./screens/Home.jsx";
import Login from "./screens/Login.jsx";
import Register from "./screens/Register.jsx";
import Profile from "./screens/Profile.jsx";
import PostsList from "./screens/posts/PostsList.jsx";
import Post from "./screens/posts/Post.jsx";
import PostsAdd from "./screens/posts/PostsAdd.jsx";
import NotFound from "./components/NotFound.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route index={true} path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/posts" element={<PostsList />} />
        <Route path="/posts/:postId" element={<Post />} />
        <Route path="" element={<PrivateRoute />}>
          <Route path="/posts/add" element={<PostsAdd />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </>
  )
);

const Routes = () => <RouterProvider router={router} />;

export default Routes;
