import { MqttPub } from "../../mqtt_components/"

export const IOcard = ({item,client}) => {
    console.log("itm",item)
  const individualGroup = (item)=>{return <div className="w-60 p-4 m-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <p className="text-2xl text-gray-900 dark:text-white">Channel: {item.name || '-'}</p>
    
    <div className="inline-flex rounded-md shadow-sm m-4" role="group">
        
      <button onClick={()=>MqttPub(client,"rao/status","ON")} type="button" className="px-4  py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
        ON
      </button>
      <button onClick={()=>MqttPub(client,"rao/status","OFF")} type="button" className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border rounded-e-lg border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
        OFF
      </button>

    
      
    </div>
    <p className="text-base text-center  text-gray-900 dark:text-white">Current State:{item.currentState || '-'}</p>
    </div>
    }
    if(item)
return Object.keys(item).map(group=>
    <div className="border-2 m-2">
    <div className="text-2xl  dark:hover:text-white text-black dark:text-white font-bold">{group}</div>
    <div className="flex flex-wrap justify-center">{item[group].map(value=>individualGroup(value))}</div>
    </div>
)
  
  
}

