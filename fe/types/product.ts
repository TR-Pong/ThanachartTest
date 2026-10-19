
export interface Product {
  productCode: string;
  name: string;
  unitPrice: number;
  stockQuantity: number;
}

export interface CreateProductRequest {
  productCode: string;
  name: string;
  unitPrice: number;
  stockQuantity: number;
}

export interface UpdateProductRequest {
  name: string;
  unitPrice: number;
}