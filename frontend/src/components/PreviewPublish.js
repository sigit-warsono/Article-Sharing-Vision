import React, { useState, useEffect, Fragment } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";
import './pagiante.css';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';



const PreviewPublish = () => {

    const [previews, setPreviews] = useState([]);
    const [page, setPage] = useState(0);
    const [pages, setPages] = useState(0);
    const [rows, setRows] = useState(0);
    const MAX_LENGTH = 100;

    useEffect(() => {

      const getPreviews = async () => {
        const response = await axios.get(
          `http://localhost:8080/preview/${page}`
        );
        setPreviews(response.data.data);
        setPage(response.data.page);
        setPages(response.data.totalPage);
        setRows(response.data.totalRows);
      };

      getPreviews();
      
    }, [page]);

    
      const changePage = ({ selected }) => {
        setPage(selected);
      };

      

  return (
    <Fragment>
  
                <div className="container mt-5">
            <Row xs={1} md={4} className="g-4">
                            {previews.map((priview, index) => (
                       
                        <Col key={priview.id}>
                            {/* <Card border="primary" style={{ width: '18rem' }}>
                            <Card.Header>{priview.status}</Card.Header>
                            <Card.Body>
                            <Card.Text>
                               {priview.title.substring(0, MAX_LENGTH)}...
                            </Card.Text>
                            </Card.Body>
                        </Card> */}
                        <Card
          bg={'Success'.toLowerCase()}
          key={'Success'}
          text={'Success'.toLowerCase() === 'light' ? 'dark' : 'white'}
          style={{ width: '18rem' }}
          className="mb-2"
        >
          <Card.Header>{priview.status}</Card.Header>
          <Card.Body>
            <Card.Title>Title </Card.Title>
            <Card.Text>
            {priview.title.substring(0, MAX_LENGTH)}...
            </Card.Text>
          </Card.Body>
        </Card>
                        </Col>
                            ))}
            </Row>

            <nav
                className="pagination is-centered"
                key={rows}
                role="navigation"
                aria-label="Pagination">
                <ReactPaginate
                 previousLabel={"prev"}
                 nextLabel={"next"}
                 breakLabel={"..."}
                 breakClassName={"break-me"}
                 pageCount={pages}
                 marginPagesDisplayed={2}
                 pageRangeDisplayed={5}
                 onPageChange={changePage}
                 containerClassName={"pagination"}
                 subContainerClassName={"pages pagination"}
                 activeClassName={"active"}/>
                </nav>

 </div>
 </Fragment>
  )
}

export default PreviewPublish