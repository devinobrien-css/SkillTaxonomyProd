import { useQuery } from "@apollo/client"
import { Icon } from "@iconify/react"
import { GetUserSkillStats } from "../../apollo/skills.mjs"
import { ButtonMd, NumericalInput, SubTitle, TitleLg, TitleMd, TitleSm } from "../component.library"
import { SkillCardSm } from "../custom.library"


export const AssignUsers = ({selected,setSelected}) => {


    const {data,loading,refetch} = useQuery(GetUserSkillStats,{
        skillList: [""],
        min: 0,
        topK: 10
    })

    const onFindUsers = async() => {
        await refetch({
            skillList: selected.map(skill => skill.name),
            min: 0,
            topK: 10
        })
    }
    
    const assignTextColor = (value) => {
        console.log(value)
        if(value > 90){
            return "text-blue-500"
        }
        else if(value > 70){
            return "text-yellow-500"
        }
        else if(value > 50){
            return "text-orange-500"
        }
        else{
            return "text-red-500"
        }
    }
    
    return (
        <div>
            <TitleLg>Draft Users based off of Selected Skills</TitleLg>
            <br/>

            <TitleMd>Selected Skills</TitleMd>
            <div className="flex">
                {selected.map((skill,index)=> {
                    return (
                        <SkillCardSm 
                            key={`skill-selected-${index}`}
                            skill={skill}
                            className=" mx-2"
                            onClick={()=>{
                                const out = selected.filter(selectedSkill => {
                                    return selectedSkill.name !== skill.name
                                })
                                setSelected(out)
                            }}
                        >{skill.name}</SkillCardSm>
                    )
                })}
            </div>
            <br/>

            <TitleMd>Search Specifications</TitleMd>
            <TitleSm>Minimum Skills Required</TitleSm>
            <NumericalInput defaultValue={selected.length} max={selected.length} min={0}/>

            <TitleSm>Number of Users to Return</TitleSm>
            <NumericalInput defaultValue={5} max={15} min={0}/>
            <br/>
            <br/>

            <div className="[&>*]:mx-2">
                <ButtonMd color={"blue"} onClick={onFindUsers}>Find Users</ButtonMd>
                <ButtonMd color={"red"} onClick={()=>setSelected([])}>Clear Selected</ButtonMd>
            </div>
            <br/>


            <div className={` `}>
                <TitleMd>Recommended Users</TitleMd>
                <SubTitle>Users ranked in descending order. Select a user to view their transferrable skills</SubTitle>
                <br/>
                {loading?(
                    <div className="flex flex-col items-center">
                        <Icon icon="eos-icons:loading" width={50} className="my-auto"/>
                    </div>
                ):(
                    data?(
                        <div className="rounded-xl overflow-hidden border border-borders">
                            <div className="flex w-full border p-4 border-borders justify-between bg-gray-200 font-bold">
                                <p className="w-1/3 ">User</p>
                                <p className="w-1/3 text-center">Transferrables</p>
                                <p className="w-1/3 text-right">Ranking</p>
                            </div>
                            {data.getUsersWithSkills.map((user,key) => {
                                return (
                                    <div 
                                        key={key} 
                                        className="flex w-full border p-4 border-borders justify-between transition-all hover:bg-blue-100 cursor-pointer"
                                    >
                                        <p className="w-1/3 font-light text-xl">{user.name}</p>
                                        <div className="flex flex-wrap w-1/3 border-r-2 border-l-2">
                                            {user.skills.map(skill => {
                                                return <p className="border border-borders p-1 rounded mx-auto my-2">{skill}</p>
                                            })}
                                        </div>
                                        <p className={`w-1/3 text-right ${assignTextColor(Math.floor(user.percentKnown*100))}`}>{Math.floor(user.percentKnown*100)}% Qualified</p>
                                    </div>
                                )
                            })}
                        </div>
                    ):(<></>)
                )}
            </div>

        </div>
    )
}