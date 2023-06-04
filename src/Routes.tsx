import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import App from "./App";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Profile from "./screens/Profile";
import PostsList from "./screens/posts/PostsList";
import Post from "./screens/posts/Post";
import PostsAdd from "./screens/posts/PostsAdd";
import PostsUpdate from "./screens/posts/PostsUpdate";
import NotFound from "./components/NotFound";

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
          <Route path="/posts/:postId/update" element={<PostsUpdate />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </>
  )
);

const Routes = () => <RouterProvider router={router} />;

export default Routes;
