"use client";
import Image from "next/image";
import ProductTable from "../components/product";
import CartIcon from "../components/carticon";
import { productsApi } from "../features/products/api";
import type { Product } from "../types/product";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    productsApi.getAll()
      .then(setProducts)
      .catch((err: any) => {
        setError(
          err instanceof Error ? err.message : "โหลดข้อมูลไม่สำเร็จ"
        );
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="p-6">กำลังโหลดข้อมูลสินค้า...</div>;
  }

  return (
    <section className="bg-gray-50 min-h-screen py-16 px-6">
      <div className="top-4 right-4 sticky z-50">
        <CartIcon />
      </div>
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">ระบบ POS</h1>
      </div>
      <ProductTable products={products} />
    </section>
  );
}
