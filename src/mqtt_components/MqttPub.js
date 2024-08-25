export const MqttPub = (client,topic,message) => {
  client.publish(topic, message,(error)=>{
    if(error)
    {
      console.log(error)
    }
    else
    {
      console.log(`Published Message: '${message}' Published on Topic: ${topic}`)
    }
  })

 


  return (
    <div>
      
    </div>
  )
}

