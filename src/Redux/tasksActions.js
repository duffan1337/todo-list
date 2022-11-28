import {deleteDoc, doc,updateDoc } from "firebase/firestore"
import { db } from "../firebase-config"

const ADD_NEW_TASKS="ADD_NEW_TASKS"
const CHANGE_TASK_TEXT="CHANGE_TASK_TEXT"
const DELETE_TASK="DELETE_TASK"
const COMPLETED_TASK="COMPLETED_TASK"
const SET_ALL_TASKS="SET_ALL_TASKS"

    	/**
	 * AC - set all task from server 
	 * @param {payload}  -array of tasks from server
	 */
export const setAllTasksAC = (payload)=>{    
    return {
         type:SET_ALL_TASKS,
         payload   
        }
}
	/**
	 * AC - added new task 
	 * @param {payload}  - new task
	 */
export const addNewTaskAC = (payload)=>{    
    return {
         type:ADD_NEW_TASKS,
         payload   
        }
}

	/**
	 * AC - change task 
	 * @param {payload}  - {id, downloadImageUrl,  date, taskName, taskDescription}}
	 */
export const changeTaskTextAC = (payload)=>{    
    debugger
    return {
         type:CHANGE_TASK_TEXT,
         payload  
        }
}
	/**
	 * AC - dele task 
	 * @param {payload}  - task id
	 */
export const deleteTaskTextAC = (payload)=>{    
    return {
         type:DELETE_TASK,
         payload  
        }
}
	/**
	 * AC complete task
	 * @param {payload}  - task id
	 */
export const completeTaskTextAC = (payload)=>{    
    return {
         type:COMPLETED_TASK,
         payload  
        }
}


    	/**
	 * thunk that updates the specified element 
	 * @param {task} task element
	 */
export const updateTask = (props) =>async(dispatch)=>{        
        const docRef = doc(db, "posts", props.id);
        
         await updateDoc(docRef,{
            "taskName":props.taskName,
            "taskDescription":props.taskDescription,
            "date":props.date,
            "downloadImageUrl":props.newFileUrl
            // date:"21",
            }).then(()=>{dispatch(changeTaskTextAC({id:props.id, downloadImageUrl:props.newFileUrl,  date:props.date, taskName:props.taskName, taskDescription:props.taskDescription}))})
            
    };
          
        	/**
	 * thunk that delete the specified element 
	 * @param {task} - task id
	 */
    export const deleteTask = (props) =>async(dispatch)=>{            
        await deleteDoc(doc(db, "posts", props));
        dispatch(deleteTaskTextAC(props))
    };
          
