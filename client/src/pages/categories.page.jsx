import { useMutation, useQuery } from "@apollo/client"
import { useState } from "react"
import { AddCategory, GetCategories } from "../apollo/categories.mjs"
import { GetSkills } from "../apollo/skills.mjs"
import { ExploreCategory } from "../components/categories/exploreCategory.component.jsx"
import { ButtonMd, TitleLg } from "../components/component.library.jsx"
import { CategoryCardMd } from "../components/custom.library.jsx"



export const Categories = () => {

    const [search,setSearch] = useState("")
    const [newNode,setNewNode] = useState("")
    const [selected,setSelected] = useState()

    
    const {data:categoriesData} = useQuery(GetCategories)
    
    const [addCategory,{data:newCategory,loading:newCategoryLoading}] = useMutation(AddCategory,{
        refetchQueries:[GetSkills,GetCategories]
    })
    
    
    const onAddCategory = async() => {
        if(newNode){
            await addCategory({
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
                        onAddCategory()
                        // setToastMessage("New Category Added")
                        // setToastStatus(true)
                        setNewNode("")
                    }}  
                    >Add</ButtonMd>
                </div>

                <div className="h-[72vh] overflow-y-scroll">
                    {categoriesData?.skillCategories
                    .filter(category => {return category.name.toLowerCase().includes(search.toLowerCase())})
                    .map((category,index) => {
                        return <CategoryCardMd category={category} key={index} onClick={() => setSelected(category)}/>
                    })}
                </div>

            </div>

            <div className="p-4 w-4/6 rounded bg-white shadow relative h-[80vh] overflow-scroll">
                {selected?(
                    <ExploreCategory category={selected}/>
                ):(<TitleLg className="my-48 text-center">Select from the categories</TitleLg>)}
            </div>
        </>
    )

}