import mqtt from "mqtt"
import { IOcard } from "../components/card/IOcard"
import { MqttSub,MqttPub,MqttMessage } from "../mqttcomponents/"
import { ToastContainer, toast } from 'react-toastify';
import {useIEState} from "../context"
import {IE_Data} from "../services"
import { useState, useEffect } from "react"

import { useNavigate,useParams } from "react-router-dom";

export const DeviceControl = ({ieName}) => {
IE_Data()//IE data context
const params = useParams()
const navigate = useNavigate()
const productId = params.id==undefined?"":params.id;
const { connectedToBroker, channelStates,checkBrokerConnection,modifyIE_Machines,IE_Mapper,IE_Info } = useIEState();
// const [currentIE, setCurrentIE] = useState(productId!=""?productId:"")
const currentIE = params.id


const IE_Names = Object.keys(IE_Info)//gets the machine names
  const options = {
    protocol: 'wss',
     keepalive: 600,
    clean: true,
    reconnectPeriod: 1000, // ms
    connectTimeout: 30 * 1000, // ms
    clientId: 'emqx_react_lohit_' + Math.random().toString(16).substring(2, 8)
    
  }
  //const url = process.env.REACT_APP_MQTT_HOST
  const url = "wss://broker.emqx.io:8084/mqtt"
  const [client,setClient] = useState(mqtt.connect(url, options)) 
  useEffect(()=>{
      
    client.on('connect', function () 
    {
      console.log("client Connected",client.connected) 
      checkBrokerConnection(true)//sets connectedToBroker to true
      setClient(client)
      //IE_Names.map(ie=>(MqttSub(client,`${ie}/status`)))
    })
    client.on('error', (err) => {
      checkBrokerConnection(false)//sets connectedToBroker to false
      console.error('Connection error: ', err);
      client.end();
    });
    client.on('reconnect', () => {
      checkBrokerConnection(false)//sets connectedToBroker to false
      console.log('Reconnecting');
    });
  
  },[client])

  const ieEnabler=(IE_Info,ie) =>
    {  
      const timeOut = 5000 //in ms
      const curTime = new Date()
      let updatedTime = curTime- new Date(IE_Info[ie.split("/")[0]]["lastUpdated"])

      if(updatedTime>=timeOut){
        IE_Info[ie.split("/")[0]]["running"] = false
        modifyIE_Machines(IE_Info);
        return false
      }
      else if(IE_Info[ie.split("/")[0]]["lastUpdated"]==="")
      {
        IE_Info[ie.split("/")[0]]["running"] = false
        modifyIE_Machines(IE_Info);
      }
      else 
      {
      return true
      }
  
    }

  if(IE_Names!=[] && connectedToBroker)
  {
    MqttMessage(client)//checks for incoming messages from IEs
  }
  if(Object.keys(IE_Info).length!=0)
    setInterval(ieEnabler,10000,IE_Info,currentIE)
  function bulkControl(ie_name,state="",channelCount=null)
  {
    // To turn on or turn off the channels in bulk
    
    let finalString = ""
    if(state!="")
    {
      channelCount.map(c=> finalString= finalString+"op"+c+":"+state+"-")
    }
    console.log(finalString.slice(0,finalString.length-1))
    MqttPub(
      client,
      `${ie_name}`,
      finalString.slice(0,finalString.length-1)
    );
  }
  return (
    <main>
      <div className="mb-4">
        <ToastContainer />
        {connectedToBroker == false ? (
          <div>
            <span
              key="ConnectionStatusFailed"
              className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Connecting to Server...Hang on!
            </span>

            <p className="text-base text-center font-bold p-10 text-gray-900 dark:text-white">
              It will take mostly 1 minute, if not connected
              <button
                onClick={() => window.location.reload()}
                className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Refresh
              </button>
            </p>
          </div>
        ) : (
          <span
            key="ConnectionStatusConnected"
            className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Connected To Server!
          </span>
        )}
      </div>

      {connectedToBroker == true && currentIE != "" && IE_Names != [] && (
        <div className="border-2">
         
          <IOcard
            key={currentIE}
            item={{ [currentIE]: IE_Info[currentIE]["channels"] }}
            client={client}
          />
 <div className="p-4">
            <button
              onClick={() =>
                bulkControl(
                  currentIE,
                  "1",
                  Object.keys(IE_Info[currentIE]["channels"])
                )
              }
              className="text-white bg-gradient-to-r from-green-500 via-slate-500 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              ALL ON
            </button>
            <button
              onClick={() =>
                bulkControl(
                  currentIE,
                  "0",
                  Object.keys(IE_Info[currentIE]["channels"])
                )
              }
              className="text-white bg-gradient-to-r from-red-500 via-slate-500 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              ALL OFF
            </button>
          </div>

        </div>
      )}
    </main>
  );
} 

//ieEnabler(IE_Info,currentIE)
