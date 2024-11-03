import { GraphQLEnumType, GraphQLFloat, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from "graphql";

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
      type: new GraphQLNonNull(MemberTypeIdType),
    },
    discount: {
      type: new GraphQLNonNull(GraphQLFloat)
    },
    postsLimitPerMonth: {
      type: new GraphQLNonNull(GraphQLInt)
    }
  })});
