import styles from './App.module.css'
import { Header } from './components/Header'
import { Task } from './components/Task'
import { TasksContextProvider } from './context'

export function App() {
  return (
    <TasksContextProvider>
      <div>
        <Header />
        <div className={styles.wrapper}>
          <Task />
        </div>
      </div>
    </TasksContextProvider>
  )
}
