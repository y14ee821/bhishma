import mqtt from "mqtt"
export const MqttBase = () => {
    //const url = "mqtt://test.mosquitto.org:1884/"
    console.log(process.env.REACT_APP_MQTT_HOST)
    const url = process.env.REACT_APP_MQTT_HOST
    const options = {
        // connectTimeout: 4000,
        // keepalive: 60,
        clientId: 'lohit_mqtt',
        
      }
      const client  = mqtt.connect(url, options)
      console.log(client.connected)
      client.on('connect', function () 
                {
                  console.log('Connected')
                }
                )
      
     
  return (client)
}

