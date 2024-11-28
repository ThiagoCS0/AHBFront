import { createContext } from "react";
export const CorpoContexto = createContext();
export default function Corpo({ children }) {

 return (
  <div id="corpo">
   <CorpoContexto.Provider value={null}>
    {children}
   </CorpoContexto.Provider>
  </div>
 )
}