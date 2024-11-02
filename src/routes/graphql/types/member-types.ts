import { GraphQLEnumType, GraphQLFloat, GraphQLInt, GraphQLObjectType } from "graphql";

export const MemberTypeIdType = new GraphQLEnumType( {
  name: 'MemberTypeId',
  values:  {
    BASIC: { value: 'BASIC' },
    BUSINESS: { value: 'BUSINESS' }
  }
}) 
export const memberTypeType = new GraphQLObjectType({ 
  name: 'MemberType',
  fields: () => ({
    id: {
      type: MemberTypeIdType,
    },
    discount: {
      type: GraphQLFloat
    },
    postsLimitPerMonth: {
      type: GraphQLInt
    }
  })});
