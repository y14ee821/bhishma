import {Routes,Route } from "react-router-dom";
import {DeviceControl, Home, LoadControl,DeviceControlHome} from "../pages"
export const AllRoutes = ()=>
    {
        return(
            <>
            <Routes>
                <Route path="/" element={<Home />} ></Route>
                <Route path="/DeviceControl/:id" element={<DeviceControl />}></Route>
                <Route path="/DeviceControl" element={<DeviceControlHome />}></Route>
            </Routes>
            </>
        )
    }