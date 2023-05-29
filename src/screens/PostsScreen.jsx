import { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useGetPostsMutation } from "../slices/postsApiSlice";
import { setPosts } from "../slices/postsSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const PostsScreen = () => {
  const dispatch = useDispatch();
  const { postList } = useSelector((state) => state.posts);
  const { userInfo } = useSelector((state) => state.auth);
  const [getPosts, { isLoading }] = useGetPostsMutation();

  useEffect(() => {
    if (!postList.length > 0) {
      fetchPostsList();
    }
  }, []);

  const fetchPostsList = async () => {
    try {
      const res = await getPosts().unwrap();
      dispatch(setPosts([...res]));
    } catch (err) {
      toast.error(err?.data?.detail, { theme: "colored" });
    }
  };

  return isLoading ? (
    <Loader />
  ) : postList.length > 0 ? (
    <>
      <div className="row">
        <div className="col-md-8">
          <h1 className="fs-1">Posts</h1>
        </div>
        <div className="col-md-4 text-end">
          {userInfo && (
            <LinkContainer to="/posts/add">
              <button type="button" className="btn btn-outline-primary">
                Add Post
              </button>
            </LinkContainer>
          )}
        </div>
      </div>
      <hr />
      {postList.map((post) => (
        <a href="#" key={post.id} style={{ textDecoration: "None" }}>
          <div className="card mb-3 border-light bg-secondary bg-opacity-10">
            <div className="row g-0">
              <div className="col-md-3">
                <img src={post.cover_img_url} className="img-fluid" />
              </div>
              <div className="col-md-9">
                <div className="card-body">
                  <h5 className="card-title">{post.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {post.author}
                  </h6>
                  <div className="card-text text-muted">
                    <p>
                      {post.created_at
                        .split("T")[0]
                        .split("-")
                        .reverse()
                        .join("-")}
                    </p>
                    <p>{post.categories.map((cat) => cat + " ")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </a>
      ))}
    </>
  ) : (
    <h1>No post found</h1>
  );
};

export default PostsScreen;
