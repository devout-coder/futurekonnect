import { gql } from '@apollo/client';

// Helper function to get date string for X days ago
const getDateString = (daysAgo: number) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split('T')[0];
};

export const GET_WEEKLY_DATA_USAGE = gql`
  query GetWeeklyDataUsage($startDate: date!) {
    tenants(
      where: {
        date: {
          _gte: $startDate
        }
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
  query GetTenantDataUsage($startDate: date!) {
    tenants(
      where: {
        date: {
          _gte: $startDate
        }
      }
      order_by: { date: desc, name: asc }
    ) {
      name
      data_usage
      date
    }
  }
`; 