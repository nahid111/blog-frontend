import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUserDetailsMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import Hero from "../components/Hero";

const HomeScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [userDetails, { isLoading }] = useUserDetailsMutation();
  const dispatch = useDispatch();

  const handleGetUser = async () => {
    try {
      const res = await userDetails().unwrap();
      console.log(res);
      dispatch(setCredentials({ ...userInfo, ...res }));
    } catch (err) {
      console.log(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (userInfo && !userInfo.email) {
      handleGetUser(userInfo.access);
    }
  }, []);

  return (
    <>
      <Hero />
    </>
  );
};

export default HomeScreen;
