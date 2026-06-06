import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import {
  STOREFRONT_PRODUCT_BY_HANDLE_QUERY,
  storefrontApiRequest,
} from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

export const Route = createFileRoute("/product/$handle")({
  component: ProductPage,
});

function ProductPage() {
  const { handle } = Route.useParams();
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);

  const { data: product, isLoading: loading } = useQuery({
    queryKey: ["shopify-product", handle],
    queryFn: async () => {
      const res = await storefrontApiRequest(STOREFRONT_PRODUCT_BY_HANDLE_QUERY, { handle });
      return res?.data?.product ?? null;
    },
  });

  const [variantIdx, setVariantIdx] = useState(0);
  const variants = product?.variants?.edges ?? [];
  const selected = variants[variantIdx]?.node;

  const productWrapper = useMemo(
    () => (product ? { node: product } : null),
    [product],
  );

  const handleAdd = async () => {
    if (!selected || !productWrapper) return;
    await addItem({
      product: productWrapper,
      variantId: selected.id,
      variantTitle: selected.title,
      price: selected.price,
      quantity: 1,
      selectedOptions: selected.selectedOptions || [],
    });
    toast.success("Toegevoegd aan winkelwagen", { position: "top-center" });
  };

  return (
    <SiteLayout>
      <div className="mx-auto max-w-6xl px-6 pt-32 pb-20 md:px-10">
        <Link to="/shop" className="text-xs uppercase tracking-[0.25em] text-foreground/60 hover:text-accent">
          ← Terug naar shop
        </Link>

        {loading && (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-foreground/50" />
          </div>
        )}

        {!loading && !product && (
          <p className="py-20 text-center text-foreground/70">Product niet gevonden.</p>
        )}

        {product && (
          <div className="mt-8 grid gap-12 md:grid-cols-2">
            <div className="aspect-square overflow-hidden bg-secondary/30">
              {product.images.edges[0]?.node && (
                <img
                  src={product.images.edges[0].node.url}
                  alt={product.images.edges[0].node.altText ?? product.title}
                  className="h-full w-full object-cover"
                />
              )}
            </div>
            <div>
              <h1 className="font-display text-4xl text-primary md:text-5xl">{product.title}</h1>
              {selected && (
                <p className="mt-4 font-display text-2xl text-foreground">
                  {selected.price.currencyCode} {parseFloat(selected.price.amount).toFixed(2)}
                </p>
              )}
              <p className="mt-6 leading-relaxed text-foreground/80 whitespace-pre-line">
                {product.description}
              </p>

              {variants.length > 1 && (
                <div className="mt-8">
                  <div className="eyebrow mb-3">Variant</div>
                  <div className="flex flex-wrap gap-2">
                    {variants.map((v: { node: { id: string; title: string } }, i: number) => (
                      <button
                        key={v.node.id}
                        onClick={() => setVariantIdx(i)}
                        className={`border px-4 py-2 text-xs uppercase tracking-[0.2em] transition-colors ${
                          i === variantIdx
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-foreground/30 text-foreground/70 hover:border-foreground"
                        }`}
                      >
                        {v.node.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <Button
                onClick={handleAdd}
                disabled={!selected || !selected.availableForSale || isLoading}
                className="mt-10"
                size="lg"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : selected && !selected.availableForSale ? (
                  "Uitverkocht"
                ) : (
                  "In winkelwagen"
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </SiteLayout>
  );
}