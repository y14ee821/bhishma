import { useContext,createContext, useReducer } from "react";
import {stateReducer} from "../reducer"
const initialState = {
    connectedToBroker : false,
    channelStates : {},
    IE_Info : [],
    IE_Mapper: {}
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

    function updateIE_Mapper(data)
    {
        dispatch({
            type:"modifyIE_Mapper",
            payload:
            {
                IE_Mapper: data
            }
        })
    }
    const value = {
        connectedToBroker:state.connectedToBroker,
        
        checkBrokerConnection,
        modifyIE_Machines,
        updateIE_Mapper,
        IE_Info: state.IE_Info,
        IE_Mapper: state.IE_Mapper
        
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