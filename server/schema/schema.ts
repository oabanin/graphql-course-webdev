import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
} from 'graphql'


import Directors from "../models/director";
import Movies from "../models/movie";


interface TMovie {
    id: string | number;
    name: string;
    "genre": string;
    "directorId": string | number;
}

interface TDirector {
    id: string | number;
    name: string;
    age: number;
}


const MovieType = new GraphQLObjectType({
    name: "TMovie",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        director: {
            type: DirectorType,
            resolve(parent: TMovie) {
                return Directors.findById(parent.directorId);
            }
        }
    })
})

const DirectorType: GraphQLObjectType<TDirector> = new GraphQLObjectType({
    name: "TDirector",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent: TDirector) {
                return Movies.find({directorId: parent.id})
            }
        }
    }),

})

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            movie: {
                type: MovieType,
                args: {id: {type: GraphQLID}},
                resolve(parent: TMovie, args: { id: string }) {
                    return Movies.findById(args.id);
                }
            },
            director: {
                type: DirectorType,
                args: {id: {type: GraphQLID}},
                resolve(parent: TMovie, args: { id: string }) {
                    return Movies.findById(args.id);
                }
            },
            movies: {
                type: new GraphQLList(MovieType), resolve() {
                    return Movies.find({})
                }
            },
            directors: {
                type: new GraphQLList(DirectorType), resolve() {
                    return Directors.find({})
                }
            }
        },
    }),
});

export default schema;