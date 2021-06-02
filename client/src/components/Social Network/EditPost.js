import '../../css/Forms.css'
import axios from 'axios'
import {useHistory } from 'react-router-dom';
import React from 'react';

export default function EditPost() {
  var index = window.location.toString().lastIndexOf('/') + 1
  const postID = window.location.toString().substring(index)
  const userID= window.sessionStorage.getItem('userID');
  const history = useHistory();
  const [post, setPost] = React.useState();
  const [content, setContent] = React.useState("");
  const [status, setStatus] = React.useState("")
  React.useEffect(() => {
    fetch(process.env.REACT_APP_SERVER_URL+'/post/' + postID)
      .then(response => response.json()).then(
        data => {
          setPost(data);
          setContent(data.content);
          setStatus(data.status);
        }
      )
  }, []);

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  }
  const handleContentChange = (event) => {
    setContent(event.target.value);
  }

  return (
    <div style={{ fontFamily: "Open Sans" }}>
      <section id="hero" className="d-flex align-items-center">
        <div className="container position-relative text-center text-lg-left" data-aos="zoom-in" data-aos-delay={100}>
          <div className="wrapper fadeInDown">
            <div id="formContent">
              <div className="fadeIn first"><br />
                <h1 style={{ fontSize: '35px', color: '#51361A' }} >Edit Post </h1>
              </div>

              <form onSubmit={(e) => {
                editPost(e, status,content, postID,userID,history)
              }}>
                <input style={{ fontSize: '12px' }} type="text" id="content" className="fadeIn second" name="addAGarden" placeholder={content}
                onChange={handleContentChange} />
                <br />
                <a>
                  Status:&nbsp;
                  <select value={status} onChange={handleStatusChange}>
                  <option value="Tip">Tip</option>
                  <option value="Question">Question</option>
                  <option value="Help">Help</option>
                  </select>
                </a>
                <br /><br />
             
               
                <br /><br />
                <button style={{ width: '120px', background: '#84996f' }} className="button" type="submit"><span>Save Changes</span></button> &nbsp;
                <button style={{ width: '120px', background: '#84996f' }} className="button" onClick={() => history.push('/mygardens')}><span>Cancel</span></button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

}

function editPost(e, status,content,postID,userID,history) {
  e.preventDefault();

  const updatedPost = {
    content:content,
    userID:userID,
    postID: postID,
    status: status
  }

  axios.put(process.env.REACT_APP_SERVER_URL+'/post/', updatedPost);
  history.push('/newsfeed')
}

