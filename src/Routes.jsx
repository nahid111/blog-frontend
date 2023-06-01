import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute.jsx";
import App from "./App.jsx";
import HomeScreen from "./screens/HomeScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import ProfileScreen from "./screens/ProfileScreen.jsx";
import PostsScreen from "./screens/posts/PostsScreen.jsx";
import PostScreen from "./screens/posts/PostScreen.jsx";
import PostsAddScreen from "./screens/posts/PostsAddScreen.jsx";
import NotFound from "./components/NotFound.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route index={true} path="/" element={<HomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/posts" element={<PostsScreen />} />
        <Route path="/posts/:postId" element={<PostScreen />} />
        <Route path="" element={<PrivateRoute />}>
          <Route path="/posts/add" element={<PostsAddScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </>
  )
);

const Routes = () => <RouterProvider router={router} />;

export default Routes;
