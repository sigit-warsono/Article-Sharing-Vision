
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { BsPencilFill } from "react-icons/bs";

const Trashed = (props) => {
  // const [trash, setTrash] = useState([]);

  // useEffect(() => {
  //   getTrash();
  // }, []);

  // const getTrash = async () => {
  //   const response = await axios.get("http://localhost:8080/post/trash");
  //   setTrash(response.data.data);
  // };

  //   const deleteUser = async (id) => {
  //     try {
  //       await axios.delete(`http://localhost:5000/users/${id}`);
  //       getUsers();
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  const {trash} =props;

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
        {trash.map((trash_data, index) => (
          <tr key={trash_data.id}>
            <td style={{ width: 50 }}>{index + 1}</td>
            <td style={{ width: 500 }}>{trash_data.title}</td>
            <td style={{ width: 90 }}>{trash_data.category}</td>
            <td style={{ width: 150 }}>
            <Link to={`/editpost/${trash_data.id}`}>
                <Button variant="warning">
                  <BsPencilFill /> Edit
                </Button>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Trashed;
