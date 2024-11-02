import { GraphQLObjectType } from "graphql";
import { postType } from "./types/posts.js";
import { CreatePostInput } from "./inputs/posts.js";
import { CreateUserInput } from "./inputs/users.js";
import { userType } from "./types/users.js";
import { profileType } from "./types/profiles.js";
import { CreateProfileInput } from "./inputs/profiles.js";

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
    createUser: {
      type: userType,
      args: { dto: { type: CreateUserInput}},
        resolve: async (_, args, context) => {
          return await context.user.create({
            data: args.dto,
          });
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
    }
  }});