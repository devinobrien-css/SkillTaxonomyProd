import { useState } from "react"
import { Modal, SubTitle, TitleLg, TitleMd } from "../component.library"
import { Addbutton, CategoryCardSm, SkillCardSm, UserCardSm } from "../custom.library"
import { useQuery } from "@apollo/client";
import {  GetSkillCousins, GetSkills } from "../../apollo/skills.mjs";
import { GetCategories } from "../../apollo/categories.mjs";
import { RemoveSkillModal } from "./removeSkillModal.component";
import { AddCategoryModal } from "./addCategoryModal.component";
import { Icon } from '@iconify/react';


export const ExploreSkill = ({skill}) => {
    const [addCategoryModal,setAddCategoryModal] = useState()
    const [removeParentModal,setRemoveParentModal] = useState()

    const {data:skillData,loading} = useQuery(GetSkills,{
        variables:{
            where:{
                name:skill?.name
            }
        }
    })

    const {data:siblingSkills} = useQuery(GetSkills,{
        variables:{
            where: {
                name_NOT:skill?.name,
                inCategoryConnection_SOME: {
                    node: {
                        name_IN: skill?.inCategory.map(category =>{return category.name})
                    }
                }
            }
        }
    })

    const {data:siblingCategories} = useQuery(GetCategories,{
        variables:{
            where: {
                parentCategoriesConnection_SOME: {
                    node: {
                        name_IN: skill?.inCategory.map(category =>{return category.name})
                    }
                }
            }
          }
    })

    const {data:cousinSkills} = useQuery(GetSkillCousins,{
        variables:{
            skillName: skill?.name
        }
    })

    return (
        <>
            {loading?(
                <div className="z-50 bg-white absolute top-0 left-0 w-full h-full border flex flex-col items-center ">
                    <Icon icon="eos-icons:loading" width={50} className="my-auto"/>
                </div>
            ):(<></>)}
            <Modal
                display={addCategoryModal}
                setDisplay={setAddCategoryModal}
            >
                <AddCategoryModal skill={skillData?.skills[0]}/>
            </Modal>
            <Modal
                display={removeParentModal}
                setDisplay={setRemoveParentModal}
            >
                <RemoveSkillModal skill={skillData?.skills[0]} category={removeParentModal} />
            </Modal>

            <TitleLg>{skillData?.skills[0].name}</TitleLg>
            <br/>
            
            <span className="text-font-dark"></span>
            <TitleMd>Parent Categories </TitleMd>
            <SubTitle>All categories this skill appears in</SubTitle>
            <div className="flex [&>*]:my-auto [&>*]:mx-2 w-full overflow-x-scroll">
                <Addbutton onClick={()=>setAddCategoryModal("add-parent")}/>
                {skillData?.skills[0].inCategory.map((category,index) => {
                    return <CategoryCardSm category={category} key={index} onClick={()=>setRemoveParentModal(category)} />
                })}
            </div>
            <br/>

            <TitleMd>Sibling-Skills</TitleMd>
            <SubTitle>All skills related by parent to this skill</SubTitle>
            <div className="flex [&>*]:my-auto [&>*]:mx-2 w-full overflow-x-scroll">
                {siblingSkills?.skills.map((skill,index) => {
                    return <SkillCardSm skill={skill} key={index} />
                })}
            </div>
            <br/>

            <TitleMd>Sibling-Categories</TitleMd>
            <SubTitle>All categories related by parent to this skill</SubTitle>
            <div className="flex [&>*]:my-auto [&>*]:mx-2 w-full overflow-x-scroll">
                {siblingCategories?.skillCategories.map((category,index) => {
                    return <CategoryCardSm category={category} key={index} />
                })}
            </div>
            <br/>

            <TitleMd>Cousin-Skills</TitleMd>
            <SubTitle>All skills related by grandparent to this skill</SubTitle>
            <div className="flex [&>*]:my-auto [&>*]:mx-2 w-full overflow-x-scroll">
                {cousinSkills?.getSkillCousins.map((skill,index) => {
                    return <SkillCardSm skill={skill} key={index} />
                })}
            </div>
            <br/>

            <TitleMd>Users Attached</TitleMd>
            <SubTitle>All users connected to this skill</SubTitle>
            <div className="flex flex-wrap w-full overflow-x-scroll">
                {skillData?.skills[0]?.knownBy.map((user,index) => {
                    return <UserCardSm key={index} user={user} className="m-2"/>
                })}
            </div>
        </>
    )
}