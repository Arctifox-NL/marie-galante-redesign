import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import {
  STOREFRONT_PRODUCTS_QUERY,
  storefrontApiRequest,
  type ShopifyProduct,
} from "@/lib/shopify";
import hero from "@/assets/photos/marie-galante-zeilend.jpg";

export const Route = createFileRoute("/shop")({
  component: ShopPage,
  head: () => ({
    meta: [
      { title: "Shop · Marie Galante" },
      {
        name: "description",
        content:
          "Tickets voor dagtochten en merchandise van de historische zeillogger Marie Galante.",
      },
      { property: "og:title", content: "Shop · Marie Galante" },
    ],
  }),
});

function ShopPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["shopify-products"],
    queryFn: async () => {
      const res = await storefrontApiRequest(STOREFRONT_PRODUCTS_QUERY, { first: 50 });
      return (res?.data?.products?.edges ?? []) as ShopifyProduct[];
    },
  });

  return (
    <SiteLayout>
      <section className="relative h-[50vh] min-h-[360px] w-full overflow-hidden">
        <img src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-primary/55" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-16 md:px-10 md:pb-24">
          <div className="eyebrow text-background/70">Shop</div>
          <h1 className="mt-3 max-w-3xl font-display text-5xl text-background md:text-7xl">
            Tickets &amp; merchandise
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        {isLoading && (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-foreground/50" />
          </div>
        )}

        {error && (
          <p className="py-20 text-center text-destructive">
            Producten konden niet geladen worden.
          </p>
        )}

        {!isLoading && !error && data && data.length === 0 && (
          <div className="py-20 text-center">
            <p className="font-display text-2xl text-foreground/80">Nog geen producten</p>
            <p className="mt-3 text-foreground/60">
              Producten verschijnen hier zodra ze in de Shopify-shop zijn aangemaakt.
            </p>
          </div>
        )}

        {data && data.length > 0 && (
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((p) => (
              <Link
                key={p.node.id}
                to="/product/$handle"
                params={{ handle: p.node.handle }}
                className="group block"
              >
                <div className="aspect-square overflow-hidden bg-secondary/30">
                  {p.node.images.edges[0]?.node && (
                    <img
                      src={p.node.images.edges[0].node.url}
                      alt={p.node.images.edges[0].node.altText ?? p.node.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="mt-4 flex items-start justify-between gap-4">
                  <h3 className="font-display text-xl text-primary">{p.node.title}</h3>
                  <span className="whitespace-nowrap font-display text-lg text-foreground">
                    {p.node.priceRange.minVariantPrice.currencyCode}{" "}
                    {parseFloat(p.node.priceRange.minVariantPrice.amount).toFixed(2)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}