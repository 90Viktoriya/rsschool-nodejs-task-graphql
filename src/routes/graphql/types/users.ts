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
      args: {
        id: {
          type: UUIDType,
        },
      },
      resolve: async (_, args, context) => {
        return await context.post.findMany({
          where: {
            authorId: args.id,
          },
        });
      },
    },
    profiles: {
      type: profileType,
      args: {
        id: {
          type: UUIDType,
        },
      },
      resolve: async (_, args, context) => {
        return await context.profile.findUnique({
          where: {
            userId: args.id,
          },
        });
      }
    },
    subscribedToUser: {
      type: profileType,
      args: {
        id: {
          type: UUIDType,
        },
      },
      resolve: async (_, args, context) => {
        return await context.user.findMany({
          where: {
            userSubscribedTo: {
              some: {
                authorId: args.id,
              },
            },
          },
        })
      }
    },
    userSubscribedTo: {
      type: profileType,
      args: {
        id: {
          type: UUIDType,
        },
      },
      resolve: async (_, args, context) => {
        return await context.user.findMany({
          where: {
            subscribedToUser: {
              some: {
                subscriberId: args.id,
              },
            },
          },
        })
      }
    },
  })});
