
export const MqttMessage = (client) => {
    client.on('message', function (topic, message) {
        // message is Buffer
        //Received Message: ip4:1-ip1:1-ip2:1-ip3:1 on topic: rao/status
        console.log(`Received Message: ${message.toString()} on topic: ${topic}`)
        message.toString().split("-").map(
          i => i.split(":")).map
          (
            j=>(
              console.log(`${topic.split("/")[0]}-${j[0][2]}-${j[1]}`),
              j[1]==1?document.getElementById(`${topic.split("/")[0]}-${j[0][2]}`).checked="1":
              document.getElementById(`${topic.split("/")[0]}-${j[0][2]}`).checked=""
              //console.log(document.getElementById(`${topic.split("/")[0]}-${j[0][2]}`).checked)
             )
          )
        
        //client.end()
      })    
  // return (
  //   <div>
      
  //   </div>
  // )
}

