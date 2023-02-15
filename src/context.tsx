import { ReactNode, createContext, useState } from 'react'

interface TasksType {
    numberOfCompleteTasks: number,
    setNumberOfCompleteTasks: React.Dispatch<React.SetStateAction<number>>,
    alteredCheckbox: boolean,
    setAlteredCheckbox: React.Dispatch<React.SetStateAction<boolean>>
}

export const TasksContext = createContext({} as TasksType)

interface TasksContextProviderProps {
    children: ReactNode;
}

export function TasksContextProvider({ children }: TasksContextProviderProps) {
    const [numberOfCompleteTasks, setNumberOfCompleteTasks] = useState(0)
    const [alteredCheckbox, setAlteredCheckbox] = useState(false)

    return (
        <TasksContext.Provider value={{
            numberOfCompleteTasks, 
            setNumberOfCompleteTasks,
            alteredCheckbox, 
            setAlteredCheckbox
        }}
        >
            {children}
        </TasksContext.Provider>
    )
}