import { useMutation, useQuery } from "@apollo/client"
import { useState } from "react"
import { GetCategories } from "../../apollo/categories.mjs"
import { AttachSkillParentCategory, GetSkills } from "../../apollo/skills.mjs"
import { ButtonMd, SearchSelect, SubTitle, TitleMd, TitleSm } from "../component.library"
import {Icon} from "@iconify/react"

export const AddSkillModal = ({category}) => {
    const [selectedSkill,setSelected] = useState()
    const {data:skillData} = useQuery(GetSkills)
    const [attachParent,{data,loading}] = useMutation(AttachSkillParentCategory)

    const onSubmit = async() => {
        await attachParent({
            variables:{
                where: {
                    name: selectedSkill
                },
                connect: {
                    inCategory: [
                        {
                            where: {
                                node: {
                                    name: category.name
                                }
                            }
                        }
                    ]
                }
            },
            refetchQueries:[GetCategories]
        })
    }

    return (
        <div className="p-4">
            {loading?(
                <div className="bg-white absolute h-full w-full z-40 top-0 left-0 flex flex-col items-center">
                    <Icon icon={"eos-icons:loading"}  className="my-auto" width={50}/>
                </div>
            ):(<></>)}
            {data?(
                <div className="bg-white absolute h-full w-full z-40 top-0 left-0 flex flex-col items-center">
                    <div className={"my-auto"}>
                        <TitleMd className={"text-center"}>Child Added to Parent</TitleMd>
                        <SubTitle className={"text-center"}>You can now close this window</SubTitle>
                    </div>
                </div>
            ):(<></>)}
            <TitleMd>Add a Child to this Category</TitleMd>
            <SubTitle>Search and select a category to add this skill to</SubTitle>

            <br/>
            <br/>
            <TitleSm>Select a Skill</TitleSm>
            <SearchSelect 
                options={
                    skillData?.skills
                    .filter(skill => {
                        return !category.childSkills.filter(childSkill => childSkill.name === skill.name).length
                    })
                    .map(category => {return category.name})
                }
                setSelected={setSelected}
            />

            <br/>
            <br/>

            {selectedSkill?(
                <>
                    <TitleSm>Confirm Selection</TitleSm>
                    <SubTitle>Attach skill <span className="font-bold">{selectedSkill}</span> to parent <span className="font-bold">{category.name}</span>?</SubTitle>
                    <div className="[&>*]:mx-4">
                        <ButtonMd
                            color="blue"
                            onClick={onSubmit}
                        >
                            Confirm
                        </ButtonMd>
                        <ButtonMd
                            color="red"
                            onClick={()=>{
                                setSelected()
                            }}
                        >
                            Cancel
                        </ButtonMd>
                    </div>
                </>
            ):(<></>)}  
        </div>
    )
}