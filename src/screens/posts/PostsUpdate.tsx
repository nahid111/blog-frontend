import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetPostQuery,
  useUpdatePostMutation,
  useGetPostCategoriesQuery
} from "../../slices/postsApi";
import { useGetCategoriesQuery } from "../../slices/categoriesApi";
import Loader from "../../components/Loader";

const PostsUpdate = () => {
  let { postId } = useParams();
  const { data: postCategories } = useGetPostCategoriesQuery(postId);
  const { data: post, isLoading, isFetching } = useGetPostQuery(postId);
  const { data: categoryList } = useGetCategoriesQuery();
  const [updatePost] = useUpdatePostMutation();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [cvrImgUrl, setCvrImgUrl] = useState("");
  const [cats, setCats] = useState<number[]>([]);

  const handleCategorySelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    e.preventDefault();
    const selectedOptions = e.currentTarget.selectedOptions;
    const vals = [];
    for (let i = 0; i < selectedOptions.length; i++) {
      vals.push(selectedOptions[i].value);
    }
    setCats(vals.map((v) => parseInt(v)));
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updatePost({
      data: {
        title: title,
        body: body,
        cover_img_url: cvrImgUrl,
        categories: cats
      },
      id: postId
    });
    navigate("/posts");
  };

  const populate = () => {
    setTitle(post.title);
    setBody(post.body);
    setCvrImgUrl(post.cover_img_url);
    setCats((cats) => postCategories.map((c: { id: number }) => c.id));
  };

  useEffect(() => {
    post && postCategories && populate();
  }, [post, postCategories]);

  return (
    <>
      {isLoading || isFetching ? (
        <Loader />
      ) : (
        <>
          <Container>
            <Row className="justify-content-md-center mt-5">
              <Col xs={12} md={8} className="card p-5">
                <h1>Update post</h1>
                <Form onSubmit={submitHandler}>
                  <Form.Group className="my-3" controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group className="my-3" controlId="cvrImgUrl">
                    <Form.Label>Cover Image URL</Form.Label>
                    <Form.Control
                      type="text"
                      value={cvrImgUrl}
                      onChange={(e) => setCvrImgUrl(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group className="my-3" controlId="body">
                    <Form.Label>Body</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                      required
                    />
                  </Form.Group>

                  {categoryList && categoryList.length > 0 && (
                    <Form.Group className="my-3" controlId="body">
                      <Form.Label>Categories</Form.Label>
                      <Form.Select
                        aria-label="Default select example"
                        multiple
                        value={cats}
                        onChange={handleCategorySelectChange}
                        required
                      >
                        {categoryList.map(
                          (c: { id: number; title: string }) => (
                            <option key={c.id} value={c.id}>
                              {c.title}
                            </option>
                          )
                        )}
                      </Form.Select>
                    </Form.Group>
                  )}

                  <Button type="submit" variant="primary" className="mt-3">
                    Update
                  </Button>
                </Form>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  );
};

export default PostsUpdate;
