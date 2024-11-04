import { GraphQLObjectType, GraphQLString } from "graphql";
import { postType } from "./types/posts.js";
import { ChangePostInput, CreatePostInput } from "./inputs/posts.js";
import { ChangeUserInput, CreateUserInput } from "./inputs/users.js";
import { userType } from "./types/users.js";
import { profileType } from "./types/profiles.js";
import { ChangeProfileInput, CreateProfileInput } from "./inputs/profiles.js";
import { UUIDType } from "./types/uuid.js";
import { GraphQLContext } from "./types/context.js";

export const Mutations = new GraphQLObjectType({
  name: "Mutations",
  fields: {
    createPost: {
      type: postType,
      args: { dto: { type: CreatePostInput}},
        resolve: async (_, args, context: GraphQLContext) => {
          return await context.prisma.post.create({
            data: args.dto,
          })
        }
    },
    deletePost: {
      type: GraphQLString,
      args: { id: { type: UUIDType}},
      resolve: async (_, args, context) => {
        await context.prisma.post.delete({
          where: {
            id: args.id,
          },
        });
        return '204: success'
      }
    },
    changePost : {
      type: postType,
      args: { 
        id: { type: UUIDType},
        dto: { type: ChangePostInput}
      },
      resolve: async(_, args, context) => {
        return await context.prisma.post.update({
          where: { id: args.id },
          data: args.dto,
        });
      }
    },
    createUser: {
      type: userType,
      args: { dto: { type: CreateUserInput}},
        resolve: async (_, args, context) => {
          return await context.prisma.user.create({
            data: args.dto,
          });
        }
    },
    deleteUser: {
      type: GraphQLString,
      args: { id: { type: UUIDType}},
      resolve: async (_, args, context) => {
        await context.prisma.user.delete({
          where: {
            id: args.id,
          },
        });
        return '204: success'
      }
    },
    changeUser : {
      type: userType,
      args: { 
        id: { type: UUIDType},
        dto: { type: ChangeUserInput}
      },
      resolve: async(_, args, context) => {
        return await context.prisma.user.update({
          where: { id: args.id },
          data: args.dto,
        });
      }
    },
    createProfile: {
      type: profileType,
      args: { dto: { type: CreateProfileInput}},
        resolve: async (_, args, context) => {
          return await context.prisma.profile.create({
            data: args.dto,
          });
        }
    },
    deleteProfile: {
      type: GraphQLString,
      args: { id: { type: UUIDType}},
      resolve: async (_, args, context) => {
        await context.prisma.profile.delete({
          where: {
            id: args.id,
          },
        });
        return '204: success'
      }
    },
    changeProfile : {
      type: postType,
      args: { 
        id: { type: UUIDType},
        dto: { type: ChangeProfileInput}
      },
      resolve: async(_, args, context) => {
        return await context.prisma.profile.update({
          where: { id: args.id },
          data: args.dto,
        });
      }
    },
    subscribeTo: {
      type: GraphQLString,
      args: { 
        userId: { type: UUIDType},
        authorId: { type: UUIDType}
      },
      resolve: async(_, args, context) => {
        await context.prisma.subscribersOnAuthors.create({
          data: {
            subscriberId: args.userId,
            authorId: args.authorId,
          },
        });
        
        return '204 success'
      }
    },
    unsubscribeFrom: {
      type: GraphQLString,
      args: { 
        userId: { type: UUIDType},
        authorId: { type: UUIDType}
      },
      resolve: async(_, args, context) => {
        await context.prisma.subscribersOnAuthors.delete({
          where: {
            subscriberId_authorId: {
              subscriberId: args.userId,
              authorId: args.authorId,
            },
          },
        });
        
        return '204 success'
      }
    },
  }});