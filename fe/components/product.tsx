import type { Product } from "../types/product";
import { useCartStore } from "../stores/cart-store";

interface ProductTableProps {
    products: Product[];
    onEdit?: (product: Product) => void;
    onDelete?: (productCode: string) => void;
}

export default function ProductTable({
    products,
}: ProductTableProps) {
    products.sort((a, b) => a.productCode.localeCompare(b.productCode));
    const items = useCartStore((state) => state.items);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {products.map((product) => {
                const cartQuantity = items
                    .filter((item) => item.product.productCode === product.productCode)
                    .reduce((sum, item) => sum + item.quantity, 0);
                const disabled =
                    product.stockQuantity <= 0 || cartQuantity >= product.stockQuantity;

                return (
                    <div
                        key={product.productCode}
                        className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition overflow-hidden group"
                    >
                        <div className="p-5">
                            <h3 className="text-lg font-bold text-gray-900 mb-1">
                                {product.name}
                            </h3>
                            <div className="text-sm text-gray-500">
                                จำนวนคงเหลือ: {product.stockQuantity}
                            </div>
                            <div className="flex justify-between items-center mt-4">
                                <span className="text-lg font-semibold text-green-600">
                                    {product.unitPrice.toFixed(2)}
                                </span>
                                <button
                                    className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                                    disabled={disabled}
                                    onClick={() => useCartStore.getState().addItem(product)}
                                >
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}

            {products.length === 0 && (
                <div className="col-span-full text-center text-gray-500 py-10">
                    ไม่มีสินค้าในขณะนี้
                </div>
            )}
        </div>
    );
}