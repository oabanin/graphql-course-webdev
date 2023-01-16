import {gql} from "@apollo/client";

export const ADD_DIRECTOR = gql`mutation addDirector($name: String!, $age:Int!){
    addDirector(name: $name, age: $age){
        name
    }
}`