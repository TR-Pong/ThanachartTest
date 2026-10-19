"use client";

import { useCartStore } from "@/stores/cart-store";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartIcon() {
  const items = useCartStore((state) => state.items);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const unsubscribe = useCartStore.persist.onFinishHydration(
      () => setHydrated(true)
    );

    setHydrated(useCartStore.persist.hasHydrated());

    return unsubscribe;
  }, []);

  const cartCount = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <Link
      href="/cart"
      aria-label={`ตะกร้าสินค้า ${hydrated ? cartCount : 0} ชิ้น`}
      className="relative inline-flex items-center rounded-lg p-2 bg-blue-200 hover:bg-gray-500 hover:text-white "
    >
        <div className="w-6 h-6 relative">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
            </svg>
        </div>
        ตะกร้าสินค้า
        {hydrated && cartCount > 0 && (
            <span
            className="absolute -right-1 -top-1 flex min-w-5 h-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white"
            >
            {cartCount > 99 ? "99+" : cartCount}
            </span>
        )}
    </Link>
  );
}