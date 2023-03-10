import styles from "./Task.module.css"
import { PlusCircle } from "phosphor-react"
import { ChangeEvent, FormEvent, useState, useEffect, useContext } from "react"
import { HeaderTaskList } from "./HeaderTaskList"
import { TaskListEmpty } from "./TaskListEmpty"
import { TaskList } from "./TaskList"
import { addDoc, collection, onSnapshot, doc, deleteDoc } from "@firebase/firestore"
import { firestore } from "../firebase/firebase"
import { TasksContext } from "../context"

interface Tasks {
    id: string,
    content: string,
    complete: boolean
}

export function Task () {
    const [tasks, setTasks] = useState<Tasks[]>([])
    const [newTask, setNewTask] = useState("")
    const { alteredCheckbox, setNumberOfCompleteTasks, numberOfCompleteTasks } = useContext(TasksContext)

    const [stateDeleteTask, setNewStateDeleteTask] = useState(Boolean)

    const isNewTaskEmpty = newTask.length === 0;
    const numberOfTasks = tasks.length;

    const checkNumberOfTasks = () => {
        let numberOfCompleteTasks = 0
        tasks.map((task) => {
            if(task.complete === true) numberOfCompleteTasks = numberOfCompleteTasks + 1
        })
        setNumberOfCompleteTasks(numberOfCompleteTasks)
    }

    const allTasks = collection(firestore, "todos")

    async function loadTasks() {
        let loadedTasksFromDB: Tasks[] = []
        onSnapshot(allTasks, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                loadedTasksFromDB.push(
                    {
                        id: doc.id, 
                        content: doc.data().task, 
                        complete: doc.data().complete
                    }
                ) 
            })
            setTasks(loadedTasksFromDB)
        })

        checkNumberOfTasks()
    }

    useEffect (() => {
        loadTasks()
    }, [newTask, stateDeleteTask, alteredCheckbox])

    async function postTask(content: string){
        let data = {
            task: content,
            complete: false
        }
        try {
            addDoc(allTasks, data)
        } catch (e){
            console.log(e)
        }
    }

    function handleCreateNewTask(event: FormEvent){
        event.preventDefault();

        postTask(newTask);
        setNewTask("");
    }

    function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>){
        event.target.setCustomValidity("")
        setNewTask(event.target.value)
    }

    async function onDeleteTask(task: string) {
        onSnapshot(allTasks, (querySnapshot) => {
            querySnapshot.forEach((document) => {
                if(document.id === task) {
                    deleteDoc(doc(firestore, "todos", task))
                    setNewStateDeleteTask(!stateDeleteTask)
                    if(numberOfCompleteTasks !== 0) setNumberOfCompleteTasks(numberOfCompleteTasks - 1)
                }
            })
        })
    }  

    return (
        <main>
            <form onSubmit={handleCreateNewTask} className={styles.task}>
                <input 
                    type="text"
                    placeholder="Adicione uma nova tarefa" 
                    value={newTask}
                    onChange={handleNewTaskChange}
                    required
                />

                <footer>
                    <button type="submit" disabled={isNewTaskEmpty}>
                        Criar
                        <span></span>
                        <PlusCircle size={20}/>
                    </button>
                </footer>
            </form>

            <HeaderTaskList 
                quantTasks={numberOfTasks}
            />

            {
                numberOfTasks == 0 ? <TaskListEmpty />
                    : tasks.map((task) => (
                        <TaskList key={task.id}
                            idTasks={task.id}
                            contentTasks={task.content}
                            completeTasks={task.complete}
                            onDeleteTask={onDeleteTask}
                        />
                    ))
            }
        </main>
    )
}