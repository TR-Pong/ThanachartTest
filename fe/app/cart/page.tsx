
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Trash2,
  ShoppingCart,
  Minus,
  Plus,
} from "lucide-react";
import { checkoutStock } from "@/features/cart/api";

import { useCartStore } from "@/stores/cart-store";
import { toast } from "@/components/ui/toast";

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCartStore();

  const [hydrated, setHydrated] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    const unsubscribe = useCartStore.persist.onFinishHydration(
      () => setHydrated(true)
    );

    setHydrated(useCartStore.persist.hasHydrated());

    return unsubscribe;
  }, []);

  const cartCount = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const subtotal = items.reduce(
    (sum, item) =>
      sum + item.product.unitPrice * item.quantity,
    0
  );

  const handleClearCart = () => {
    if (window.confirm("ต้องการล้างตะกร้าทั้งหมดหรือไม่?")) {
      clearCart();
    }
  };


  const handleCheckout = async () => {
    if (isCheckingOut || items.length === 0) return;

    setIsCheckingOut(true);

    try {
      await checkoutStock(
        items.map((item) => ({
          productCode: item.product.productCode,
          quantity: item.quantity,
        }))
      );

      clearCart();

      toast.add({
        title: "Checkout สำเร็จ",
        description: "ตัดจำนวนสินค้าใน Stock เรียบร้อยแล้ว",
      });

    } catch (error) {
      toast.add({
        title: "Checkout ไม่สำเร็จ",
        description:
          error instanceof Error
            ? error.message
            : "เกิดข้อผิดพลาด",
      });
    } finally {
      setIsCheckingOut(false);
    }
  };


  if (!hydrated) {
    return (
      <main className="p-8 text-center">
        กำลังโหลดตะกร้าสินค้า...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-6xl px-4 py-8">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
            Shopping Cart
          </h1>

          <div className="flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-white">
            <ShoppingCart size={18} />
            <span>{cartCount} items</span>
          </div>
        </div>

        {/* Empty Cart */}
        {items.length === 0 ? (
          <div className="rounded-xl bg-white p-12 text-center shadow-sm">
            <ShoppingCart
              size={48}
              className="mx-auto mb-4 text-gray-300"
            />

            <p className="text-xl text-gray-500">
              Your cart is empty
            </p>

            <Link
              href="/"
              className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">

            {/* Cart Items */}
            <div className="overflow-hidden rounded-xl bg-white shadow-sm">

              {/* Desktop Header */}
              <div className="hidden grid-cols-12 gap-4 border-b bg-gray-50 px-6 py-4 text-sm font-semibold text-gray-600 sm:grid">
                <div className="col-span-4">Product</div>
                <div className="col-span-3 text-center">Quantity</div>
                <div className="col-span-2 text-right">Price</div>
                <div className="col-span-2 text-right">Total</div>
                <div className="col-span-1 text-center">Action</div>
              </div>

              {items.map(({ product, quantity }) => (
                <div
                  key={product.productCode}
                  className="grid grid-cols-1 gap-4 border-b p-5 last:border-b-0 sm:grid-cols-12 sm:items-center sm:px-6"
                >
                  {/* Product */}
                  <div className="sm:col-span-4">
                    <h2 className="font-semibold text-gray-900">
                      {product.name}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      Code: {product.productCode}
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      Stock: {product.stockQuantity}
                    </p>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center sm:col-span-3 sm:justify-center">
                    <div className="flex items-center overflow-hidden rounded-lg border">
                      <button
                        type="button"
                        disabled={quantity <= 1}
                        onClick={() =>
                          updateQuantity(
                            product.productCode,
                            quantity - 1
                          )
                        }
                        className="p-2 text-gray-600 hover:bg-gray-100 disabled:opacity-30"
                      >
                        <Minus size={16} />
                      </button>

                      <span className="min-w-10 px-2 text-center">
                        {quantity}
                      </span>

                      <button
                        type="button"
                        disabled={quantity >= product.stockQuantity}
                        onClick={() =>
                          updateQuantity(
                            product.productCode,
                            quantity + 1
                          )
                        }
                        className="p-2 text-gray-600 hover:bg-gray-100 disabled:opacity-30"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Unit Price */}
                  <div className="flex justify-between text-gray-600 sm:col-span-2 sm:justify-end">
                    <span className="sm:hidden">Price</span>
                    <span>
                      {product.unitPrice.toLocaleString("th-TH")} ฿
                    </span>
                  </div>

                  {/* Total */}
                  <div className="flex justify-between font-bold text-gray-900 sm:col-span-2 sm:justify-end">
                    <span className="sm:hidden">Total</span>
                    <span>
                      {(
                        product.unitPrice * quantity
                      ).toLocaleString("th-TH")} ฿
                    </span>
                  </div>

                  {/* Remove */}
                  <div className="flex justify-end sm:col-span-1 sm:justify-center">
                    <button
                      type="button"
                      onClick={() =>
                        removeItem(product.productCode)
                      }
                      className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                      aria-label={`ลบ ${product.name}`}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="flex justify-end">
              <div className="w-full rounded-xl bg-white p-6 shadow-sm md:w-96">
                <h2 className="mb-5 text-xl font-bold text-gray-900">
                  Order Summary
                </h2>

                <div className="space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Items</span>
                    <span>{cartCount}</span>
                  </div>

                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>
                      {subtotal.toLocaleString("th-TH")} ฿
                    </span>
                  </div>

                  <div className="mt-4 flex justify-between border-t pt-4 text-lg font-bold">
                    <span>Total</span>
                    <span className="text-blue-600">
                      {subtotal.toLocaleString("th-TH")} ฿
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCheckout}
                  className="mt-6 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <Link
                href="/"
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
              >
                <ArrowLeft size={18} />
                Continue Shopping
              </Link>

              <button
                type="button"
                onClick={handleClearCart}
                disabled={isCheckingOut || items.length === 0}
                className="flex items-center gap-2 text-red-600 hover:text-red-800"
              >
                <Trash2 size={16} />
                Clear Cart
              </button>
            </div>

          </div>
        )}
      </div>
    </main>
  );
}
