import {Routes,Route } from "react-router-dom";
import {DeviceControl, Home, LoadControl} from "../pages"
export const AllRoutes = ()=>
    {
        return(
            <>
            <Routes>
                <Route path="/" element={<Home />} ></Route>
                <Route path="/DeviceControl" element={<DeviceControl />}></Route>
            </Routes>
            </>
        )
    }