import { MqttPub,MqttSub } from "../../mqttcomponents/";
import { useIEState } from "../../context";
import {checkValue} from "../../utils/Utilities"

//Received Message: ip4:1-ip1:1-ip2:1-ip3:1 on topic: rao/status
export const IOcard = ({ item, client }) => {
  const { IE_Info, modifyIE_Machines } = useIEState();

  MqttSub(client,`${Object.keys(item)}/status`)//subscribes to topic


  const utility = (item, controlsLength) => {
    /* if any change detected in radio buttons,
                then current status of all radio buttons of particular IE will be sent to corresponding IE.
    */
    MqttPub(
      client,
      `${item.IE_Name}`,
      checkValue(item.IE_Name, controlsLength)
    );
    /*store the time stamp when there is change in the radio button got detected
    This will be useful to disable/enable the radio button gracefully.
    */
    IE_Info[item.IE_Name]["channels"][item.name]["channelUpdatedTime"]= new Date();
    /*
                modifes the raidobutton value in object of each IE based on the radio button checked status.
                */
    IE_Info[item.IE_Name]["channels"][item.name]["radioValue"] = document.getElementById(
      `${item.IE_Name}-${item.name}`
    ).checked
      ? 1
      : 0;
    /*
                As change detected in radio button, same checked status will be sent to IE.
                so , whenever change detected in radioButton then 'ui' class will be added to classList of Radiobutton.
                    class: 'ui' has radio button disable property.
                so that UI wont get immediately updated by the current hardware output value(from mqttMessage.js) when we try to toggle the radio button for controlling IE outputs(as hardware will take time to process the messages from server, there is possibility to unable to control the IE from UI)
                */
    document.getElementById(`${item.IE_Name}-${item.name}`).classList.add("ui");
    document.getElementById(`${item.IE_Name}-${item.name}`).setAttribute("disabled",true)         
    /* updates the context */
    modifyIE_Machines(IE_Info);
  };




  const individualGroup = (item, controlsLength) => {
    /*
    Creates UI Component for each IE_Info Object and renders
        
    */
    return (
      <div
        key={item.id}
        className="w-60 p-4 m-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" id={`${item.IE_Name}-${item.name}-bc`}>
        <p className="text-2xl text-gray-900 dark:text-white">
          Channel: {item.name || "-"}
        </p>

        <p
          className="text-base text-center  text-gray-900 dark:text-white font-bold"
          id={`${item.IE_Name}-${item.name}-current`}
        >
          <span id={`${item.IE_Name}-${item.name}-current`}>Current State:{item.currentState || "-"}</span>
        </p>

        <div className="inline-flex rounded-md shadow-sm m-4 " role="group">
          <label className="inline-flex items-center me-5 cursor-pointer">
            <input
              onChange={(e) => utility(item, controlsLength)}
              id={`${item.IE_Name}-${item.name}`}
              type="checkbox"
              value=""
              className="sr-only peer"
            />
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              OFF
            </span>
            <div className={`relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-600 `} id={`${item.IE_Name}-${item.name}-cursor`}></div>
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              ON
            </span>
            
          </label>
        </div>

      </div>
    );
  };

  if (item)//if this components receives valid IE_Info Object
    return Object.keys(item).map((group, index) => (
      <>
      <p className={`text-2xl   text-red-600  font-bold ${IE_Info[group]["running"]?"invisible":" "}`}>unable to communicate to {group}</p>
      <div key={index} className={`border-2 m-2 ${IE_Info[group]["running"]?" ":"invisible"}`}>

        <div className="text-2xl  dark:hover:text-white text-black dark:text-white font-bold">
          Machine Name: {group}
        </div>
        <div className="flex flex-wrap justify-center">
          {/* creates UI component for each IE_Info Object by using funtion: 'individualGroup' */}
          {Object.keys(item[group]).map((value) =>
            individualGroup(item[group][value], Object.keys(item[group]).length)
          )}
        </div>
      </div>
      </>
    ));
};


// if (item)//if this components receives valid IE_Info Object
// return Object.keys(item).map((group, index) => ( IE_Info[group]["running"]?
//   <div key={index} className="border-2 m-2">
//     <div className="text-2xl  dark:hover:text-white text-black dark:text-white font-bold">
//       Machine Name: {group}
//     </div>
//     <div className="flex flex-wrap justify-center">
//       {/* creates UI component for each IE_Info Object by using funtion: 'individualGroup' */}
//       {Object.keys(item[group]).map((value) =>
//         individualGroup(item[group][value], Object.keys(item[group]).length)
//       )}
//     </div>
//   </div>:
//   <p className="text-2xl  dark:hover:text-white text-black dark:text-white font-bold">unable to communicate to {group}</p>
// ));
// };
