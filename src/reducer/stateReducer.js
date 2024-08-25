export const stateReducer = (state, action) => {

    const {type, payload } = action
    switch(type)
    {
        case "checkBrokerConnection":
            return {...state,connectedToBroker:payload.connectedToBroker}
        case "modifyIE_Machines":
          return {...state, IE_Info: payload.IE_Info}
          
    }
  // return (
  //   <div>
      
  //   </div>
  // )
}

