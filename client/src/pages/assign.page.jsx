import { useQuery } from "@apollo/client"
import { useState } from "react"
import { GetSkills } from "../apollo/skills.mjs"
import { AssignUsers } from "../components/assign/assignUsers.component.jsx"
import { TitleLg } from "../components/component.library"
import { SkillCardMd } from "../components/custom.library"

export const Assign = () => {
    const [selected,setSelected] = useState([])
    const [search,setSearch] = useState("")

    const {data:skillsData} = useQuery(GetSkills)

    return (
        <>
            <div className="relative px-4 w-1/6">
                <div className="w-full">
                    <input className="w-full rounded p-4 shadow" placeholder="Search..." onChange={(e) => setSearch(e.target.value)}/>
                </div>

                <div className="h-[76vh] overflow-y-scroll">
                    {skillsData?.skills
                    .filter(skill => {return skill.name.toLowerCase().includes(search.toLowerCase())})
                    .filter(skill => {return !selected.map(selectedSkill => {return skill.name === selectedSkill.name}).includes(true)})
                    .map((skill,index) => {
                        return <SkillCardMd skill={skill} key={index} onClick={() => setSelected([...selected,skill])}/>
                    })}
                </div>

            </div>

            <div className="p-4 w-4/6 rounded bg-white shadow relative h-[80vh] overflow-scroll">
                {selected?(
                    <AssignUsers selected={selected} setSelected={setSelected} />
                ):(
                    <TitleLg className="my-48 text-center">Select a skill to begin</TitleLg>
                )}
            </div>
        </>
    )

}