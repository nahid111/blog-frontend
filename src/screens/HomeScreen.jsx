import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUserDetailsMutation } from "../slices/usersApi";
import { setCredentials } from "../slices/authSlice";
import Hero from "../components/Hero";
import Loader from "../components/Loader";

const HomeScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [userDetails, { isLoading }] = useUserDetailsMutation();
  const dispatch = useDispatch();

  const handleGetUser = async () => {
    const res = await userDetails().unwrap();
    dispatch(setCredentials({ ...userInfo, ...res }));
  };

  useEffect(() => {
    if (userInfo && !userInfo.email) {
      handleGetUser(userInfo.access);
    }
  }, []);

  return <>{isLoading ? <Loader /> : <Hero />}</>;
};

export default HomeScreen;
