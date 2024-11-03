import { PrismaClient } from "@prisma/client";
import DataLoader from "dataloader";

export function createLoaders(prisma: PrismaClient) {
  return {
    posts: new DataLoader( async (authorIds: readonly string[]) => {
      const posts = await prisma.post.findMany({where: {
        authorId: { in: authorIds as string[] },
      }});
      return authorIds.map((authorId) => posts.filter((post) => post.authorId === authorId));
    }),
    profiles: new DataLoader( async (userIds: readonly string[]) => {
      const profiles = await prisma.profile.findMany({where: {
        userId: { in: userIds as string[] },
      }});
      return userIds.map((userId) => profiles.find((profile) => profile.userId === userId));
    }),
    memberTypes: new DataLoader( async (memberTypesIds: readonly string[]) => {
      const memberTypes = await prisma.memberType.findMany({where: {
        id: { in: memberTypesIds as string[] },
      }});
      return memberTypesIds.map((memberTypesId) => memberTypes.find((memberType) => memberType.id === memberTypesId));
    }),
    users: new DataLoader( async (userIds: readonly string[]) => {
      const users = await prisma.user.findMany({
        where: {
          id: { in: userIds as string[] },
        },
        include: {
          userSubscribedTo: true,
          subscribedToUser: true,
        }
      });
      return userIds.map((userId) => users.find((user) => user.id === userId));
    }),
    userSubscribedTo: new DataLoader( async (userIds: readonly string[]) => {
      const users = await prisma.user.findMany({
        where: {
          subscribedToUser: {
            some: {
              subscriberId: { in: userIds as string[] },
            },
          },
        },
      });
      return userIds.map(() => users);
    }),
    subscribedToUser: new DataLoader( async (userIds: readonly string[]) => {
      const users = await prisma.user.findMany({
        where: {
          userSubscribedTo: {
            some: {
              authorId: { in: userIds as string[] },
            },
          },
        },
      });
      return userIds.map(() => users);
    })

  };
}