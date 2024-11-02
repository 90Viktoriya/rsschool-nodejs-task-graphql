import { GraphQLBoolean, GraphQLInt, GraphQLObjectType } from "graphql";
import { UUIDType } from "./uuid.js";
import { memberTypeType } from "./member-types.js";

export const profileType = new GraphQLObjectType({ 
  name: 'Profile',
  fields: () => ({
    id: {
      type: UUIDType,
    },
    isMale: {
      type: GraphQLBoolean
    },
    yearOfBirth: {
      type: GraphQLInt
    },
    userId: {
      type: UUIDType
    },
    memberType: {
      type: memberTypeType,
      resolve: async (parent, _, context) => {
        return await context.memberType.findUnique({
          where: {
            id: parent.memberTypeId,
          },
        })
      }
    },
  })});
