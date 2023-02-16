import "./TaskList.css"
import { Trash } from "phosphor-react"
import { useContext, useEffect, useState } from "react"
import { TasksContext } from "../context"
import { doc, updateDoc } from "@firebase/firestore"
import { firestore } from "../firebase/firebase"

interface TasksProps {
    idTasks: string,
    contentTasks: string,
    completeTasks: boolean,
    onDeleteTask: (task: string) => void
}

export function TaskList ({ idTasks, contentTasks, onDeleteTask, completeTasks}:TasksProps) {
    const { 
        setNumberOfCompleteTasks, 
        numberOfCompleteTasks, 
        setAlteredCheckbox, 
        alteredCheckbox 
    } = useContext(TasksContext)
    const [stateOfCheckbox, setStateOfCheckbox] = useState(Boolean)
    const [stateDecorationOfCheckbox, setStateDecorationOfCheckbox] = useState('noLine')

    function handleCheckbox (id: string) {
        if(stateOfCheckbox == false) {
            const changedData = {
                complete: true
            }
            const docRef = doc(firestore, "todos", id)
            updateDoc(docRef, changedData)

            setStateDecorationOfCheckbox('line')
            setNumberOfCompleteTasks(numberOfCompleteTasks + 1)
        }else {
            const changedData = {
                complete: false
            }
            const docRef = doc(firestore, "todos", id)
            updateDoc(docRef, changedData)

            setStateDecorationOfCheckbox('noLine')
            setNumberOfCompleteTasks(numberOfCompleteTasks - 1)
        }

        setStateOfCheckbox(!stateOfCheckbox)
    }

    useEffect(() => {
        setAlteredCheckbox(!alteredCheckbox)
        if(completeTasks === true) setStateDecorationOfCheckbox('line')
    }, [stateOfCheckbox, numberOfCompleteTasks])

    async function handleDeleteTask() {
        if(numberOfCompleteTasks !== 0) setNumberOfCompleteTasks(numberOfCompleteTasks - 1)
        onDeleteTask(idTasks)
    }

    return (
        <section className="taskList">
                <div className="contentTasks">
                    <label className="cont">
                        <input 
                            type="checkbox" 
                            id="checkbox"
                            value={idTasks}
                            checked={completeTasks}
                            onChange={() => handleCheckbox(idTasks)}
                        />  
                        <p className={stateDecorationOfCheckbox}>{contentTasks}</p>
                    </label>
                    <button onClick={handleDeleteTask}>
                        <Trash size={24} />
                    </button>
                </div>
        </section>
    )
}