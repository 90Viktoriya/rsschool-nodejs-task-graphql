import { GraphQLBoolean, GraphQLInt, GraphQLInputObjectType, GraphQLObjectType, GraphQLString } from "graphql";
import { MemberTypeIdType } from "../types/member-types.js";
import { UUIDType } from "../types/uuid.js";

export const CreateProfileInput = new GraphQLInputObjectType({ 
  name: 'CreateProfileInput',
  fields: () => ({
    isMale: {
      type: GraphQLBoolean
    },
    yearOfBirth: {
      type: GraphQLInt
    },
    userId: {
      type: UUIDType
    },
    memberTypeId: {
      type: MemberTypeIdType
    },
  })});
