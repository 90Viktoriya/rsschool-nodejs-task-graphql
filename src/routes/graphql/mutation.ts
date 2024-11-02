import { GraphQLObjectType, GraphQLString } from "graphql";
import { postType } from "./types/posts.js";
import { CreatePostInput } from "./inputs/posts.js";
import { CreateUserInput } from "./inputs/users.js";
import { userType } from "./types/users.js";
import { profileType } from "./types/profiles.js";
import { CreateProfileInput } from "./inputs/profiles.js";
import { UUIDType } from "./types/uuid.js";

export const Mutations = new GraphQLObjectType({
  name: "Mutations",
  fields: {
    createPost: {
      type: postType,
      args: { dto: { type: CreatePostInput}},
        resolve: async (_, args, context) => {
          return await context.post.create({
            data: args.dto,
          })
        }
    },
    deletePost: {
      type: GraphQLString,
      args: { id: { type: UUIDType}},
      resolve: async (_, args, context) => {
        await context.post.delete({
          where: {
            id: args.id,
          },
        });
        return '204: success'
      }
    },
    createUser: {
      type: userType,
      args: { dto: { type: CreateUserInput}},
        resolve: async (_, args, context) => {
          return await context.user.create({
            data: args.dto,
          });
        }
    },
    deleteUser: {
      type: GraphQLString,
      args: { id: { type: UUIDType}},
      resolve: async (_, args, context) => {
        await context.user.delete({
          where: {
            id: args.id,
          },
        });
        return '204: success'
      }
    },
    createProfile: {
      type: profileType,
      args: { dto: { type: CreateProfileInput}},
        resolve: async (_, args, context) => {
          return await context.profile.create({
            data: args.dto,
          });
        }
    },
    deleteProfile: {
      type: GraphQLString,
      args: { id: { type: UUIDType}},
      resolve: async (_, args, context) => {
        await context.profile.delete({
          where: {
            id: args.id,
          },
        });
        return '204: success'
      }
    },
  }});