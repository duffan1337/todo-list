import {deleteDoc, doc,updateDoc } from "firebase/firestore"
import { db } from "../firebase-config"

const ADD_NEW_TASKS="ADD_NEW_TASKS"
const CHANGE_TASK_TEXT="CHANGE_TASK_TEXT"
const DELETE_TASK="DELETE_TASK"
const COMPLETED_TASK="COMPLETED_TASK"
const SET_ALL_TASKS="SET_ALL_TASKS"

export const setAllTasksAC = (payload)=>{    
    return {
         type:SET_ALL_TASKS,
         payload   
        }
}

export const addNewTaskAC = (payload)=>{    
    console.log("sadadaaaaa",payload)
    return {
         type:ADD_NEW_TASKS,
         payload   
        }
}
export const changeTaskTextAC = (payload)=>{    
    debugger
    return {
         type:CHANGE_TASK_TEXT,
         payload  
        }
}
export const deleteTaskTextAC = (payload)=>{    
    return {
         type:DELETE_TASK,
         payload  
        }
}
export const completeTaskTextAC = (payload)=>{    
    return {
         type:COMPLETED_TASK,
         payload  
        }
}



export const updateTask = (props) =>async(dispatch)=>{        
        const docRef = doc(db, "posts", props.id);
            console.log("DAFAFAFAFSFSDS",props)
         await updateDoc(docRef,{
            "taskName":props.taskName,
            "taskDescription":props.taskDescription,
            "date":props.date,
            "downloadImageUrl":props.newFileUrl
            // date:"21",
            }).then(()=>{dispatch(changeTaskTextAC({id:props.id, downloadImageUrl:props.newFileUrl,  date:props.date, taskName:props.taskName, taskDescription:props.taskDescription}))})
            
    };
          
    export const deleteTask = (props) =>async(dispatch)=>{            
        await deleteDoc(doc(db, "posts", props));
        dispatch(deleteTaskTextAC(props))
    };
          
