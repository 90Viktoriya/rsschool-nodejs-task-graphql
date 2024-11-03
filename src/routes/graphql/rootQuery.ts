import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { userType } from "./types/users.js";
import { UUIDType } from "./types/uuid.js";
import { memberTypeType, MemberTypeIdType } from "./types/member-types.js";
import { postType } from "./types/posts.js";
import { profileType } from "./types/profiles.js";
import { GraphQLContext } from "./types/context.js";
import { parseResolveInfo } from "graphql-parse-resolve-info";

export const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    users: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(userType))),
      resolve: async(_, __, context: GraphQLContext, resolveInfo ) => {
        const parsedResolveInfoFragment = parseResolveInfo(resolveInfo);
        const fields = parsedResolveInfoFragment?.fieldsByTypeName.userType;
        const include = {
          userSubscribedTo: !!fields && 'userSubscribedTo' in fields,
          subscribedToUser: !!fields && 'subscribedToUser' in fields
        };
        return await context.prisma.user.findMany({ include });
        /*const users = await context.prisma.user.findMany({ include });
        users.forEach((user) => context.dataLoader.users.prime(user.id, user));
        return users;*/
      }
    },
    user: {
      type: userType, 
      args: { id: { type: new GraphQLNonNull(UUIDType) } }, 
      resolve: async(_, args, context) => {
        return await context.dataLoader.users.load(args.id);
      }
    },
   memberTypes: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(memberTypeType))),
      resolve: async(_, __, context) => {
        return await context.prisma.memberType.findMany();
       /* const memberTypes = await context.prisma.memberType.findMany();
        memberTypes.forEach((memberType) => context.dataLoader.memberTypes.prime(memberType.id, memberType));
        return memberTypes;*/
      }
    },
    memberType: {
      type: memberTypeType,
      args: { id: { type: new GraphQLNonNull(MemberTypeIdType) } }, 
      resolve: async(_, args, context) => {
        return await context.prisma.memberType.findUnique({
          where: {
            id: args.id,
          },
        })
      }
    },
    posts: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(postType))),
      resolve: async(_, __, context) => {
        return await context.prisma.post.findMany();
        /*const posts = await context.prisma.post.findMany();
        posts.forEach((post) => context.dataLoader.posts.prime(post.id, post));
        return posts;*/
      }
    },
    post: {
      type: postType,
      args: { id: { type: new GraphQLNonNull(UUIDType) } }, 
      resolve: async(_, args, context) => {
        return await context.prisma.post.findUnique({
          where: {
            id: args.id,
          },
        })
      }
    },
    profiles: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(profileType))),
      resolve: async(_, __, context) => {
        return await context.prisma.profile.findMany();
        /*const profiles = await context.prisma.profile.findMany();
        profiles.forEach((profile) => context.dataLoader.profiles.prime(profile.id, profile));
        return profiles;*/
      }
    },
    profile: {
      type: profileType,
      args: { id: { type: new GraphQLNonNull(UUIDType) } }, 
      resolve: async(_, args, context) => {
        return await context.prisma.profile.findUnique({
          where: {
            id: args.id,
          },
        })
      }
    },
  }});