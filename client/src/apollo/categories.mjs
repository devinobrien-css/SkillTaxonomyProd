import { gql } from "@apollo/client";


export const GetCategories = gql`
    query GetCategories($where: SkillCategoryWhere) {
        skillCategories(where: $where) {
            childCategories {
                name
            }
            parentCategories {
                name
            }
            childSkills {
                name
            }
            name
        }
    }
`

export const AttachParentCategory = gql`
    mutation AttachParentCategory($where: SkillCategoryWhere, $connect: SkillCategoryConnectInput) {
        updateSkillCategories(where: $where, connect: $connect) {
            skillCategories {
                name
            }
        }
    }
`

export const AddCategory = gql`
    mutation CreateSkillCategories($input: [SkillCategoryCreateInput!]!) {
        createSkillCategories(input: $input) {
            skillCategories {
                name
            }
        }
    }
`

export const GetCategoryCousins = gql`
    query GetCategoryCousins($categoryName: String!) {
        getCategoryCousins(categoryName: $categoryName) {
            name
        }
    }
`


export const RemoveChildCategory = gql`
    mutation RemoveChildCategory($where: SkillCategoryWhere, $disconnect: SkillCategoryDisconnectInput) {
        updateSkillCategories(where: $where, disconnect: $disconnect) {
            skillCategories {
                name
            }
        }
    }
`


export const GetSkillTree = gql`
    query Query {
        getSkillTree
    }
`