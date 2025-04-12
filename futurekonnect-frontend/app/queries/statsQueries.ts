import { gql } from '@apollo/client';

export const GET_STATS = gql`
  query GetStats {
    data_exchanged(limit: 1, order_by: { date: desc }) {
      total_data
    }
    fleets_aggregate {
      aggregate {
        count
      }
    }
    total_hotspot_users: hotspot_users_aggregate {
      aggregate {
        count
      }
    }
    active_hotspot_users: hotspot_users_aggregate(
      where: { is_active: { _eq: true } }
    ) {
      aggregate {
        count
      }
    }
    total_routers: routers_aggregate {
      aggregate {
        count
      }
    }
    online_routers: routers_aggregate(where: { is_online: { _eq: true } }) {
      aggregate {
        count
      }
    }
  }
`; 