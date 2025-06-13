import { useEffect, useState } from "react"
import { databases } from "../appwrite/appwrite";
import { ID, Query } from "appwrite";
import Alert from "../components/Alert";
import TodoSkeleton from "../components/TodoSkeleton"
import Todos from "../components/Todos"

const Todo = () => {

  const databaseID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
  const collectionID = import.meta.env.VITE_APPWRITE_TODO_COLLECTION;
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState([]);
  const [todosLength, setTodosLength] = useState(null);
  //pagination variables
  const [page, setPage] = useState(1);
  const todosPerPage = 4;

  // getting all tasks and updating the todos state variable
  const getAllTodos = async (page) => {
    setLoading(true);

    const offset = (page - 1) * todosPerPage; // offset

    try {
      //fetching todos from appwrite database
      const data = await databases.listDocuments(
        databaseID,
        collectionID,
        [
          Query.limit(todosPerPage),
          Query.offset(offset),
          Query.orderDesc("$createdAt") // fetching newest todo first
        ]
      )

      // updating todos and todosLength state variable
      setTodos(data.documents);
      setTodosLength(data.total); // collecting todos length
    } catch (error) {
      console.error("Fetching error " + error.message);
    } finally {
      setLoading(false);
    }
  }

  // adding new task and fetching all tasks again
  const addTodo = async (formData) => {
    const todo_title = formData.get('todo_title');

    try {
      await databases.createDocument(
        databaseID,
        collectionID,
        ID.unique(), // genarating unique id for the doccument
        {
          title: todo_title,
          status: 'incomplete'
        }

      )
    } catch (error) {
      console.error("Submission error " + error.message);
    }

    //fetching the tasks again after adding new task
    getAllTodos(page);
  }

  // updating current task status
  const updateTodoStatus = async (documentID, status) => {
    try {
      await databases.updateDocument(
        databaseID,
        collectionID,
        documentID,
        {
          status: status
        }

      )
    } catch (error) {
      console.error("Database error " + error.message);
    }

    // Fetching tasks again after updating the task status
    getAllTodos(page);
  }

  // removing current tasks by document id and getting all tasks again
  const removeTodo = async (documentID) => {
    try {
      await databases.deleteDocument(
        databaseID,
        collectionID,
        documentID,
      )
    } catch (error) {
      console.error("Database error " + error.message);
    }

    // fetching all tasks  again after deleting current task
    getAllTodos(page);
  }

  //pagination logic
  const selectPageHandler = (selectedPage) => {
    if (selectedPage >= 1 &&
      selectedPage <= Math.ceil(todosLength / todosPerPage) &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  }

  useEffect(() => {
    //fetching tasks on every render and page changes
    getAllTodos(page);
  }, [page]) // page is the dependency here

  return (
    <div className="h-auto py-12 w-full flex justify-center items-center">
      <div className="h-full w-[90%] flex flex-col justify-center
       items-center gap-16 lg:max-2xl:gap-12">
        <div className="h-auto w-full text-center">
          <h2 className="text-2xl lg:text-xl font-medium
           font-description text-zinc-200">
            Todo
          </h2>
        </div>
        <div className="h-auto w-full md:w-[80%] lg:max-2xl:w-[60%]
         flex flex-col gap-2">
          <div className="h-auto w-full text-left">
            <h2 className="text-base font-medium font-description
            text-zinc-200">
              Add Tasks
            </h2>
          </div>
          <div className="h-auto w-full">
            <form action={addTodo} className="h-auto w-full flex flex-col
             md:max-2xl:flex-row justify-center md:max-2xl:justify-between
             items-center gap-4 md:max-2xl:gap-0">
              <div className="h-auto w-full md:max-2xl:w-[85%]">
                <input type="text" placeholder="Type here" required
                className="input w-full text-zinc-200 bg-zinc-900
                font-medium font-description" name="todo_title" />
              </div>
              <div className="h-auto w-full md:max-2xl:w-[10%]">
                <button type="submit" className="px-4 py-2 bg-white
                text-base font-medium font-description rounded
                text-zinc-950 cursor-pointer w-full md:max-2xl:w-auto" >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="h-auto w-full text-center">
          <h2 className="text-base font-medium font-description
            text-zinc-200">
            Tasks History
          </h2>
        </div>
        <div className={`${todosLength < 1 ? 'block' : 'hidden'}
         h-[260px] w-full`}>
            {
              !loading ? (<Alert height={'h-[260px]'}
                type='todos' />) : (<TodoSkeleton />)
            }
        </div>
        <div className={`${todosLength < 1 ? 'hidden' : 'block'}
         h-auto w-full flex justify-center items-center`}>
          <div className="h-[260px] w-full md:w-[80%] lg:w-[60%]
           flex flex-col justify-start items-center gap-5">
          {
            loading ? (<TodoSkeleton />
            ) : (todos.map((v, i) => {
              return <Todos
               key={i}
               data={v}
               action={{
                updateTodoStatus,
                removeTodo
              }} />
            }))
          }
          </div>
        </div>

        {/* pagination buttons */}
        <div
         className={`${todosLength > todosPerPage ? 'block' : 'hidden'}
         w-full flex justify-center items-center`}>
          <div className="join">
            <button className="join-item btn bg-zinc-950 text-xl
            text-white"
             disabled={page === 1}
             onClick={() => {selectPageHandler(page - 1)}}>
              «
            </button>
            <button className="join-item btn text-base bg-zinc-950
            text-white font-description font-medium cursor-default">
              {page}
            </button>
            <button className="join-item btn text-xl text-white
            bg-zinc-950"
            disabled={page === Math.ceil(todosLength / todosPerPage)}
             onClick={() => {selectPageHandler(page + 1)}}>
              »
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Todo