import { Icon } from '@iconify/react';

export const Addbutton = ({children,...rest}) => {

    return (
        <div className={`text-font-dark group flex relative w-min cursor-pointer z-20`} {...rest}>
            <Icon icon={"material-symbols:add-box-outline-rounded"} width={40} />
            <p className={`w-0 bg-white overflow-hidden group-hover:w-max group-hover:p-1 rounded transition-all absolute left-full top-1 p-0 shadow`}>Add</p>
        </div>
    )
}

export const SkillCardSm = ({skill,className,...rest}) => {
    return (
        <div className={`bg-white p-2 rounded my-2 cursor-pointer border transform transition-all hover:scale-105 ${className}`} {...rest}>
            <p className="uppercase text-sm text-font-dark hover:shadow-3xl shadow-gray-900">{skill.name}</p>
        </div>
    )
}

export const SkillCardMd = ({skill,className,...rest}) => {
    return (
        <div className={`bg-white p-2 rounded my-2 cursor-pointer group border shadow ${className}`} {...rest}>
            <p className="uppercase text-2xl text-blue-400 hover:shadow-3xl shadow-gray-900 group-hover:font-bold transition-all">{skill.name}</p>
            
            <div className='border-l border-font-dark text-font-dark pl-2'>
                <p>{skill.inCategory.length} parent categories</p>
                <p>{skill.knownBy?.length} users attached</p>
            </div>
        </div>
    )
}

export const CategoryCardSm = ({category,className,...rest}) => {
    return (
        <div className={`bg-white p-2 rounded my-2 cursor-pointer border transform transition-all hover:scale-105 ${className}`} {...rest}>
            <p className="uppercase text-sm text-font-dark hover:shadow-3xl shadow-gray-900">{category.name}</p>
        </div>
    )
}

export const CategoryCardMd = ({category,className,...rest}) => {
    return (
        <div className={`bg-white p-2 rounded my-2 cursor-pointer group shadow ${className}`} {...rest}>
            <p className="uppercase text-2xl text-blue-500 hover:shadow-3xl shadow-gray-900 group-hover:font-bold transition-all">{category.name}</p>
            <div className='border-l border-font-dark text-font-dark pl-2'>
                <p>{category.parentCategories.length} parent categories</p>
                <p>{category.childCategories.length} sub-categories </p>
                <p>{category.childSkills.length} skills</p>
            </div>
        </div>
    )
}

export const UserCardSm = ({user,className,...rest}) => {
    return (
        <div className={`bg-white p-2 rounded my-2 cursor-pointer border transform transition-all hover:scale-105 ${className}`} {...rest}>
            <p className="uppercase text-sm text-font-dark hover:shadow-3xl shadow-gray-900">{user.name}</p>
        </div>
    )
}