import { Link } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { formatPrice, type ShopifyProduct } from "@/lib/shopify";
import { toast } from "sonner";

export function ProductCard({ product }: { product: ShopifyProduct }) {
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);
  const node = product.node;
  const firstImage = node.images?.edges?.[0]?.node;
  const variant = node.variants.edges[0]?.node;
  const price = node.priceRange.minVariantPrice;
  const available = variant?.availableForSale ?? false;

  const handleAdd = async () => {
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Toegevoegd aan mandje", {
      description: node.title,
      position: "top-center",
    });
  };

  return (
    <div className="group flex flex-col bg-background">
      <Link
        to="/product/$handle"
        params={{ handle: node.handle }}
        className="block aspect-square overflow-hidden bg-secondary/30"
      >
        {firstImage ? (
          <img
            src={firstImage.url}
            alt={firstImage.altText ?? node.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs uppercase tracking-[0.2em] text-foreground/40">
            Geen afbeelding
          </div>
        )}
      </Link>
      <div className="mt-4 flex flex-1 flex-col">
        <Link
          to="/product/$handle"
          params={{ handle: node.handle }}
          className="font-display text-xl text-primary hover:text-accent"
        >
          {node.title}
        </Link>
        <p className="mt-1 text-sm text-foreground/70 line-clamp-2">{node.description}</p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="font-display text-lg text-foreground">
            {formatPrice(price.amount, price.currencyCode)}
          </span>
          <Button
            onClick={handleAdd}
            disabled={isLoading || !available}
            size="sm"
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : available ? (
              "In mandje"
            ) : (
              "Uitverkocht"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}