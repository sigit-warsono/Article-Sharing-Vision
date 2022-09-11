// import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { BsPencilFill, BsTrashFill } from "react-icons/bs";

const Published = (props) => {
  // const [publish, setPublish] = useState([]);

  // useEffect(() => {
  //   getPublish();
  // }, []);

  // const getPublish = async () => {
  //   const response = await axios.get("http://localhost:8080/post/publish");
  //   setPublish(response.data.data);
  // };

  const {publish} =props;

    const trashPost = async (id) => {

    await axios.put(`http://localhost:8080/post/trash/${id}`, {
      id: id,
      status: "trash",
    });


      props.setHandleTab(3);
      props.getTrash();
   
    };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>No</th>
          <th>Title</th>
          <th>Category</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {publish.map((publish_data, index) => (
          <tr key={publish_data.id}>
             <td style={{ width: 50 }}>{index + 1}</td>
            <td style={{ width: 500 }}>{publish_data.title}</td>
            <td style={{ width: 90 }}>{publish_data.category}</td>
            <td style={{ width: 150 }}>
              <Link to={`/editpost/${publish_data.id}`}>
                <Button variant="warning">
                  <BsPencilFill /> Edit
                </Button>
              </Link>
              &nbsp;&nbsp;
           
                <Button onClick={() => trashPost(publish_data.id)} variant="danger">
                  <BsTrashFill />
                  Trash
                </Button>
              
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Published;
