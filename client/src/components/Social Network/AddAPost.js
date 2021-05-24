import '../../css/Forms.css'
import axios from 'axios'
import {useHistory} from 'react-router-dom';
import React from 'react';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function AddAPost({target}) {
  const userId = window.sessionStorage.getItem('userID');
  const history = useHistory();
  const inputRef = React.useRef(null);


  
  return (
    <div style={{ fontFamily: "Open Sans" }}>
      <section id="hero" className="d-flex align-items-center">
        <div style={{ textAlign: 'center' }} className="container position-relative text-center text-lg-left" data-aos="zoom-in" data-aos-delay={100}>
          <div className="wrapper fadeInDown">
            <div id="formContent">
              <div className="fadeIn first">
                <br></br>
                <h1><small  style={{color: '#51361A', fontWeight:'bold'}}>Add A Post</small> </h1>
              </div>

              <form name='postForm' style= {{fontSize: '10px', textAlign:'center',border:'black'}}  onSubmit={(e)=>{
              addAPost(e,inputRef,userId,history)
            }}>
              <div className="addPost">
                <input  type="text" ref={inputRef} placeholder={"what's on your mind?"}  />            
                <br></br>
             
                <label className="radio-inline">
                <p>Status:</p>
                  </label>
                    <label className="radio-inline">
                    <input type="radio" id='Tip' name="status" /> <label style={{color:'green'}}htmlFor="south">Look at me</label><br/>
                  </label> 

                    <label className="radio-inline">
                    <input type="radio" id='Question' name="status"  /><label style={{color:'orange'}} htmlFor="west">Question</label><br />
                    </label>    
                    <label className="radio-inline">
                <input  type="radio" id='Help' name="status"  /> <label style={{color:'red'}} htmlFor="north">Help &nbsp;&nbsp;</label><br />
                  </label>          
                   </div>
                   <button style={{ width: '120px', background: '#84996f' }} className="button" type="submit"><span>Add</span></button> &nbsp;
                <button style={{ width: '120px', background: '#84996f' }} className="button" onClick={() => history.push('/newsfeed')}><span>Cancel</span></button>
              </form>     
            </div>
          </div>
        </div>
      </section>
    </div>
  );

}


function addAPost(e,inputRef,userId,history){

  e.preventDefault();
  const form = document.forms.postForm;
  const statusArray = form.elements.status;
console.log(statusArray)
  //getting content
  const content=inputRef.current.value;
  let selectedStatus;
  statusArray.forEach((status)=>status.checked? selectedStatus=status.id:null);
 
    const newPost= { 
    content:content,
    status:selectedStatus,
    userID:userId
  }
console.log(newPost)
    axios.post('http://localhost:8080/post/',newPost)
    window.location='/newsfeed'

}


function checkRequired(field) {
  if (document.getElementById(field).value.length == 0) {
    toast(camelize(field) + " is required");
    return false;
  }
  return true;
}

function checkState(field,fieldname) {
  if (field == "") {
    toast(fieldname +" is required");
    return false;
  }
  return true;
}
function camelize(str) {
  const field = str.replaceAll('_', ' ');
  return field.charAt(0).toUpperCase() + field.slice(1);
}