import axios from "axios";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { BsPencilFill, BsTrashFill } from "react-icons/bs";

const Drafts = (props) => {
 

  const {draft} =props;


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
        {draft.map((draft_data, index) => (
          <tr key={draft_data.id}>
            <td style={{ width: 50 }}>{index + 1}</td>
            <td style={{ width: 500 }}>{draft_data.title}</td>
            <td style={{ width: 90 }}>{draft_data.category}</td>
            <td style={{ width: 150 }}>
            <Link to={`/editpost/${draft_data.id}`}>
                <Button variant="warning">
                  <BsPencilFill /> Edit
                </Button>
              </Link>
              &nbsp;&nbsp;
            
              <Button onClick={() => trashPost(draft_data.id)} variant="danger">
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

export default Drafts;
