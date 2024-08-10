
export const MqttMessage = (client) => {
    client.on('message', function (topic, message) {
        // message is Buffer
        console.log(message.toString())
        //client.end()
      })    
  return (
    <div>
      
    </div>
  )
}

