
import { apiClient } from "../../libs/api-client";
import type {
  Product
} from "../../types/product";

export const productsApi = {
  getAll: () =>
    apiClient<Product[]>("/api/products")
};
