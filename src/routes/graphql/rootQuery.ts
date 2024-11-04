import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { userType } from "./types/users.js";
import { UUIDType } from "./types/uuid.js";
import { memberTypeType, MemberTypeIdType } from "./types/member-types.js";
import { postType } from "./types/posts.js";
import { profileType } from "./types/profiles.js";
import { GraphQLContext } from "./types/context.js";
import { parseResolveInfo, ResolveTree, simplifyParsedResolveInfoFragmentWithType } from "graphql-parse-resolve-info";

export const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    users: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(userType))),
      resolve: async(_, __, context: GraphQLContext, resolveInfo ) => {
        const parsedResolveInfoFragment = parseResolveInfo(resolveInfo) as ResolveTree;
        const { fields } = simplifyParsedResolveInfoFragmentWithType(
          parsedResolveInfoFragment,
          userType,
        );
        const include = {
          userSubscribedTo: 'userSubscribedTo' in fields,
          subscribedToUser: 'subscribedToUser' in fields
        };
        const users = await context.prisma.user.findMany({ include });
        
        users.forEach((user) => {
          if (include.userSubscribedTo) {
            const authors = users.filter((item) =>  item.userSubscribedTo.some((subscriber) => subscriber.authorId === user.id));
            context.dataLoader.userSubscribedTo.prime(user.id, authors);
          }
          if (include.subscribedToUser) {
            const subscribers = users.filter((item) =>  item.subscribedToUser.some((subscriber) => subscriber.subscriberId === user.id));
            context.dataLoader.userSubscribedTo.prime(user.id, subscribers);
          }
        });
        return users;
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
        const memberTypes = await context.prisma.memberType.findMany();
        memberTypes.forEach((memberType) => context.dataLoader.memberTypes.prime(memberType.id, memberType));
        return memberTypes;
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
        const posts = await context.prisma.post.findMany();
        posts.forEach((post) => context.dataLoader.posts.prime(post.id, [post]));
        return posts;
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
        const profiles = await context.prisma.profile.findMany();
        profiles.forEach((profile) => context.dataLoader.profiles.prime(profile.id, profile));
        return profiles;
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