import { useEffect, useRef } from "react";
import { useIEState } from "../context";

export const IE_Data = () => {
  const { modifyIE_Machines,updateIE_Mapper } = useIEState();
  const data = useRef(
    {
      "rao": {
        "channels":{
        1: {
          id: 1,
          name: "1",
          currentState: "OFF",
          IE_Name: "rao",
          radioValue: "",
          channelUpdatedTime:""
        },
        2: {
          id: 2,
          name: "2",
          currentState: "OFF",
          IE_Name: "rao",
          radioValue: "",
          channelUpdatedTime:""
        },
        3: {
          id: 3,
          name: "3",
          currentState: "OFF",
          IE_Name: "rao",
          radioValue: "",
          channelUpdatedTime:""
        },
        4: {
          id: 4,
          name: "4",
          currentState: "OFF",
          IE_Name: "rao",
          radioValue: "",
          channelUpdatedTime:""
        },
      },
      "lastUpdated":"",

      "faulty":""
      },
      "venkateswara": {
        "channels":{
        1: {
          id: 1,
          name: "1",
          currentState: "OFF",
          IE_Name: "venkateswara",
          radioValue: "",
          channelUpdatedTime:""
        },
        2: {
          id: 2,
          name: "2",
          currentState: "OFF",
          IE_Name: "venkateswara",
          radioValue: "",
          channelUpdatedTime:""
        },
      },
      "lastUpdated":"",
      "faulty":""
      },
    }
  );

  let map = {}
  for(let i in data.current)
    {
    
    
    map[Object.keys(data.current[i])[0]]=parseInt(i)
    }
    

  useEffect(() => {
    modifyIE_Machines(data.current)
    updateIE_Mapper(map)
  }, [data.current]);
};
