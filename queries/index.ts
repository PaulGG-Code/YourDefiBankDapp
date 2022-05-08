import { gql } from "graphql-request"

export const GET_LAST_TRANSFERS = gql`
{
  transfers(first: 5, orderBy: timestamp, orderDirection: desc) {
    from
    to
    amount
    timestamp
  }
}
`
