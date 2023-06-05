import { Container, Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../slices/hooks";
import { useUserDetailsMutation } from "../slices/usersApi";
import { setCredentials } from "../slices/authSlice";
import Loader from "../components/Loader";

const Home = () => {
  const { userInfo } = useAppSelector((state) => state.auth);
  const [userDetails, { isLoading }] = useUserDetailsMutation();
  const dispatch = useAppDispatch();

  const handleGetUser = async () => {
    const res = await userDetails().unwrap();
    dispatch(setCredentials({ ...userInfo, ...res }));
  };

  useEffect(() => {
    if (userInfo && !userInfo.email) {
      handleGetUser();
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className=" py-5">
          <Container className="d-flex justify-content-center">
            <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
              <h1 className="text-center mb-4">Blog App</h1>
              <p className="text-center mb-4">This is a boilerplate App</p>
              <div className="d-flex">
                {userInfo ? (
                  <>
                    <LinkContainer to="/posts">
                      <Button variant="primary" className="me-3">
                        View Posts
                      </Button>
                    </LinkContainer>
                  </>
                ) : (
                  <>
                    <LinkContainer to="/login">
                      <Button variant="primary" className="me-3">
                        Sign In
                      </Button>
                    </LinkContainer>
                    <LinkContainer to="/register">
                      <Button variant="secondary">Register</Button>
                    </LinkContainer>
                  </>
                )}
              </div>
            </Card>
          </Container>
        </div>
      )}
    </>
  );
};

export default Home;
