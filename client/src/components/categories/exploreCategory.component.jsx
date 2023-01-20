import { useQuery } from "@apollo/client"
import { useState } from "react"
import { Icon } from '@iconify/react';
import { GetCategories, GetCategoryCousins } from "../../apollo/categories.mjs"
import { Modal, SubTitle, TitleMd } from "../component.library"
import { Addbutton, CategoryCardSm, SkillCardSm } from "../custom.library"
import { AddChildModal } from "./addChildModal.component.jsx"
import { AddParentModal } from "./addParentModal.component.jsx"
import { AddSkillModal } from "./addSkillModal.component.jsx"
import { RemoveChildModal } from "./removeChildModal.component.jsx";
import { RemoveSkillModal } from "./removeSkillModal.component.jsx";

/** Section for exploring a given category and its related nodes
 * @param {*} param0 
 * @returns 
 */
export const ExploreCategory = ({category}) => {
    const [addParent,setAddParent] = useState()
    const [addChild,setAddChild] = useState()
    const [addSkill,setAddSkill] = useState()
    const [removeChildCategory,setRemoveChildCategory] = useState()
    const [removeSkill,setRemoveSkill] = useState()

    // const {data:skillTree} = useQuery(GetSkillTree)
    
    const {data,loading} = useQuery(GetCategories,{
        variables:{
            where:{
                name:category.name
            }
        }
    })

    const {data:siblingCategories} = useQuery(GetCategories,{
        variables:{
            where: {
                name_NOT:category.name,
                parentCategoriesConnection_SOME: {
                    node: {
                        name_IN: data?.skillCategories[0].parentCategories.map(category =>{return category.name})
                    }
                }
            }
          }
    })

    const {data:cousinCategories} = useQuery(GetCategoryCousins,{
        variables:{
            categoryName: category.name
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
                display={addParent}
                setDisplay={setAddParent}
            >   
                <AddParentModal category={data?.skillCategories[0]} />
            </Modal>
            <Modal
                display={addChild}
                setDisplay={setAddChild}
            >
                <AddChildModal category={data?.skillCategories[0]}/>
            </Modal>
            <Modal
                display={addSkill}
                setDisplay={setAddSkill}
            >
                <AddSkillModal category={data?.skillCategories[0]} />
            </Modal>
            <Modal
                display={removeChildCategory}
                setDisplay={setRemoveChildCategory}
            >
                <RemoveChildModal child={removeChildCategory} category={data?.skillCategories[0]} setModal={setRemoveChildCategory}/>
            </Modal>
            <Modal
                display={removeChildCategory}
                setDisplay={setRemoveChildCategory}
            >
                <RemoveChildModal child={data?.skillCategories[0]} category={removeChildCategory} setModal={setRemoveChildCategory}/>
            </Modal>
            <Modal
                display={removeSkill}
                setDisplay={setRemoveSkill}
            >
                <RemoveSkillModal skill={removeSkill} category={data?.skillCategories[0]} setModal={setRemoveSkill}/>
            </Modal>
            <TitleMd>{data?.skillCategories[0].name}</TitleMd>
            <br/>

            <TitleMd>Parent Categories <span className="text-font-dark">{data?.skillCategories[0].parentCategories.length}</span></TitleMd>
            <SubTitle>All predecessors of this category</SubTitle>
            <div className="flex [&>*]:my-auto [&>*]:mx-2 w-full overflow-x-scroll">
                <Addbutton onClick={() =>setAddParent(true)}/>
                {data?.skillCategories[0].parentCategories.map((category,index) => {
                    return <CategoryCardSm category={category} key={index} />
                })}
            </div>
            <br/>

            <TitleMd>Child Categories <span className="text-font-dark">{data?.skillCategories[0].childCategories.length}</span></TitleMd>
            <SubTitle>All decendants of this category</SubTitle>
            <div className="flex [&>*]:my-auto [&>*]:mx-2 w-full overflow-x-scroll">
                <Addbutton onClick={() => setAddChild(true)} />
                {data?.skillCategories[0].childCategories.map((category,index) => {
                    return <CategoryCardSm category={category} key={index} onClick={()=> setRemoveChildCategory(category)}/>
                })}
            </div>
            <br/>

            <TitleMd>Skills Attached <span className="text-font-dark">{data?.skillCategories[0].childSkills.length}</span></TitleMd>
            <SubTitle>All skills in this category</SubTitle>
            <div className="flex [&>*]:my-auto [&>*]:mx-2 w-full overflow-x-scroll">
                <Addbutton onClick={() =>  setAddSkill(true)} />
                {data?.skillCategories[0].childSkills.map((skill,index) => {
                    return <SkillCardSm skill={skill} key={index} onClick={()=> setRemoveSkill(skill)}/>
                })}
            </div>
            <br/>

            <TitleMd>Sibling Categories</TitleMd>
            <SubTitle>All categories related by parent to this category.<br/> These categories share a high relation amongst eachother</SubTitle>
            <div className="flex [&>*]:my-auto [&>*]:mx-2 w-full overflow-x-scroll">
                {siblingCategories?.skillCategories.map((category,index) => {
                    return <CategoryCardSm category={category} key={index} />
                })}
            </div>
            <br/>

            <TitleMd>Cousin-Categories</TitleMd>
            <SubTitle>All categories related by grandparent to this category. <br/>These categories share only a partial relationship</SubTitle>
            <div className="flex [&>*]:my-auto [&>*]:mx-2 w-full overflow-x-scroll">
                {cousinCategories?.getCategoryCousins.map((category,index) => {
                    return <CategoryCardSm category={category} key={index} />
                })}
            </div>
            <br/>

            <TitleMd>Users Attached</TitleMd>
            <SubTitle>All users with skills in this category</SubTitle>
            <br/>
            
        </>
    )
}
