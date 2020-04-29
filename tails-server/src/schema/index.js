import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
} from 'graphql'
import { PhysicalNamespace, PhysicalProject, TAILS_ERROR } from 'tails-fs'

let ProjectQuery = new GraphQLObjectType({
  name: 'ProjectQuery',
  fields: {
    name: { type: GraphQLString },
    isSymbolicLink: { type: GraphQLBoolean },
  },
})
let NamespaceQuery = new GraphQLObjectType({
  name: 'NamespaceQueryType',
  fields: {
    name: { type: GraphQLString },
    isSymbolicLink: { type: GraphQLBoolean },
  },
})

export const rootSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'the root query',
    fields: {
      main: {
        type: GraphQLString,
        resolve: () => 'main string thingy to test',
      },
      namespaces: {
        type: new GraphQLList(NamespaceQuery),
        async resolve(parent, args) {
          let physicalNamespaces = await PhysicalNamespace.list()
          return physicalNamespaces.namespaces
        },
      },
      projects: {
        type: new GraphQLList(ProjectQuery),
        async resolve(parent, args) {
          let physicalProjects = await PhysicalProject.list()
          return physicalProjects
        },
      },
    },
  }),
})
