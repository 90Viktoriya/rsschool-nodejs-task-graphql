import { GraphQLFloat, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { UUIDType } from "./uuid.js";
import { postType } from "./posts.js";
import { profileType } from "./profiles.js";

export const userType = new GraphQLObjectType({ 
  name: 'User',
  fields: () => ({
    id: {
      type: UUIDType,
    },
    name: {
      type: GraphQLString
    },
    balance: {
      type: GraphQLFloat
    },
    posts: {
      type: new GraphQLList(postType),
      resolve: async (parent, _, context) => {
        return await context.post.findMany({
          where: {
            authorId: parent.id,
          },
        });
      },
    },
    profile: {
      type: profileType,
      resolve: async (parent, _, context) => {
        return await context.profile.findUnique({
          where: {
            userId: parent.id,
          },
        });
      }
    },
    subscribedToUser: {
      type: new GraphQLList(userType),
      resolve: async (parent, _, context) => {
        return await context.user.findMany({
          where: {
            userSubscribedTo: {
              some: {
                authorId: parent.id,
              },
            },
          },
        })
      }
    },
    userSubscribedTo: {
      type: new GraphQLList(userType),
      args: {
        id: {
          type: UUIDType,
        },
      },
      resolve: async (parent, _, context) => {
        return await context.user.findMany({
          where: {
            subscribedToUser: {
              some: {
                subscriberId: parent.id,
              },
            },
          },
        })
      }
    },
  })});
