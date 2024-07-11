/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import { json } from "react-router-dom";

function App() {
  const [todos, setTodos] = useState([]);
  const [todoName, setTodoName] = useState("");
  const [filterStatus, setfilterStatus] = useState("all");

  const handleAddTodo = () => {
    let newTodo = {
      id: uuidv4(),
      name: todoName,
      status: "active",
    };

    let updatedTodo = [...todos];
    updatedTodo.push(newTodo);
    setTodos(updatedTodo);
    setTodoName("");
    localStorage.setItem("todolist", JSON.stringify(updatedTodo));
  };

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem("todolist"));
    if (savedTodo) {
      setTodos(savedTodo);
    }
  }, []);

  const handleChangeStatus = (item, idx) => {
    const newTodoList = [...todos];
    console.log(newTodoList[idx]);
    newTodoList[idx] = {
      ...newTodoList[idx],
      status: newTodoList[idx].status === "active" ? "completed" : "active",
    };
    setTodos(newTodoList);
  };

  const handleDeleteTodo = (id) => {
    let deletedTodoList = [...todos].filter((todo) => todo.id !== id);
    setTodos(deletedTodoList);
    localStorage.setItem("todolist", JSON.stringify(deletedTodoList));
  };

  const handleDelAll = () => {
    setTodos([]);
  }

  const handleShowAll = () => {
    setfilterStatus("all");
  };

  const handleShowActive = () => {
    setfilterStatus("active");
  };

  const handleShowCompleted = () => {
    setfilterStatus("completed");
  };

  const filterTodoList = todos.filter(
    (todo) => filterStatus === "all" || filterStatus === todo.status
  );

  return (
    <>
      <div className="container">
        <div className="heading">#todo</div>
        <div className="navbarContainer">
          <div className="navbarList">
            <div className="navbarItem" onClick={handleShowAll}>
              All
            </div>
            <div className="navbarItem" onClick={handleShowActive}>
              Active
            </div>
            <div className="navbarItem" onClick={handleShowCompleted}>
              Completed
            </div>
          </div>
        </div>

        <div className="inputSession">
          <div className="inputBar">
            <input
              type="text"
              value={todoName}
              placeholder="add details"
              onChange={(e) => {
                setTodoName(e.target.value);
              }}
            />
          </div>
          <button className="addBtn" onClick={handleAddTodo}>
            Add
          </button>
        </div>

        <div className="todoList">
          {filterTodoList.map((item, idx) => {
            return (
              <div
                key={item.id}
                className="todoItem"
                // onClick={() => handleChangeStatus(item, idx)}
              >
                <div
                  className={`todoName ${
                    item.status === "completed" ? "completed" : ""
                  }`}
                  onClick={() => handleChangeStatus(item, idx)}
                >
                  <input
                    id={item.id}
                    type="checkbox"
                    checked={item.status === "completed" ? "true" : ""}
                    onClick={() => {}}
                  />
                  <label htmlFor={item.id}>{item.name}</label>
                </div>
                <div className="todoBtn">
                  <button onClick={() => handleDeleteTodo(item.id)}>
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="delAll">
          <button className="btnDelAll" onClick={handleDelAll}>Delete All</button>
        </div>
      </div>
    </>
  );
}

export default App;
