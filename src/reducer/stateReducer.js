export const stateReducer = (state, action) => {

    const {type, payload } = action
    switch(type)
    {
        case "checkBrokerConnection":
            return {...state,connectedToBroker:payload.connectedToBroker}
        case "modifyIE_Machines":
          return {...state, IE_Info: payload.IE_Info}
        case "modifyIE_Mapper":
          return {...state, IE_Mapper: payload.IE_Mapper}
    }
  // return (
  //   <div>
      
  //   </div>
  // )
}

