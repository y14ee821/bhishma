import { MqttPub } from "../../mqtt_components/"
//Received Message: ip4:1-ip1:1-ip2:1-ip3:1 on topic: rao/status
export const IOcard = ({item,client}) => {

    //console.log("itm",item)
    const checkValue = (name,controlsLength)=>{
      console.log(name,controlsLength)
      let opString = ""
      for(let i=1;i<=controlsLength;i++)
      {
        opString += `op${i}:${document.getElementById(`${name}-${i}`).checked?1:0}${i!==controlsLength?"-":""}`
      }
      //let opString = `op1:${document.getElementById(`${name}-1`).checked}-op2:${document.getElementById(`${name}-2`).checked}-op3:${document.getElementById(`${name}-3`).checked}-op4:${document.getElementById(`${name}-4`).checked}`
      console.log(opString)
      return String(opString)
    }
  const individualGroup = (item,controlsLength)=>{return <div key={item.id} className="w-60 p-4 m-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <p className="text-2xl text-gray-900 dark:text-white">Channel: {item.name || '-'}</p>
    
    <div className="inline-flex rounded-md shadow-sm m-4" role="group">
        
      {/* <button onClick={()=>MqttPub(client,"rao/status","ON")} type="button" className="px-4  py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
        ON
      </button>
      <button onClick={()=>MqttPub(client,"rao/status","OFF")} type="button" className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border rounded-e-lg border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
        OFF
      </button> */}
<label className="inline-flex items-center me-5 cursor-pointer">
  <input  onChange={(e)=>MqttPub(client, `${item.IE_Name}`,checkValue(item.IE_Name,controlsLength))} id={`${item.IE_Name}-${item.name}`} type="checkbox" value="" className="sr-only peer"  />
  <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">OFF</span>
  <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600"></div>
  <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">ON</span>
</label>    
    
    
      
    </div>
    <p className="text-base text-center  text-gray-900 dark:text-white">Current State:{item.currentState || '-'}</p>
    </div>
    }
    if(item)
return Object.keys(item).map((group,index)=>
    <div key={index} className="border-2 m-2">
    <div className="text-2xl  dark:hover:text-white text-black dark:text-white font-bold">{group}</div>
    <div className="flex flex-wrap justify-center">{item[group].map(value=>individualGroup(value,item[group].length))}</div>
    </div>
)
  
  
}

