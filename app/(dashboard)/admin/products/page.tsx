"use client";

import Button from "@/app/(landing)/ui/button";
import { FiPlus } from "react-icons/fi";
import ProductTable from "../../components/products/product-table";
import ProductModal from "../../components/products/product-modal";
import { useEffect, useState } from "react";
import { Product } from "@/app/types";
import { deleteProduct, getAllProducts } from "@/app/services/product.services";
import { toast } from "react-toastify/unstyled";
import DeleteModal from "../../components/ui/delete-modal";

const ProductManagement = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [product, setProduct] = useState<Product[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProductId, setSelectedProduct] = useState<Product | null>(null);
  const [productToDeleteId, setProductToDeleteId] = useState("");

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      if (data) {
        setProduct(data);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsOpenModal(true);
  };

  const handleDelete = (id: string) => {
    setProductToDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!productToDeleteId) return;
    try {
      await deleteProduct(productToDeleteId);
      fetchProducts();
      toast.success("Product deleted successfully!");
      setIsDeleteModalOpen(false);
      setProductToDeleteId("");
    } catch (error) {
      console.error("Failed to delete product:", error);
      toast.error("Failed to delete product");
    } 
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCloseModal = () => {
    setIsOpenModal(false);
    setSelectedProduct(null);
  };

    return ( 
        <div>
          <div className="flex justify-between items-center mb-10 ">
            <div>
              <h1 className="font-bold text-2xl">Product Management</h1>
              <p className="opacity-50">Manage your inventory, prices and stock.</p>
            </div>
            <Button 
                size="normal" 
                className="rounded-lg"
                onClick={() => setIsOpenModal(true)}
            >
                <FiPlus size={24} /> Add Product
            </Button>
          </div>
          <ProductTable products={product} onEdit={handleEdit} onDelete={handleDelete} />
          <ProductModal product={selectedProductId} onSuccess={fetchProducts} isOpen={isOpenModal} onClose={handleCloseModal} />
        <DeleteModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={handleConfirmDelete} />        
        </div>
    )
};

export default ProductManagement;