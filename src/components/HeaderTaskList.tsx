import { useContext } from "react"
import { TasksContext } from "../context"
import styles from "./HeaderTaskList.module.css"

interface NumberOfTasks {
    quantTasks: number
}

export function HeaderTaskList ({quantTasks}:NumberOfTasks) {
    const { numberOfCompleteTasks } = useContext(TasksContext)
    
    return (
        <div className={styles.headerTaskList}>
            <header>
                <div className={styles.contentParagraphCriadas}>
                    <p>Tarefas criadas</p>
                    <span>{quantTasks}</span>
                </div>
                
                <div className={styles.contentParagraphConcluidas}>
                    <p>Concluídas</p>
                    <span>{numberOfCompleteTasks} de {quantTasks}</span>
                </div>
            </header>
        </div>
    )
}