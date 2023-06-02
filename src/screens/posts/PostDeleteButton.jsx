import { useNavigate } from "react-router-dom";
import { useDeletePostMutation } from "../../slices/postsApi";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";

const PostDeleteButton = ({ postId }) => {
  const navigate = useNavigate();
  const [deletePost, { isLoading }] = useDeletePostMutation();

  const removePost = async (e) => {
    e.preventDefault();
    if (window.confirm("Delete the item?")) {
      await deletePost(postId);
      toast.success("Post deleted");
      navigate("/posts");
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
