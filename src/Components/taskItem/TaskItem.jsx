import React, { useState } from "react";
import { useDispatch } from "react-redux";
import './taskItem.less';
import { changeTaskTextAC, completeTaskTextAC, deleteTask,} from "../../Redux/tasksActions";
import dayjs from "dayjs";
import { doc, updateDoc } from "firebase/firestore";
import { db,  app } from "../../firebase-config";
import 'firebase/storage';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';

function TaskItem({todo, handleToggle}) {

    const dispatch  = useDispatch()
    const [titleInput, setTitleInput] = useState(todo.taskName);       // введенное значение в режиме редактирования
    const [descriptionInput, setDescriptionInput] = useState(todo.taskDescription);       // введенное значение в режиме редактирования
    const [dateInput, setdateInput] = useState(todo.date);       // введенное значение в режиме редактирования
    console.log("titleInput", titleInput)
    const [uploadImageFile, setUploadImageFile] = useState(null)

    const [isChanged, setIsChanged] = useState(false)       //режим редактирования
    
        function titleHandleChange(e) {
            setTitleInput(e.currentTarget.value)
        }
        function descriptionHandleChange(e) {
            setDescriptionInput(e.currentTarget.value)
        }
    
        function dateHandleChange(e) {
            setdateInput(e.currentTarget.value)
        }
        
        const updateTask = (props) =>async(dispatch)=>{ 
            let NFU = props.newFileUrl ? props.newFileUrl : ""       
            const docRef = doc(db, "posts", props.id);
                console.log("DAFAFAFAFSFSDS",props)
             await updateDoc(docRef,{
                "taskName":props.taskName,
                "taskDescription":props.taskDescription,
                "date":props.date,
                "downloadImageUrl":NFU
                }).then(()=>{dispatch(changeTaskTextAC({id:props.id, downloadImageUrl:props.newFileUrl,  date:props.date, taskName:props.taskName, taskDescription:props.taskDescription}))})
                
        };
    
        function handleSubmit(e) {
            e.preventDefault()
            uploadImage().then((e)=>dispatch(updateTask({id:todo.id, newFileUrl:e, date:dateInput, taskName:titleInput, taskDescription:descriptionInput })))
            setIsChanged(false)
        }
        const onFileChange = async(e)=>{

            const file = e.target.files[0]
            setUploadImageFile(file)
        
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

        return (
        <div>
            <div key={todo.id} className={todo.date &&todo.date!=="" && todo.date<dayjs().format("YYYY-MM-DD", "hh:mm") ? (todo.completed ?"todo__item green ":"todo__item red" ) : (todo.completed ?"todo__item green ":"todo__item " )}>
            <div className="completed"> <input className="completed-input" onClick={()=>dispatch(completeTaskTextAC(todo.id))} type="checkbox"></input></div>
                <div className={todo.completed  ? "todo__item__text strike" : "todo__item__text"} >
                   
                    <div className="todo__item__text__header"> {isChanged ?  
                    <div className="changed-block">
                        <input
                          className="titleChange-input"
                          type="text"
                          value={titleInput}         
                          onChange={titleHandleChange}
                        />
                        <textarea placeholder='Task Description'  onChange={descriptionHandleChange}  value={descriptionInput}  className='descriptionChange-textarea'></textarea>
                        <input type="date" min={dayjs().format("YYYY-MM-DD")} className="dateChange-input" onChange={dateHandleChange} value={dateInput}></input>
                        <input type="file"  className='file-input'  onChange={onFileChange}></input>
                    </div> 
                        :
                        <div className="notChanged-block">
                            <div className="item-name item-field"><h1>{todo.taskName}</h1></div>
                            <div className="item-description item-field">{todo.taskDescription}</div>
                            <div className="item-date item-field" type="datetime-local"  value={todo.date}/>{todo.date ?dayjs(todo.date).format("YYYY-MM-DD HH:MM"):""}
                            {todo.downloadImageUrl!=="" ?
                            <div className="item-file item-field"><a target="_blank" href={todo.downloadImageUrl}>file</a></div> : ""}
                        </div>}
                    </div>
                </div>

                <div className="todo__item__buttons">
                    {
                        !isChanged ?
                         <div><button className="todo__item__text__parag" onClick={()=>setIsChanged(true)}>Change</button> 
                        <button className='bx bx-trash' onClick={() => dispatch(deleteTask(todo.id))}>Delete</button></div>
                        :
                        <div><button onClick={handleSubmit}>Ok</button>
                        <button onClick={()=>setIsChanged(false)}>Cancel</button></div>

                    }
                </div>
                
            </div>
            </div>
            


        
        );
}
   
  export default TaskItem