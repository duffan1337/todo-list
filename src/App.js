import './App.less';
import { useEffect, useState } from 'react';
import { setAllTasksAC } from './Redux/tasksActions';
import { useDispatch, useSelector } from 'react-redux';
import { getDocs, collection, doc } from "firebase/firestore";
import { auth, db } from "./firebase-config";
import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom'
import TaskPage from './Components/taskPage/TaskPage';
import Login from './Components/login/login';
import { signOut } from "firebase/auth";


const App = ()=>{

	const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
	const postsCollectionRef = collection(db, "posts");
	const dispatch = useDispatch()

	const signUserOut = () => {
		signOut(auth).then(() => {
		  localStorage.clear();
		  setIsAuth(false);
		  window.location.pathname = "/login";
		});
	  };


	 useEffect(() => {
		const getPosts = async () => {
		  const data = await getDocs(postsCollectionRef);
		  console.log("docks",data.docs, doc.id)
		  dispatch(setAllTasksAC(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))));
		};
		getPosts();
	  }, []);


	const {todos}=useSelector((state)=>{
		return{
			todos:state.tasks.tasks,
		}
	})
	console.log("todos",todos)


	return (
		<Router>
			
		  <div>
			{!isAuth ? (
			  <Link to="/login"> Login </Link>
			) : (
			  <div className='logOut-button'>
				<button onClick={signUserOut}> Log Out</button>
			  </div>
			)}
		  </div>
		  <Routes> 
			<Route path="/" element={<TaskPage isAuth={isAuth}  todos={todos} />} />
			<Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
		  </Routes>
		</Router>
	  );
	}

//   return (
//     <div className="App">
// 		<Login></Login>
// 		<TaskPage todos={todos}></TaskPage>
//     </div>
//   );
// }

export default App;


