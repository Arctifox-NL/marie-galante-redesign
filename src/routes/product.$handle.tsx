import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import SiteLayout from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { fetchProductByHandle, formatPrice } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

export const Route = createFileRoute("/product/$handle")({
  component: ProductPage,
  head: ({ params }) => ({
    meta: [
      { title: `${params.handle} · Shop · Marie Galante` },
      { name: "description", content: "Bekijk dit product in onze webshop." },
    ],
  }),
});

function ProductPage() {
  const { handle } = Route.useParams();
  const { data: product, isLoading, error } = useQuery({
    queryKey: ["product", handle],
    queryFn: () => fetchProductByHandle(handle),
  });
  const addItem = useCartStore((s) => s.addItem);
  const cartLoading = useCartStore((s) => s.isLoading);
  const [variantIdx, setVariantIdx] = useState(0);

  if (isLoading) {
    return (
      <SiteLayout>
        <div className="flex min-h-[60vh] items-center justify-center pt-32">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </SiteLayout>
    );
  }

  if (error || !product) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-3xl px-6 py-32 text-center">
          <h1 className="font-display text-4xl text-primary">Product niet gevonden</h1>
          <p className="mt-4 text-foreground/70">Dit product bestaat niet of is verwijderd.</p>
          <Link to="/shop" className="mt-8 inline-block text-accent hover:underline">
            ← terug naar de shop
          </Link>
        </div>
      </SiteLayout>
    );
  }

  const variants = product.variants.edges.map((e) => e.node);
  const variant = variants[variantIdx];
  const image = product.images.edges[0]?.node;

  const handleAdd = async () => {
    if (!variant) return;
    await addItem({
      product: { node: product },
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Toegevoegd aan mandje", {
      description: product.title,
      position: "top-center",
    });
  };

  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-6 pt-32 pb-24 md:px-10">
        <Link to="/shop" className="text-xs uppercase tracking-[0.25em] text-foreground/60 hover:text-accent">
          ← terug naar de shop
        </Link>
        <div className="mt-8 grid gap-12 md:grid-cols-2">
          <div className="aspect-square overflow-hidden bg-secondary/30">
            {image && (
              <img
                src={image.url}
                alt={image.altText ?? product.title}
                className="h-full w-full object-cover"
              />
            )}
          </div>
          <div>
            <h1 className="font-display text-4xl text-primary md:text-5xl">{product.title}</h1>
            <p className="mt-6 font-display text-2xl text-foreground">
              {variant && formatPrice(variant.price.amount, variant.price.currencyCode)}
            </p>
            {product.description && (
              <p className="mt-6 whitespace-pre-line text-base leading-relaxed text-foreground/80">
                {product.description}
              </p>
            )}
            {variants.length > 1 && (
              <div className="mt-8">
                <div className="eyebrow mb-3">Variant</div>
                <div className="flex flex-wrap gap-2">
                  {variants.map((v, i) => (
                    <button
                      key={v.id}
                      onClick={() => setVariantIdx(i)}
                      className={`border px-4 py-2 text-sm transition-colors ${
                        i === variantIdx
                          ? "border-accent bg-accent text-accent-foreground"
                          : "border-foreground/20 hover:border-accent"
                      }`}
                    >
                      {v.title}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <Button
              onClick={handleAdd}
              disabled={cartLoading || !variant?.availableForSale}
              size="lg"
              className="mt-10 bg-accent text-accent-foreground hover:bg-accent/90"
            >
              {cartLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : variant?.availableForSale ? (
                "In mandje"
              ) : (
                "Uitverkocht"
              )}
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}