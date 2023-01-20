
import { useState } from "react"
import { ButtonMd, SearchSelect, SubTitle, TitleMd, TitleSm } from "../component.library"
import { Icon } from '@iconify/react';
import { useMutation, useQuery } from "@apollo/client";
import { AttachSkillParentCategory, GetSkills } from "../../apollo/skills.mjs";
import { GetCategories } from "../../apollo/categories.mjs";

export const AddCategoryModal = ({skill}) => {
    const [selectedCategory,setSelected] = useState()
    const {data} = useQuery(GetCategories)
    const {data:skillData} = useQuery(GetSkills,{
        variables:{
            where:{
                name:skill?.name
            }
        }
    })
    
    console.log(skillData)
    const [attachParent,{data:updateData,loading}] = useMutation(AttachSkillParentCategory)

    const onSubmit = async() => {
        await attachParent({
            variables:{
                where: {
                    name: skillData?.skills[0].name
                },
                connect: {
                    inCategory: [
                        {
                            where: {
                                node: {
                                    name: selectedCategory
                                }
                            }
                        }
                    ]
                },
            },   
            refetchQueries:[GetSkills,GetCategories]
        })
    }

    return (
        <div className="p-4 relative">
            {loading?(
                <div className="bg-white absolute h-full w-full z-40 top-0 left-0 flex flex-col items-center">
                    <Icon icon={"eos-icons:loading"}  className="my-auto" width={50} />
                </div>
            ):(<></>)}
            {updateData?(
                <div className="bg-white absolute h-full w-full z-40 top-0 left-0 flex flex-col items-center">
                    <div className={"my-auto"}>
                        <TitleMd className={"text-center"}>Skill added as Child to Parent</TitleMd>
                        <SubTitle className={"text-center"}>You can now close this window</SubTitle>
                    </div>
                </div>
            ):(<></>)}

            <TitleMd>Add a Parent to this Skill</TitleMd>
            <SubTitle>Search and select a category to add this skill to</SubTitle>

            <br/>
            <br/>
            <TitleSm>Select a Category</TitleSm>
            <SearchSelect 
                options={data?.skillCategories.filter(category =>  !skillData?.skills[0].inCategory.filter(skillCat => category.name === skillCat.name).length).map(category => {return category.name})}
                setSelected={setSelected}
            />
            <br/>
            <br/>

            {selectedCategory?(
                <>
                    <TitleSm>Confirm Selection</TitleSm>
                    <SubTitle>Add skill <span className="font-bold">{skillData?.skills[0].name}</span> to category <span className="font-bold">{selectedCategory}</span>?</SubTitle>
                    <div className="[&>*]:mx-4">
                        <ButtonMd
                            color="blue"
                            onClick={onSubmit}
                        >
                            Confirm
                        </ButtonMd>
                        <ButtonMd
                            color="red"
                            onClick={()=>{setSelected()}}
                        >
                            Cancel
                        </ButtonMd>
                    </div>
                </>
            ):(
                <>
                </>
            )}  
        </div>
    )
}