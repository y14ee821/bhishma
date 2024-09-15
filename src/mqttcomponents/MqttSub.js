
export const MqttSub = (client,topic) => {
  
        client.subscribe(topic, function (err) {
          //console.log("Topics", topic)
          if (!err) {
            // Publish a message to a topic
            //console.log(`failed to subscribe to topic ${topic}`)
          }
        })
        

      
      // Receive messages
  
    return (
    <div>
      
    </div>
  )
}

