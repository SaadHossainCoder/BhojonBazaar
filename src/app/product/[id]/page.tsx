import { products } from "@/lib/data";
import type { Product } from "@/lib/data";
import ProductClient from "@/components/ProductClient";

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const product = getProductById(id);

  return <ProductClient product={product} />;
}
