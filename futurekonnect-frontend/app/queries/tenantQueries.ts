import { gql } from '@apollo/client';

export const GET_TOTAL_TENANTS = gql`
  query GetTotalTenants {
    tenants {
      name
    }
  }
`;

export const GET_WEEKLY_DATA_USAGE = gql`
  query GetWeeklyDataUsage($startDate: date!, $searchTerm: String) {
    tenants(
      where: {
        _and: [
          { date: { _gte: $startDate } }
          { name: { _ilike: $searchTerm } }
        ]
      }
      order_by: { date: asc }
    ) {
      date
      data_usage
      name
    }
  }
`;

export const GET_TENANT_DATA_USAGE = gql`
  query GetTenantDataUsage($startDate: date!, $searchTerm: String) {
    tenants(
      where: {
        _and: [
          { date: { _gte: $startDate } }
          { name: { _ilike: $searchTerm } }
        ]
      }
    ) {
      name
      data_usage
    }
  }
`; 