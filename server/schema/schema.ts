const graphql = require('graphql');

const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList} = graphql;

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

// const movies = [
//     { "name": "Film1", "genre": "Porn", "directorId": "63c089a030bb27bdf02b80e5"},
//     { "name": "Film2", "genre": "Comedy", "directorId": "63c089a030bb27bdf02b80e6"},
//     { "name": "Film3", "genre": "Thriller", "directorId": "63c089a030bb27bdf02b80e7"},
//     { "name": "Film4", "genre": "History", "directorId": "63c089a030bb27bdf02b80e8"},
//     { "name": "Film5", "genre": "Porn", "directorId": "63c089a030bb27bdf02b80e5"},
//     { "name": "Film6", "genre": "Porn", "directorId": "63c089a030bb27bdf02b80e5"},
//     { "name": "Film7", "genre": "History", "directorId": "63c089a030bb27bdf02b80e6"},
//     { "name": "Film7", "genre": "History", "directorId": "63c089a030bb27bdf02b80e8"},
// ]

// const directors = [
//     { "name": "Quentin Tarantion", age: 55}, //63c089a030bb27bdf02b80e5
//     { "name": "Michel", age: 44}, //63c089a030bb27bdf02b80e6
//     { "name": "Lara", age: 33}, //63c089a030bb27bdf02b80e7
//     { "name": "Bengamon", age: 22} //63c089a030bb27bdf02b80e8
// ]


const MovieType = new GraphQLObjectType({
    name: "TMovie",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        "genre": {type: GraphQLString},
        director: {
            type: DirectorType, resolve(parent: TMovie) {
                // return directors.find(director => director.id == parent.id)
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
                    // return movies.find(movie => movie.id == args.id)
                }
            },
            director: {
                type: DirectorType,
                args: {id: {type: GraphQLID}},
                resolve(parent: any, args: { id: string }) {
                    // return directors.find(director => director.id == args.id)
                }
            },
            movies: {
                type: new GraphQLList(MovieType), resolve() {
                    // return movies;
                }
            },
            directors: {
                type: new GraphQLList(DirectorType), resolve() {
                    // return directors;
                }
            }
        },
    }),
});


module.exports = schema