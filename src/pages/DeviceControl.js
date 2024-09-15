import mqtt from "mqtt"
import { IOcard } from "../components/card/IOcard"
import { MqttSub,MqttPub,MqttMessage } from "../mqttcomponents/"
import { ToastContainer, toast } from 'react-toastify';
import {useIEState} from "../context"
import {IE_Data} from "../services"
import { useState, useEffect } from "react"


export const DeviceControl = () => {
IE_Data()//IE data context
const { connectedToBroker, channelStates,checkBrokerConnection,modifyIE_Machines,IE_Mapper,IE_Info } = useIEState();
const IE_Names = Object.keys(IE_Info)//gets the machine names
  const options = {
    protocol: 'ws',
     keepalive: 600,
    clean: true,
    reconnectPeriod: 1000, // ms
    connectTimeout: 30 * 1000, // ms
    clientId: 'emqx_react_' + Math.random().toString(16).substring(2, 8)
    
  }
  const url = process.env.REACT_APP_MQTT_HOST
  const [client,setClient] = useState(mqtt.connect(url, options)) 
  useEffect(()=>{
      
    client.on('connect', function () 
    {
      console.log("client Connected",client.connected) 
      checkBrokerConnection(true)//sets connectedToBroker to true
      setClient(client)
      IE_Names.map(ie=>(MqttSub(client,`${ie}/status`)))
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
  if(IE_Names!=[])
  {
    IE_Names.map(ie=>(MqttSub(client,`${ie}/status`)))//subscribes to topic
    MqttMessage(client)//checks for incoming messages from IEs
  }
  
  return (
    <main>
      <div className="mb-4">
      <ToastContainer />
        {connectedToBroker == false ? (
          <span
            key="ConnectionStatusFailed"
            className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Server Connection Failed
          </span>
        ) : (
          <span
            key="ConnectionStatusConnected"
            className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Connected To Server!
          </span>
        )}
      </div>

      <div className="flex flex-wrap justify-center m-2">
        {
        /* iterates over IE_Names and sends Objects of IE_Info to component: "IOCard" 
        Example of IE_Info Objects:
          {
              "1": {
                  "id": 1,
                  "name": "1",
                  "currentState": "OFF",
                  "IE_Name": "venkateswara",
                  "radioValue": ""
              },
              "2": {
                  "id": 2,
                  "name": "2",
                  "currentState": "OFF",
                  "IE_Name": "venkateswara",
                  "radioValue": ""
              }
          }
        */
        
        }
        {connectedToBroker == true ? (
          IE_Names.map((ie) => (
            <>
            <p id="errorInControl">Change</p>
            <IOcard key={ie} item={{ [ie]: IE_Info[ie]["channels"] }} client={client} />
            </>
          ))
        ) : (
          <div>
            <p className="text-base text-center  text-gray-900 dark:text-white">
              Connection TimedOut, please refresh
            </p>
            <button
              onClick={() => window.location.reload()}
              className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Refresh
            </button>
          </div>
        )}
      </div>
    </main>
  );
}


