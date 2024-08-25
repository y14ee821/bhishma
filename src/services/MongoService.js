import { useEffect,useRef } from "react";
import {useIEState} from "../context"

export const IE_Data = ()=>
    {
      const {modifyIE_Machines } = useIEState();
        const data = useRef([{"rao":[{
            "id":1,
            "name": "1",
            "currentState": "OFF",
            "IE_Name": "rao"
            },
            {
              "id":2,
              "name": "2",
              "currentState": "OFF",
              "IE_Name": "rao"
            },
            {
              "id":3,
              "name": "3",
              "currentState": "OFF",
              "IE_Name": "rao"
            },
            {
              "id":4,
              "name": "4",
              "currentState": "OFF",
              "IE_Name": "rao"
            },
          ]},

            {"venkateswara":[{
              "id":1,
              "name": "1",
              "currentState": "OFF",
              "IE_Name": "venkateswara"
              },
              {
                "id":2,
                "name": "2",
                "currentState": "OFF",
                "IE_Name": "venkateswara"
                }]}              

          ])
          useEffect(()=>
            {modifyIE_Machines(data.current)}
          
          ,[data.current]
          
        )
          
          
          
        
    }
