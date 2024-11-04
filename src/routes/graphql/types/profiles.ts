import { GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { UUIDType } from "./uuid.js";
import { memberTypeType } from "./member-types.js";
import { GraphQLContext } from "./context.js";

export const profileType = new GraphQLObjectType({ 
  name: 'Profile',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(UUIDType),
    },
    isMale: {
      type: new GraphQLNonNull(GraphQLBoolean)
    },
    yearOfBirth: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    userId: {
      type: UUIDType
    },
    memberType: {
      type: new GraphQLNonNull(memberTypeType),
      resolve: async (parent, _, context: GraphQLContext) => {
        return await context.dataLoader.memberTypes.load(parent.memberTypeId);
      }
    },
  })});
