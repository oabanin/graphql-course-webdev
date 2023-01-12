const graphql = require('graphql');

const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList} = graphql;

interface TMovie {
    id: string | number;
    name: string;
    genre: string;
    directorId: string | number;
}

interface TDirector {
    id: string | number;
    name: string;
    age: number;
}

const movies = [
    {id: '1', name: "Film1", genre: "Porn", directorId: 3},
    {id: '2', name: "Film2", genre: "Comedy", directorId: 2},
    {id: 3, name: "Film3", genre: "Thriller", directorId: 1},
    {id: 4, name: "Film4", genre: "History", directorId: 4},
    {id: '5', name: "Film5", genre: "Porn", directorId: 3},
    {id: '6', name: "Film6", genre: "Porn", directorId: 3},
    {id: 7, name: "Film7", genre: "History", directorId: 2},
    {id: 8, name: "Film7", genre: "History", directorId: 1},
]

const directors = [
    {id: '1', name: "Quentin Tarantion", age: 55},
    {id: '2', name: "Michel", age: 44},
    {id: 3, name: "Lara", age: 33},
    {id: 4, name: "Bengamon", age: 22}
]


const MovieType = new GraphQLObjectType({
    name: "TMovie",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        director: {
            type: DirectorType, resolve(parent: TMovie) {
                return directors.find(director => director.id == parent.id)
            }
        }
    })
})

const DirectorType = new GraphQLObjectType({
    name: "TDirector",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
    })
})

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            movie: {
                type: MovieType,
                args: {id: {type: GraphQLID}},
                resolve(parent: any, args: { id: string }) {
                    return movies.find(movie => movie.id == args.id)
                }
            },
            director: {
                type: DirectorType,
                args: {id: {type: GraphQLID}},
                resolve(parent: any, args: { id: string }) {
                    return directors.find(director => director.id == args.id)
                }
            },
            movies: {
                type: new GraphQLList(MovieType), resolve() {
                    return movies;
                }
            },
            directors: {
                type: new GraphQLList(DirectorType), resolve() {
                    return directors;
                }
            }
        },
    }),
});


module.exports = schema