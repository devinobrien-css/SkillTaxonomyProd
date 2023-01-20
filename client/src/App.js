import { useState } from "react";
import { TitleLg } from "./components/component.library";
import { Icon } from '@iconify/react';
import { Categories } from "./pages/categories.page";
import { Skills } from "./pages/skills.page";
import { Assign } from "./pages/assign.page";

const App = () => {
  const [navToggle,setNavToggle] = useState("categories")
  const [,setSelected] = useState()
  const [toastMessage,setToastMessage] = useState()
  const [toastStatus,setToastStatus] = useState()

  if(toastStatus){
    setTimeout(() => {
      setToastStatus()
      setToastMessage()
    },1000)
  }


  return (
    <div className="bg-bg_lightgray h-screen relative">
      <div className={`absolute w-full border transition-all duration-1000 overflow-hidden flex flex-col items-center ${toastStatus?"h-full p-4":"h-0 p-0"}`}>
        <p className={`flex bg-gray-600 p-4 text-white rounded shadow transition-all`}>{toastMessage} <Icon icon={"ic:round-check-circle"} className="my-auto"/></p>
      </div>
      <div className="p-4">
        <TitleLg><span className="flex">Skill Taxonomy Example (the skill family tree <Icon icon={"noto:deciduous-tree"} />)</span></TitleLg>

        <div className="flex mt-8">
          <div className="flex flex-col w-1/6">
            <button 
              className={`flex text-left text-2xl p-2 rounded transition-all ${navToggle==="categories"?"bg-gray-300 font-bold":"bg-white font-light text-font-dark"}`} 
              onClick={() => {
                setSelected()
                setNavToggle("categories")
              }}>
              <Icon icon={'carbon:category'} className="my-auto mr-2" width={30}/>categories
            </button>
            <button 
              className={`flex text-left text-2xl p-2 mt-2 rounded transition-all ${navToggle==="skills"?"bg-gray-300 font-bold":"bg-white font-light text-font-dark"}`} 
              onClick={() => {
                setSelected()
                setNavToggle("skills")
              }}>
              <Icon icon={'ic:outline-assessment'} className="my-auto mr-2" width={30}/>skills
            </button>
            <button 
              className={`flex text-left text-2xl p-2 mt-2 rounded transition-all ${navToggle==="assign"?"bg-gray-300 font-bold":"bg-white font-light text-font-dark"}`} 
              onClick={() => {
                setSelected()
                setNavToggle("assign")
              }}>
              <Icon icon={'material-symbols:assignment-add-outline-rounded'} className="my-auto mr-2" width={30}/>assign
            </button>
          </div>
          
          {navToggle==="skills"?(
              <Skills />
          ):(
            navToggle==="categories"?(
              <Categories />
            ):(
              <Assign />
            )
          )}
        </div>
      </div>
    </div>
  );
}
export default App;