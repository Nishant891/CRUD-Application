import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import profile from "../assets/profile.svg";
import deleteBtn from "../assets/delete.svg";
import updateBtn from "../assets/update.svg";
import Axios from "axios";

function Home() {
  const [user, setUser] = useState();

  const [task, setTask] = useState("");

  const [taskList, setTaskList] = useState([]);

  const [triggerEffect, setTriggerEffect] = useState(false);

  const navigate = useNavigate();

  const handleDelete = (id) => {
    Axios.post(`${import.meta.env.VITE_BACKEND_URL}/delete`, {
      taskId: id,
    }).then((response) => {
      console.log(response);
    });
    setTriggerEffect(!triggerEffect);
  };

  const handleUpdate = (id) => {
    const updatedTask = prompt("Enter the updated task");
    Axios.post(`${import.meta.env.VITE_BACKEND_URL}/update`, {
      taskId: id,
      updatedTask: updatedTask,
    }).then((response) => {
      console.log(response);
    });
    setTriggerEffect(!triggerEffect);
  };

  const addTask = () => {
    Axios.post(`${import.meta.env.VITE_BACKEND_URL}/add`, {
      email: user.email,
      task: task,
    }).then((response) => {
      if (response) {
        setTask("");
      }
    });
    setTriggerEffect(!triggerEffect);
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      if (userData.expirationTime < new Date().getTime()) {
        navigate("/login");
      } else {
        setUser(userData);
      }
    } else {
      navigate("/signup");
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      const userData = JSON.parse(localStorage.getItem("user"));
      if(userData != null){
        await Axios.get(`${import.meta.env.VITE_BACKEND_URL}/data`, {
          params: { email: userData.email },
        }).then((response) => {
          console.log(response);
          const data = response.data;
          console.log(data);
          setTaskList(data);
        });
      }
    }
    fetchData();
  }, [triggerEffect]);

  return (
    <>
      <div className="h-screen width-screen">
        <div className="w-full h-full bg-transparent flex flex-col justify-evenly items-center">
          <div className="w-11/12 h-1/5">
            <div className="mt-4 ml-10 flex items-center justify-start">
              <img className="w-8 h-8" src={profile} alt="profile-icon"></img>
              <p className="indent-4">{user != null && user.username}</p>
            </div>
            <div className="w-full h-12 flex flex-row justify-evenly items-center">
              <input
                value={task}
                onChange={(e) => {
                  setTask(e.target.value);
                }}
                placeholder="Enter Your task here ... "
                className="pl-4 w-10/12 h-8 rounded-xl focus:outline-slate-500"
              ></input>
              <button
                onClick={addTask}
                className="bg-green-500 rounded-lg text-white h-8 w-16"
              >
                ADD +
              </button>
            </div>
          </div>
          <div className="w-11/12 h-4/5 m-0 rounded-xl outline outline-offset-2 outline-slate-500 divide-y divide-slate-700 overflow-y-scroll mb-4">
            {taskList!="" ? taskList.map((task) => (
              <div
                key={task.id}
                className="text-black h-12 w-full pl-4 pt-3 flex flex-row justify-between"
              >
                <p>{task.task}</p>
                <div>
                  <button
                    onClick={() => handleUpdate(task.id)}
                    className="w-6 h-6 mr-4"
                  >
                    <img
                      className="w-5 h-5"
                      src={updateBtn}
                      alt="update-icon"
                    ></img>
                  </button>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="bg-red-500 w-6 h-6 mr-4 rounded-md"
                  >
                    <img
                      className="w-5 h-5 pl-1"
                      src={deleteBtn}
                      alt="delete-icon"
                    ></img>
                  </button>
                </div>
              </div>
            )): ""}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
