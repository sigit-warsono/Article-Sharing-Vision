import React, { useState, useEffect } from 'react'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";

const Editpost = () => {
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [titleerror, SetTitleError] = useState("");
  const [categoryerror, SetCategoryError] = useState("");
  const [contenterror, SetContentError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();



  const Publish = async (e) => {
    e.preventDefault();
    try {
    await axios.put(`http://localhost:8080/post/updatepost/${id}`, {

    id: id,
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

  } catch (err) {
    if (err.response) {
        // The client was given an error response (5xx, 4xx)
        // console.log(err.response.data.message.content);
  
        SetTitleError(err.response.data.message.title);
        SetContentError(err.response.data.message.content);
        SetCategoryError(err.response.data.message.category);
    }
  }
   
   
  };

  const Drafts = async (e) => {
    e.preventDefault();
    try {
    await axios.put(`http://localhost:8080/post/updatepost/${id}`, {
      id: id,
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
  }catch (err) {
    if (err.response) {
        // // The client was given an error response (5xx, 4xx)
        // console.log(err.response.data.message.content);
        SetTitleError(err.response.data.message.title);
        SetContentError(err.response.data.message.content);
        SetCategoryError(err.response.data.message.category);
    }
  }
  };

  useEffect(() => {
   
  
  const getPostById = async () => {
    const response = await axios.get(`http://localhost:8080/post/showpostid/${id}`);
    setTitle(response.data.data.title);
    setContent(response.data.data.content);
    setCategory(response.data.data.category);
  };

  getPostById();
}, [id]);




  return (
    <div className="addnew">
      <br />
      <h2>Edit Post</h2>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            style={{ width: "30rem" }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            minLength={20}
          />
             {titleerror && (
            <span className="error" style={{ color:"red"}}>{titleerror}</span>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter Content"
            style={{ width: "40rem" }}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            minLength={200}
          />
          {contenterror && (
            <span className="error" style={{ color:"red"}}>{contenterror}</span>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Category"
            style={{ width: "30rem" }}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            minLength={3}
          />
          {categoryerror && (
            <span className="error" style={{ color:"red"}}>{categoryerror}</span>
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

export default Editpost;
