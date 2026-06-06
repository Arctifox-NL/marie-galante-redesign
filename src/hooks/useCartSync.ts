import { useEffect } from "react";
import { useCartStore } from "@/stores/cartStore";

export function useCartSync() {
  const syncCart = useCartStore((state) => state.syncCart);

  useEffect(() => {
    syncCart();
    const handleVisibilityChange = () => {
      if (typeof document !== "undefined" && document.visibilityState === "visible") {
        syncCart();
      }
    };
    if (typeof document !== "undefined") {
      document.addEventListener("visibilitychange", handleVisibilityChange);
      return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
    }
  }, [syncCart]);
}