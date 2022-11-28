import './taskInput.less';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewTaskAC } from '../../Redux/tasksActions';
import { addDoc, collection } from "firebase/firestore";
import { db, auth, app } from "../../firebase-config";
import 'firebase/storage';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import dayjs from "dayjs";

const TaskInput =()=> {
  
  const dispatch = useDispatch()
  const [taskNameInput, setTaskNameInput] = useState("");
  const [taskDescriptionInput, setDescriptionInput] = useState("");
  const [dateInput, setDateInput] = useState("");


  const postsCollectionRef = collection(db, "posts");

  const [uploadImageFile, setUploadImageFile] = useState(null)



  const createPost = (downloadFileImage="")=>async (dispatch) => {
    
    let newDate = dateInput ? dateInput : ""
    await addDoc(postsCollectionRef, {
      taskName:taskNameInput,
      taskDescription:taskDescriptionInput,
      date:newDate,
      isCompleted:false,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
      downloadImageUrl:downloadFileImage
    }).then(docRef => {dispatch(addNewTaskAC({id:docRef.id, downloadImageUrl:downloadFileImage, name:auth.currentUser.displayName, userId:auth.currentUser.uid, taskName:taskNameInput,taskDescription:taskDescriptionInput, date:dateInput }))})};
  
  const titleHandleChange = (e)=>{
    setTaskNameInput(e.currentTarget.value)
  }

  const descriptionHandleChange = (e)=>{
    setDescriptionInput(e.currentTarget.value)
  }
  

 
    const uploadImage = async() =>{
      if(uploadImageFile === null)
      {
        return
      }
      const storage = getStorage(app)
      const imageRef =ref(storage, `${uploadImageFile.name}`)
      
      await uploadBytesResumable(imageRef, uploadImageFile )
      let x =  await getDownloadURL(imageRef)
      return x
    }


  const handleSubmit = (e)=>{
      e.preventDefault()
      uploadImage().then((x)=>dispatch(createPost(x)))     
      setTaskNameInput("");
      setDescriptionInput("")
  }

  const onKeyDown = (e)=>{
      if (e.key === "Enter") {
          handleSubmit(e)
      }
  }
  const onFileChange = async(e)=>{

    const file = e.target.files[0]
    setUploadImageFile(file)

  }

  const onDataChange = (e)=>{
    setDateInput(e.currentTarget.value)
  }

  return (
       <div className="task-input">
            <div className='textarea'>
            
               <input
                className="title-input"
                type="text"
                value={taskNameInput}
                onChange={titleHandleChange}
                onKeyDown={onKeyDown}
                placeholder="Task name"
            />
             <input className='file-input' type="file" onChange = {onFileChange}/>
             <input className='date-input' type="date" /*min={dayjs().format("YYYY-MM-DD")}*/   onChange = {(e)=>onDataChange(e)}/>

            <textarea className="description-textarea" placeholder='Task Description' onChange={descriptionHandleChange} ></textarea>
            <button className='submitInput-button' onClick={handleSubmit}>Add</button>
            </div>
          
       </div>
  );
}

export default TaskInput;
