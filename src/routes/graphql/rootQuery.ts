import { GraphQLList, GraphQLObjectType } from "graphql";
import { userType } from "./types/users.js";
import { UUIDType } from "./types/uuid.js";
import { memberTypeType, MemberTypeIdType } from "./types/member-types.js";
import { postType } from "./types/posts.js";
import { profileType } from "./types/profiles.js";

export const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    users: {
      type: new GraphQLList(userType),
      resolve: async(_, __, context) => {
        return await context.user.findMany();
      }
    },
    user: {
      type: userType, 
      args: { id: { type: UUIDType } }, 
      resolve: async(_, args, context) => {
        return await context.user.findUnique({
          where: {
            id: args.id,
          },
        });
      }
    },
   memberTypes: {
      type: new GraphQLList(memberTypeType),
      resolve: async(_, __, context) => {
        return await context.memberType.findMany();
      }
    },
    memberType: {
      type: memberTypeType,
      args: { id: { type: MemberTypeIdType } }, 
      resolve: async(_, args, context) => {
        return await context.memberType.findUnique({
          where: {
            id: args.id,
          },
        })
      }
    },
    posts: {
      type: new GraphQLList(postType),
      resolve: async(_, __, context) => {
        return await context.post.findMany();
      }
    },
    post: {
      type: postType,
      args: { id: { type: UUIDType } }, 
      resolve: async(_, args, context) => {
        return await context.post.findUnique({
          where: {
            id: args.id,
          },
        })
      }
    },
    profiles: {
      type: new GraphQLList(profileType),
      resolve: async(_, __, context) => {
        return await context.profile.findMany();
      }
    },
    profile: {
      type: profileType,
      args: { id: { type: UUIDType } }, 
      resolve: async(_, args, context) => {
        return await context.profile.findUnique({
          where: {
            id: args.id,
          },
        })
      }
    },
  }});