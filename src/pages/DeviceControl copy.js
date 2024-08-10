import mqtt from "mqtt"

import { MqttSub,MqttPub,MqttMessage } from "../mqtt_components/"
import { useState, useEffect } from "react"


export const DeviceControl = () => {
  const options = {
    connectTimeout: 4000,
    keepalive: 60,
    //connectTimeout: 1000,
    //reconnectPeriod: 0,

    clientId: 'lohit_mqtt',
    
  }
  const url = process.env.REACT_APP_MQTT_HOST


  const [clientStatus,setClientStatus] = useState(null) 
  const client  = mqtt.connect(url, options)
  //setClientStatus(client)

  client.on('connect', function () 
  {
    console.log("client Connected",client.connected)
    //setClientStatus(client)

  
  MqttSub(client,"rao")
  MqttSub(client,"rao2")
  MqttMessage(client)
  MqttPub(client,"rao","Message from rao...")
  })
  client.on('error', (err) => {
    console.error('Connection error: ', err);
    client.end();
  });
  client.on('reconnect', () => {
    console.log('Reconnecting');
  });
  // console.log(client.connected)
  // useEffect(()=>{
    
  //   client.on('connect', function () 
  //   {
  //     console.log(client.connected)
  //     setClientStatus(client)


  //   }
  //   )
  //   if(client.connected)
  //   {
  //     console.log('Connectedddddd')

  //  // MqttSub(clientStatus,"rao")
  //   //MqttMessage(clientStatus)
  //   //MqttPub(clientStatus,"rao","Message from rao...")
  //   }
  // },[clientStatus])

  return (
    <main>
      Loadsss  Control
    </main>
  )
}


