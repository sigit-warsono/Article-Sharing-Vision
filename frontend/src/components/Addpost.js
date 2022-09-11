import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";



const Addpost = () => {
  const intialValues = { title: "", content: "", category:""};

  const [formValues, setFormValues] = useState(intialValues);
  const [formErrors, setFormErrors] = useState({});


  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };


  const Publish = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    await axios.post("http://localhost:8080/post/create", {
      title: title,
      content: content,
      category: category,
      status: "publish",
    });
    navigate("/allpost", {
      state: {
        idd: 1,
      },
    });
  };

  const Drafts = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    await axios.post("http://localhost:8080/post/create", {
      title: title,
      content: content,
      category: category,
      status: "drafts",
    });
    navigate("/allpost", {
      state: {
        idd: 2,
      },
    });
  };


   //form validation handler
   const validate = (values) => {
    let errors = {};


    if (!values.title) {
      errors.title = "Required";
    } else if (values.title.length < 20) {
      errors.title = "Minimal 20 karakter";
    }

    if (!values.content) {
      errors.content = "Required";
    } else if (values.content.length < 200) {
      errors.content = "Minimal 200 karakter";
    }

    if (!values.category) {
      errors.category = "Required";
    } else if (values.category.length < 3) {
      errors.category = "Minimal 3 karakter";
    }

    return errors;
  };

  return (
    <div className="addnew">
      <br />
      <h2>Add Post</h2>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            style={{ width: "30rem" }}
            name="title"
            id="title"
            // onChange={(e) => setitle(e.target.value)}
            value={formValues.title}
            onChange={(e) => { handleChange(e); setTitle(e.target.value); }}
            minLength={20} 
          />
            {formErrors.title && (
            <span className="error" style={{ color:"red"}}>{formErrors.title}</span>
          )}
        </Form.Group>
      

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter Content"
            style={{ width: "40rem" }}
            value={formValues.content}
            name="content"
            id="content"
            onChange={(e) => { handleChange(e); setContent(e.target.value) }}
            // onChange={(e) => setContent(e.target.value)}
            minLength={200} noValidate
          />
          {formErrors.content && (
            <span className="error" style={{ color:"red"}}>{formErrors.content}</span>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Category"
            style={{ width: "30rem" }}
            name="category"
            id="category"
            onChange={(e) => { handleChange(e); setCategory(e.target.value) }}
            minLength={3} noValidate
          />
           {formErrors.category && (
            <span className="error" style={{ color:"red"}}>{formErrors.category}</span>
          )}
        </Form.Group>

        <ButtonToolbar aria-label="Toolbar with button groups">
          <ButtonGroup className="me-2" aria-label="First group">
            <Button variant="primary" type="submit" onClick={Publish}>
              Publish
            </Button>
          </ButtonGroup>

          <ButtonGroup className="me-2" aria-label="First group">
            <Button variant="primary" type="submit" onClick={Drafts}>
              Drafts
            </Button>
          </ButtonGroup>
        </ButtonToolbar>
      </Form>
    </div>
  );
};

export default Addpost;
