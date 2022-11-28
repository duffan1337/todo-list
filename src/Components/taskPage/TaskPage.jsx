// import '../../App.less';
import TaskInput from '../taskInput/TaskInput';
import TaskItem from '../taskItem/TaskItem';

const TaskPage = (props)=>{
console.log("ddd",props)
  return (
    <div className="App">	

        <h1>Just do it.</h1>
		<TaskInput />

		{props.todos.map((todo) => {
			
			return (
				<TaskItem
					todo={todo}
					key={todo.id}
					
				/>
			);
		})}
        
    </div>
  );
}

export default TaskPage;
