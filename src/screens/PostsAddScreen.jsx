import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  useCreatePostsMutation,
  useGetPostsMutation
} from "../slices/postsApiSlice";
import { setPosts } from "../slices/postsSlice";
import { useGetCategoriesMutation } from "../slices/categoriesApiSlice";
import { setCategories } from "../slices/categoriesSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const PostsAddScreen = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [cvrImgUrl, setCvrImgUrl] = useState("");
  const [cats, setCats] = useState([]);

  const { categoryList } = useSelector((state) => state.categories);
  const [getCategories] = useGetCategoriesMutation();
  const [getPosts] = useGetPostsMutation();
  const [createPost, { isLoading }] = useCreatePostsMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getCategories()
      .unwrap()
      .then((res) => {
        dispatch(setCategories([...res]));
      });
  }, []);

  const handleCategorySelectChange = (e) => {
    e.preventDefault();
    const options = e.target.selectedOptions;
    const vals = [].slice.call(options).map((item) => parseInt(item.value));
    setCats(vals);
  };

  const refreshPosts = async () => {
    try {
      const res = await getPosts().unwrap();
      dispatch(setPosts([...res]));
      navigate("/posts");
    } catch (err) {
      if (err.originalStatus === 500) {
        toast.error("Something went wrong!", { theme: "colored" });
      }
      console.log(err);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await createPost({
        title: title,
        body: body,
        cover_img_url: cvrImgUrl,
        categories: cats
      }).unwrap();
      if (res) {
        await refreshPosts();
      }
    } catch (err) {
      if (err.originalStatus === 500) {
        toast.error("Something went wrong!", { theme: "colored" });
      }
      if (err.status === 400) {
        for (let key in err.data) {
          toast.error(`${key}: ${err.data[key][0]}`);
        }
      }
      console.log(err);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <FormContainer>
          <h1>Add a new post</h1>
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

            {categoryList.length > 0 && (
              <Form.Group className="my-3" controlId="body">
                <Form.Label>Categories</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  multiple
                  value={cats}
                  onChange={handleCategorySelectChange}
                  required
                >
                  {categoryList.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.title}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            )}

            <Button type="submit" variant="primary" className="mt-3">
              Upload
            </Button>
          </Form>
        </FormContainer>
      )}
    </>
  );
};

export default PostsAddScreen;
