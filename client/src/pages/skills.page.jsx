import { useMutation, useQuery } from "@apollo/client"
import { useState } from "react"
import { GetCategories } from "../apollo/categories.mjs"
import { AddSkill, GetSkills } from "../apollo/skills.mjs"
import { ButtonMd, TitleLg } from "../components/component.library"
import { SkillCardMd, SkillCardSm } from "../components/custom.library"
import { ExploreSkill } from "../components/skills/exploreSkill.component"



export const Skills = () => {
    const [selected,setSelected] = useState()
    const [search,setSearch] = useState("")
    const [newNode,setNewNode] = useState("")

    const {data:skillsData} = useQuery(GetSkills)

    const [addSkill,{data,loading}] = useMutation(AddSkill,{
        refetchQueries:[GetSkills,GetCategories]
    })


    const onAddSkill = async() => {
        if(newNode){
            await addSkill({
                variables:{
                input: [
                    {
                    name: newNode
                    }
                ]
                }
            })
        }
    }

    return (
        <>
            <div className="relative px-4 w-1/6">
                <div className="w-full">
                <input className="w-full rounded p-4 shadow" placeholder="Search..." onChange={(e) => setSearch(e.target.value)}/>
                </div>
                <div className="flex bg-white p-2 mt-2 rounded shadow">
                    <input className="w-full p-4 focus:ring-0 outline-none" placeholder="add new..." value={newNode} onChange={(e) => setNewNode(e.target.value)}/>
                    <ButtonMd  
                    color={"blue"}
                    onClick={() => {
                        onAddSkill()
                        // setToastMessage("New Skill Added")
                        // setToastStatus(true)
                        setNewNode("")
                    }}  
                    >Add</ButtonMd>
                </div>

                <div className="h-[72vh] overflow-y-scroll">
                    {skillsData?.skills
                    .filter(skill => {return skill.name.toLowerCase().includes(search.toLowerCase())})
                    .map((skill,index) => {
                        return <SkillCardMd skill={skill} key={index} onClick={() => setSelected(skill)}/>
                    })}
                </div>

            </div>

            <div className="p-4 w-4/6 rounded bg-white shadow relative h-[80vh] overflow-scroll">
                {selected?(
                    <ExploreSkill skill={selected} />
                ):(
                    <TitleLg className="my-48 text-center">Select from the skills</TitleLg>
                )}
            </div>
        </>
    )

}