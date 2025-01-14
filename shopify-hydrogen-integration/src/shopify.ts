import { createStorefrontClient } from '@shopify/hydrogen-react';

import { formatGqlQuery, gql } from './graphql.ts';

export {
  CartProvider,
  ShopifyProvider,
  useCart,
} from '@shopify/hydrogen-react';

export const PUBLIC_STORE_FRONT_TOKEN = '7196653c836304958978e6a57060b265';
export const STORE_DOMAIN = 'demo-react-integrated-theme.myshopify.com';

const client = createStorefrontClient({
  publicStorefrontToken: PUBLIC_STORE_FRONT_TOKEN,
  // load environment variables according to your framework and runtime
  storeDomain: STORE_DOMAIN,
});

function gqlRequest(query: ReturnType<typeof gql>, variables?: any) {
  return fetch(client.getStorefrontApiUrl(), {
    body: JSON.stringify({
      query: formatGqlQuery(query),
      variables,
    }),
    headers: Object.assign(client.getPublicTokenHeaders(), {
      'Content-Type': 'application/json',
    }),
    method: 'POST',
  }).then(async res => {
    return res.json();
  });
}

const ListProductsQuery = gql`
  query listProducts {
    products(first: 1) {
      nodes {
        id
        title
        description
        adjacentVariants {
          id
        }
        selectedOrFirstAvailableVariant {
          id
        }
        featuredImage {
          altText
          url
        }
      }
    }
  }
`;

export default {
  gqlRequest,
  ListProductsQuery,
};
