import React, {useContext } from "react";
import { DIContext } from "../contexts/DIcontainerProvider";
import { IDIContainer } from "../services/main";

export function useInjection(): IDIContainer | {} {
    return useContext(DIContext)
}