import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import { ProductCard } from "@/components/ProductCard";
import { fetchProducts } from "@/lib/shopify";
import hero from "@/assets/photos/marie-galante-zeilend.jpg";

export const Route = createFileRoute("/shop")({
  component: ShopPage,
  head: () => ({
    meta: [
      { title: "Shop · Marie Galante" },
      {
        name: "description",
        content:
          "De Marie Galante webshop — tickets, merchandise en aandenkens van onze historische zeillogger uit 1915.",
      },
      { property: "og:title", content: "Shop · Marie Galante" },
      {
        property: "og:description",
        content: "Tickets, merchandise en aandenkens van de Marie Galante.",
      },
    ],
  }),
});

function ShopPage() {
  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ["shopify-products"],
    queryFn: () => fetchProducts(50),
  });

  return (
    <SiteLayout>
      <section className="relative h-[50vh] min-h-[360px] w-full overflow-hidden">
        <img src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-primary/60" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-16 md:px-10 md:pb-24">
          <div className="eyebrow text-background/70">Webshop</div>
          <h1 className="mt-3 max-w-3xl font-display text-5xl text-background md:text-7xl">
            Shop
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        {isLoading ? (
          <div className="flex min-h-[40vh] items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="mx-auto max-w-xl text-center">
            <h2 className="font-display text-3xl text-primary">Even niet bereikbaar</h2>
            <p className="mt-4 text-foreground/70">
              De webshop laadt op dit moment niet. Probeer het zo opnieuw.
            </p>
          </div>
        ) : products.length === 0 ? (
          <div className="mx-auto max-w-xl text-center">
            <h2 className="font-display text-3xl text-primary">Binnenkort beschikbaar</h2>
            <p className="mt-4 text-foreground/70">
              Er staan nog geen producten in de shop. Kom snel terug — we vullen 'm nu met
              tickets, merchandise en aandenkens.
            </p>
          </div>
        ) : (
          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
            {products.map((p) => (
              <ProductCard key={p.node.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}