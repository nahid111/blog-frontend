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
import Select, { MultiValue, ActionMeta } from "react-select";

type CatOp = {
  value: number;
  label: string;
};

const PostsUpdate = () => {
  let { postId } = useParams();
  const { data: postCategories } = useGetPostCategoriesQuery(postId);
  const { data: post, isLoading, isFetching } = useGetPostQuery(postId!);
  const { data: categoryList } = useGetCategoriesQuery();
  const [updatePost] = useUpdatePostMutation();
  const navigate = useNavigate();

  const [selectedOptions, setSelectedOptions] = useState<readonly CatOp[]>([]);
  const selectOptions = categoryList?.map((cat) => {
    return { value: cat.id, label: cat.title };
  });
  const handleSelect = (
    newValue: MultiValue<CatOp>,
    actionMeta: ActionMeta<CatOp>
  ) => {
    setSelectedOptions(newValue);
  };

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [cvrImgUrl, setCvrImgUrl] = useState("");

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updatePost({
      data: {
        title: title,
        body: body,
        cover_img_url: cvrImgUrl,
        categories: selectedOptions?.map((s) => s!.value)
      },
      id: postId
    });
    navigate("/posts");
  };

  const populate = () => {
    setTitle(post!.title);
    setBody(post!.body);
    setCvrImgUrl(post!.cover_img_url);
    setSelectedOptions((selectedOptions) =>
      postCategories.map((c: { id: number; title: string }) => {
        return { value: c.id, label: c.title };
      })
    );
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
                      <Select
                        isMulti
                        options={selectOptions}
                        value={selectedOptions}
                        onChange={handleSelect}
                      />
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
