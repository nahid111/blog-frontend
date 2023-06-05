import { useState } from "react";
import { useCreateCommentMutation } from "../slices/commentsApi";
import { Form, Button } from "react-bootstrap";
import PropTypes from "prop-types";

const CommentsAdd = ({
  postId,
  authorId
}: {
  postId: string;
  authorId: number;
}) => {
  const [body, setBody] = useState("");
  const [createComment, { isLoading }] = useCreateCommentMutation();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createComment({ body: body, post: postId, author: authorId });
  };

  return isLoading ? (
    <></>
  ) : (
    <>
      <div className="py-3 mb-5">
        <Form onSubmit={submitHandler}>
          <div className="d-flex flex-start w-100">
            <img
              className="rounded-circle shadow-1-strong me-3"
              src="https://img.freepik.com/free-vector/gradient-dynamic-lines-background_23-2149005728.jpg"
              alt="avatar"
              width="40"
              height="40"
            />

            <div className="form-outline w-100">
              <Form.Group className="my-3" controlId="body">
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  required
                />
                <Form.Label>Add your thought</Form.Label>
              </Form.Group>
            </div>
          </div>
          <div className="float-end mt-2 pt-1">
            <Button type="submit" variant="primary" size="sm">
              Add Comment
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

CommentsAdd.propTypes = {
  postId: PropTypes.string,
  authorId: PropTypes.number
};

export default CommentsAdd;
