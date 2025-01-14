import {
  CartProvider,
  PUBLIC_STORE_FRONT_TOKEN,
  ShopifyProvider,
  STORE_DOMAIN,
  useCart,
} from '../../shopify.ts';

export function Product({ product }: { product: any }) {
  const { lines, linesAdd } = useCart();
  return (
    <li
      onClick={() => {
        linesAdd([
          { merchandiseId: product.selectedOrFirstAvailableVariant.id },
        ]);
      }}
    >
      {product.title} {lines?.length}
    </li>
  );
}

function CheckOutButton() {
  const { checkoutUrl, status } = useCart();

  if (status === 'uninitialized' || status !== 'idle') return null;
  return (
    <a href={checkoutUrl} rel="noreferrer" target={'_blank'}>
      Checkout
    </a>
  );
}

export default function ProductList({
  products,
}: {
  products: { nodes: any[] };
}) {
  console.log(products);
  return (
    <ShopifyProvider
      countryIsoCode="GB"
      languageIsoCode="EN"
      storeDomain={STORE_DOMAIN}
      storefrontApiVersion="2024-10"
      storefrontToken={PUBLIC_STORE_FRONT_TOKEN}
    >
      <CartProvider onLineAdd={() => console.log('line added')}>
        <ul>
          {products.nodes.map(product => (
            <Product key={product.id} product={product} />
          ))}
        </ul>
        <CheckOutButton />
      </CartProvider>
    </ShopifyProvider>
  );
}
