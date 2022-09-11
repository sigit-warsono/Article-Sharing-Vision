import React, { useState, useEffect } from "react";
import "./Styletab.css";
import Published from "./Published";
import Drafts from "./Drafts";
import Trashed from "./Trashed";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Allpost = () => {
  const { state } = useLocation();

  const [toggleState, setToggleState] = useState(state ? state.idd : 1);
  const [countTrash, setCountTrash]=useState('');
  const [countPublish, setCountPublish]=useState('');
  const [countDrafts, setCountDrafts]=useState('');



    const [trash, setTrash] = useState([]);
    const [publish, setPublish] = useState([]);
    const [draft, setDraft] = useState([]);

  
    useEffect(() => {
      getTrash();
      getPublish();
      getDraft();
    }, []);

    const getPublish = async () => {
      const response = await axios.get("http://localhost:8080/post/publish");
      const dataPublish=response.data.data;
      setPublish(dataPublish);
      setCountPublish(dataPublish.length);
    };

    const getDraft = async () => {
      const response = await axios.get("http://localhost:8080/post/draft");
      const dataDrafts=response.data.data;
      setDraft(dataDrafts);
      setCountDrafts(dataDrafts.length);
    };
  
    const getTrash = async () => {
      const response = await axios.get("http://localhost:8080/post/trash");
      const dataTrash=response.data.data;
      setTrash(dataTrash);
      setCountTrash(dataTrash.length);
    };


  const toggleTab = (idx) => {
    setToggleState(idx);
  };
  return (
    <div className="container1">
      <div className="block-tabs">
        <button
          className={toggleState === 1 ? "tabs tabs-active" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          Published ({countPublish})
        </button>
        <button
          className={toggleState === 2 ? "tabs tabs-active" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          Drafts ({countDrafts})
        </button>
        <button
          className={toggleState === 3 ? "tabs tabs-active" : "tabs"}
          onClick={() => toggleTab(3)}
        >
          Trashed ({countTrash})
        </button>
      </div>
      <div className="content-tabs">
        <div
          className={toggleState === 1 ? "content active-content" : "content"}
        >
          <h2>Publish</h2>

          <Published publish={publish} setHandleTab={toggleTab} getTrash={getTrash} />
        </div>
        <div
          className={toggleState === 2 ? "content active-content" : "content"}
        >
          <h2>Drafts</h2>

          <Drafts draft={draft} setHandleTab={toggleTab} getTrash={getTrash} />
        </div>
        <div
          className={toggleState === 3 ? "content active-content" : "content"}
        >
          <h2>Trashed</h2>

          <Trashed trash={trash}/>
        </div>
      </div>
    </div>
  );
};

export default Allpost;
