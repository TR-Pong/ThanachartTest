
export interface CheckoutItem {
  productCode: string;
  quantity: number;
}

export async function checkoutStock(items: CheckoutItem[]) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/checkout`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.code === "INSUFFICIENT_STOCK"
        ? `${data.productCode} เหลือ ${data.availableQuantity} ชิ้น`
        : data.message || "Checkout ไม่สำเร็จ"
    );
  }

  return data;
}
