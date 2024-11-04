import { GraphQLFloat, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { UUIDType } from "./uuid.js";
import { postType } from "./posts.js";
import { profileType } from "./profiles.js";
import { GraphQLContext } from "./context.js";

export const userType = new GraphQLObjectType({ 
  name: 'User',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(UUIDType),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    balance: {
      type: new GraphQLNonNull(GraphQLFloat)
    },
    posts: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(postType))),
      resolve: async (parent, _, context: GraphQLContext) => {
        return await context.dataLoader.posts.load(parent.id);
      },
    },
    profile: {
      type: profileType,
      resolve: async (parent, _, context) => {
        return await context.dataLoader.profiles.load(parent.id);
      },
    },
    subscribedToUser: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(userType))),
      resolve: async (parent, _, context) => {
        return await context.dataLoader.subscribedToUser.load(parent.id);
      }
    },
    userSubscribedTo: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(userType))),
      args: {
        id: {
          type: UUIDType,
        },
      },
      resolve: async (parent, _, context) => {
        return await context.dataLoader.userSubscribedTo.load(parent.id);
      }
    },
  })});
