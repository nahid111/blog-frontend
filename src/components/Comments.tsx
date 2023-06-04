import { useSelector } from "react-redux";
import { useGetPostCommentsQuery } from "../slices/postsApi";
import CommentsAdd from "./CommentsAdd";
import PropTypes from "prop-types";

const Comments = ({ postId }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const {
    data: comments,
    isLoading,
    isFetching
  } = useGetPostCommentsQuery(postId);

  return isLoading || isFetching ? (
    <></>
  ) : (
    <>
      <div className="row mt-5 d-flex justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-0 border bg-light">
            <div className="card-body p-4">
              {userInfo ? (
                <CommentsAdd postId={postId} authorId={userInfo.id} />
              ) : (
                <p className="text-primary">Sign in to add a comment</p>
              )}

              {comments.map((comment) => (
                <div key={comment.id} className="card mb-4">
                  <div className="card-body">
                    <p>{comment.body}</p>

                    <div className="d-flex justify-content-between">
                      <div className="d-flex flex-row align-items-center">
                        <img
                          src="https://img.freepik.com/free-vector/gradient-dynamic-lines-background_23-2149005728.jpg"
                          alt="avatar"
                          width="25"
                          height="25"
                        />
                        <p className="small mb-0 ms-2">{comment.author}</p>
                      </div>
                      <div className="d-flex flex-row align-items-center">
                        <p className="small text-muted mb-0">
                          {comment.created_at
                            .split("T")[0]
                            .split("-")
                            .reverse()
                            .join("-")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Comments.propTypes = {
  postId: PropTypes.string
};

export default Comments;
