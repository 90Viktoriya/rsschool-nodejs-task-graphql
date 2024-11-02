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

export const ChangeProfileInput = new GraphQLInputObjectType({ 
  name: 'ChangeProfileInput',
  fields: () => ({
    isMale: {
      type: GraphQLBoolean
    },
    yearOfBirth: {
      type: GraphQLInt
    },
    memberTypeId: {
      type: MemberTypeIdType
  },
})});