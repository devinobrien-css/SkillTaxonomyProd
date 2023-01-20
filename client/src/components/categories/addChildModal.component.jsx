import { useMutation, useQuery } from "@apollo/client"
import { useState } from "react"
import { AttachParentCategory, GetCategories } from "../../apollo/categories.mjs"
import { ButtonMd, SearchSelect, SubTitle, TitleMd, TitleSm } from "../component.library"
import { Icon } from '@iconify/react';

export const AddChildModal = ({category}) => {
    const [selectedChild,setSelected] = useState()
    const {data:categoryData} = useQuery(GetCategories)
    const [attachParent,{data,loading}] = useMutation(AttachParentCategory)

    const onSubmit = async() => {
        await attachParent({
            variables:{
                where: {
                    name: selectedChild
                },
                connect: {
                    parentCategories: [
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
            <TitleSm>Select a Category</TitleSm>
            <SearchSelect 
                options={categoryData?.skillCategories.filter(skillCategory => skillCategory.name !== category.name).map(category => {return category.name})}
                setSelected={setSelected}
            />

            <br/>
            <br/>

            {selectedChild?(
                <>
                    <TitleSm>Confirm Selection</TitleSm>
                    <SubTitle>Attach category <span className="font-bold">{selectedChild}</span> to parent <span className="font-bold">{category.name}</span>?</SubTitle>
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
            ):(
                <>
                </>
            )}  
        </div>
    )
}