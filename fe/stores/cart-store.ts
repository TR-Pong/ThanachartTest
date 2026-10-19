
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/types/product";
import { toast } from "../components/ui/toast";

interface CartItem {
    product: Product;
    quantity: number;
}

interface CartState {
    items: CartItem[];
    addItem: (product: Product) => void;
    removeItem: (productCode: string) => void;
    updateQuantity: (productCode: string, quantity: number) => void;
    clearCart: () => void;
}

export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            items: [],


            addItem: (product) =>
                set((state) => {
                    const existing = state.items.find(
                        (item) =>
                            item.product.productCode === product.productCode
                    );

                    if (existing) {
                        if (existing.quantity >= product.stockQuantity) {
                            toast.add({
                                title: "ไม่สามารถเพิ่มสินค้าได้",
                                description: `สินค้า ${product.name} มีจำนวนคงเหลือเพียง ${product.stockQuantity} ชิ้น`,
                                type: "error"
                            })
                            return state;
                        }

                        return ({
                            items: state.items.map((item) =>
                                item.product.productCode === product.productCode
                                    ? {
                                        ...item,
                                        quantity: item.quantity + 1,
                                        product,
                                    }
                                    : item
                            )
                        });
                    }

                    if (product.stockQuantity <= 0) {
                        toast.add({
                            title: "ไม่สามารถเพิ่มสินค้าได้",
                            description: `สินค้า ${product.name} หมดสต๊อกแล้ว`,
                            type: "error"
                        });
                        return state;
                    }

                    toast.add({
                        title: "เพิ่มสินค้าในตะกร้าแล้ว",
                        description: `สินค้า ${product.name} ถูกเพิ่มในตะกร้าแล้ว`,
                        type: "success"
                    })

                    return {
                        items: [
                            ...state.items,
                            { product, quantity: 1 },
                        ],
                    };
                }),


            removeItem: (productCode) =>
                set((state) => {
                    toast.add({
                        title: "ลบสินค้าออกจากตะกร้าแล้ว",
                        description: "จำนวนสินค้าถูกลบออกจากตะกร้าเรียบร้อยแล้ว",
                        type: "success"
                    });
                    return {
                        items: state.items.filter(
                            (item) => item.product.productCode !== productCode
                        ),
                    };
                }),

            updateQuantity: (productCode, quantity) =>
                set((state) => {
                    const item = state.items.find(
                        (item) => item.product.productCode === productCode
                    );

                    if (!item) return state;

                    const stock = item.product.stockQuantity;

                    if (!Number.isInteger(quantity) || quantity < 1) {
                        toast.add({
                            title: "จำนวนสินค้าไม่ถูกต้อง",
                            description: "จำนวนสินค้าต้องไม่น้อยกว่า 1 ชิ้น",
                            type: "error"
                        });
                        return state;
                    }

                    if (quantity > stock) {
                        toast.add({
                            title: "สินค้าในสต็อกไม่เพียงพอ",
                            description: `${item.product.name} คงเหลือ ${stock} ชิ้น`,
                            type: "error"
                        });
                        return state;
                    }

                    if (quantity === item.quantity) return state;

                    if (quantity > item.quantity) {
                        toast.add({
                            title: "เพิ่มจำนวนสินค้าสำเร็จ",
                            description: `${item.product.name} จำนวน ${quantity} ชิ้น`,
                            type: "success"
                        });
                    } else {
                        toast.add({
                            title: "ลดจำนวนสินค้าแล้ว",
                            description: `${item.product.name} เหลือ ${quantity} ชิ้น`,
                            type: "info"
                        });
                    }

                    return {
                        items: state.items.map((cartItem) =>
                            cartItem.product.productCode === productCode
                                ? { ...cartItem, quantity }
                                : cartItem
                        ),
                    };
                }),

            clearCart: () => set({ items: [] }),
        }),
        {
            name: "tanachat-shopping-cart",
        }
    )
);
