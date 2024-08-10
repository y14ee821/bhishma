import mqtt from "mqtt"
import { IOcard } from "../components/card/IOcard"
import { MqttSub,MqttPub,MqttMessage } from "../mqtt_components/"
import { useState, useEffect } from "react"


export const DeviceControl = () => {
const sampleChannels = [{"First Machine":[{
                        "id":1,
                        "name": "C",
                        "currentState": "OFF"
                        },
                        {
                          "id":2,
                          "name": "H",
                          "currentState": "OFF"
                        },
                        {
                          "id":3,
                          "name": "V",
                          "currentState": "OFF"
                        },
                        {
                          "id":4,
                          "name": "R",
                          "currentState": "OFF"
                        }]},

                        {"Second Machine":[{
                          "id":1,
                          "name": "C",
                          "currentState": "OFF"
                          },]}

                      ]
  const options = {
    connectTimeout: 4000,
    keepalive: 60,
    //connectTimeout: 1000,
    //reconnectPeriod: 0,

    clientId: 'lohit_mqtt',
    
  }
  const url = process.env.REACT_APP_MQTT_HOST


  const [client,setClient] = useState(mqtt.connect(url, options)) 
  
  client.on('connect', function () 
  {
    console.log("client Connected",client.connected)
    setClient(client)
    MqttSub(client,"rao")
    MqttSub(client,"rao2")
    MqttMessage(client)
    //MqttPub(client,"rao","Message from rao...")
  
  })
  client.on('error', (err) => {
    console.error('Connection error: ', err);
    client.end();
  });
  client.on('reconnect', () => {
    console.log('Reconnecting');
  });
  return (
    <main>
  <div className="flex flex-wrap justify-center m-2">
  {sampleChannels.map(item =>   <IOcard item={item} client={client}/>)}<IOcard />-
  </div>
    </main>
  )
}


