import {useContext} from "react"
import {ClassesContext} from "../contexts/ClassesProvider"

export function useGlobalClasses(){
    return useContext(ClassesContext)
}