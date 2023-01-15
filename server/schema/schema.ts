import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull, GraphQLBoolean
} from 'graphql'


import Directors from "../models/director";
import Movies from "../models/movie";

interface TMovie {
    id: string | number;
    name: string;
    "genre": string;
    "directorId": string | number;
    watched: boolean;
    rating: number;
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
        name: {type: new GraphQLNonNull(GraphQLString)},
        genre: {type: new GraphQLNonNull(GraphQLString)},
        rating: {type: GraphQLInt},
        watched: {type: new GraphQLNonNull(GraphQLBoolean)},
        director: {
            type: DirectorType,
            resolve({directorId}: TMovie) {
                return Directors.findById(directorId);
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
            resolve({id}: TDirector) {
                return Movies.find({directorId: id})
            }
        }
    }),

})

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addDirector: {
            type: DirectorType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent, {name, age}) {
                const director = new Directors({name, age});
                return director.save()
            }
        },
        addMovie: {
            type: MovieType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                genre: {type: new GraphQLNonNull(GraphQLString)},
                directorId: {type: GraphQLID},
                rating: {type: GraphQLInt},
                watched: {type: new GraphQLNonNull(GraphQLBoolean)},
            },
            resolve(parent, {name, genre, directorId, rating, watched}) {
                const movieDoc: Partial<TMovie> = {
                    name,
                    genre,
                    directorId,
                    rating,
                    watched
                };
                const movie = new Movies(movieDoc);
                return movie.save()
            }
        },
        deleteDirector: {
            type: DirectorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, {id}) {
                return Directors.findByIdAndRemove(id)
            }
        },
        deleteMovie: {
            type: MovieType,
            args: {id: {type: GraphQLID}},
            resolve(parent, {id}) {
                return Movies.findByIdAndRemove(id)
            }
        },
        updateDirector: {
            type: DirectorType,
            args: {
                id: {type: GraphQLID},
                name: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent, {id, name, age}) {
                return Directors.findByIdAndUpdate(id,
                    {
                        $set: {
                            name,
                            age
                        }
                    }, {new: true});
            }
        },
        updateMovie: {
            type: MovieType,
            args: {
                id: {type: GraphQLID},
                name: {type: new GraphQLNonNull(GraphQLString)},
                genre: {type: new GraphQLNonNull(GraphQLString)},
                directorId: {type: GraphQLID},
                rating: {type: GraphQLInt},
                watched: {type: new GraphQLNonNull(GraphQLBoolean)},
            },
            resolve(parent, {id, name, genre, directorId, rating, watched}) {
                return Movies.findByIdAndUpdate(id,
                    {
                        $set: {
                            name: new GraphQLNonNull(name),
                            genre: new GraphQLNonNull(genre),
                            directorId,
                            rating,
                            watched: new GraphQLNonNull(watched)
                        }
                    }, {new: true});
            }
        },
    }
})

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        movie: {
            type: MovieType,
            args: {id: {type: GraphQLID}},
            resolve(parent: TMovie, {id}: { id: string }) {
                return Movies.findById(id);
            }
        },
        director: {
            type: DirectorType,
            args: {id: {type: GraphQLID}},
            resolve(parent: TMovie, {id}: { id: string }) {
                return Movies.findById(id);
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
})

const schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation
});

export default schema;