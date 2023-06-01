import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useDeletePostMutation } from "../../slices/postsApiSlice";
import { setPosts } from "../../slices/postsSlice";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";

const PostDeleteButton = ({ postId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [deletePost, { isLoading }] = useDeletePostMutation();

  const removePost = async (e) => {
    e.preventDefault();
    if (window.confirm("Delete the item?")) {
      try {
        const res = await deletePost(postId).unwrap();
        res && toast.success("Post deleted");
        dispatch(setPosts([]));
        navigate("/posts");
      } catch (err) {
        if (err.status === 401) {
          toast.error("Token expired. Please Sign-in");
        }
        console.log(err);
      }
    }
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-danger btn-lg"
        onClick={removePost}
        disabled={isLoading}
      >
        <FaTrash /> Delete
      </button>
    </>
  );
};

export default PostDeleteButton;
