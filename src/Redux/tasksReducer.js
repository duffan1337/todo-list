const ADD_NEW_TASKS="ADD_NEW_TASKS"
const CHANGE_TASK_TEXT="CHANGE_TASK_TEXT"
const DELETE_TASK="DELETE_TASK"
const COMPLETED_TASK="COMPLETED_TASK"
const SET_ALL_TASKS="SET_ALL_TASKS"

const initialState={
    tasks:[],
    count:0, 
}

const tasksReducer=(state=initialState, action)=>{
    if(action.type===SET_ALL_TASKS)             //устанавливаю полученный с сервера список
    {
        return {...state,
             tasks:action.payload,
             count: action.payload.length
            }
            
    }
    else if(action.type===ADD_NEW_TASKS)       //добавление элемента списка
    {
        debugger
        console.log("AAAAAAAAA", action.payload, )
        
        return {...state,
             tasks:[...state.tasks, { id: action.payload.id, downloadImageUrl:action.payload.downloadImageUrl, author: { name: action.payload.name, id: action.payload.userId}, taskName:action.payload.taskName, taskDescription:action.payload.taskDescription, date:action.payload.date, isCompleted:false}],
             count: state.count+1
            }
    }
    else if(action.type===CHANGE_TASK_TEXT)     //изменение элемента списка
    {
        debugger
        console.log(action.payload.id)
        debugger
        return {...state,
            tasks: state.tasks.map(item=>{
                if(item.id===action.payload.id){
                    
                    return{
                        ...item,
                        taskName: action.payload.taskName,
                        taskDescription: action.payload.taskDescription,
                        date: action.payload.date,
                        downloadImageUrl:action.payload.downloadImageUrl
                    }
                }
                return item;
            })
    
    }}

    else if(action.type===DELETE_TASK)      //удаление э.с
    { 
        debugger
        return { ...state, tasks: state.tasks.filter((item) => item.id !== action.payload), count: state.count-1}
    }

    else if(action.type===COMPLETED_TASK)   //выполнение э.с
    {
        return {...state,
            tasks: state.tasks.map(item=>{
                if(item.id===action.payload){
                    return{
                        ...item,
                        completed: !item.completed,
                    }
                }
                return item;
            })
    
    }}

    return state
}

export default tasksReducer
