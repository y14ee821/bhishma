import { useContext,createContext, useReducer } from "react";
import {stateReducer} from "../reducer"
const initialState = {
    connectedToBroker : false,
    channelStates : {},
    IE_Info : []
}

const IE_StateContext = createContext(initialState)

export const IE_stateProvider = ({children})=>{
    const [state, dispatch] = useReducer(stateReducer,initialState)

    function checkBrokerConnection(curState)
    {
        
        dispatch(
            {
                type: "checkBrokerConnection",
                payload: 
                {
                    connectedToBroker: curState
                }
            }
        )
    }
    
    function modifyIE_Machines(data)
    {
        //console.log("HEllooooo")
        dispatch(
            {
                type: "modifyIE_Machines",
                payload: 
                {
                    IE_Info: data
                }
            }
        )
    }
    const value = {
        connectedToBroker:state.connectedToBroker,
        
        checkBrokerConnection,
        modifyIE_Machines,
        IE_Info: state.IE_Info
        
    }

    return(
    <IE_StateContext.Provider value={value} > 
        {children}
    </IE_StateContext.Provider>
    )
}

export const useIEState=()=>{
    const context = useContext(IE_StateContext)
    return context  
}