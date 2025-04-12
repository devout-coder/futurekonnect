import { gql } from '@apollo/client';

export const GET_AUDIT_TRAIL = gql`
  query GetAuditTrail($where: audit_trail_bool_exp) {
    audit_trail(where: $where, order_by: {time: desc}) {
      id
      time
      description
      event
      category
      performed_by
    }
  }
`; 