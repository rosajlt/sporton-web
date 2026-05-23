import Button from "@/app/(landing)/ui/button";
import Modal from "../ui/modal"
import { useEffect, useState } from "react";
import ImageUploadPreview from "../ui/image-upload-preview";
import { Category, Product } from "@/app/types";
import { getAllCategories } from "@/app/services/category.services";
import { createProduct, updateProduct } from "@/app/services/product.services";
import { toast } from "react-toastify/unstyled";
import { getImageUrl } from "@/app/lib/api";

type TProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  product?: Product | null;
};

type ProductFormData = {
  name: string;
  price: number;
  stock: number;
  categoryId: string;
  description: string;
}

const ProductModal = ({ isOpen, onClose, onSuccess, product }: TProductModalProps) => {
  const [imageFile, setImageFile] = useState <File | null> (null);
  const [imagePreview, setImagePreview] = useState <string | null> (null);
  const [category, setCategory] = useState<Category []>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    price: 0,
    stock: 0,
    categoryId: "",
    description: ""
  });

  const isEditMode = !!product;

  const fetchCategories = async () => {
    try {
      const data = await getAllCategories();
      setCategory(data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("price", formData.price.toString());
      data.append("stock", formData.stock.toString());
      data.append("categoryId", formData.categoryId);
      data.append("description", formData.description);
      if (imageFile) {
        data.append("image", imageFile);
      }
      if (isEditMode) {
        await updateProduct(product!._id, data);
      } else {
        await createProduct(data);
      }

      // Reset form and close modal
      setFormData({
        name: "",
        price: 0,
        stock: 0,
        categoryId: "",
        description: ""
      });

      setImageFile(null);
      setImagePreview(null);

      toast.success(isEditMode ? "Product updated successfully!" : "Product created successfully!");

      onClose?.();
      onSuccess?.();

    } catch (error) {
      console.error(isEditMode ? "Failed to update product:" : "Failed to create product:", error);
      toast.error(isEditMode ? "Failed to update product" : "Failed to create product");
    } finally {
        setIsSubmitting(false);
    } 
  };

  useEffect(() => {
    if (isEditMode && isOpen) {
      setFormData({
        name: product.name,
        price: product.price,
        stock: product.stock,
        categoryId: product.category._id,
        description: product.description
      });
      setImagePreview(product.imageUrl ? getImageUrl(product.imageUrl) : null);
    } else if (!isOpen) {
      setFormData({
        name: "",
        price: 0,
        stock: 0,
        categoryId: "",
        description: ""
      });
      setImageFile(null);
      setImagePreview(null);
    }
  }, [isOpen, product]);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEditMode ? "Edit Product" : "Add New Product"}>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="flex gap-7 ">
                <div className="min-w-50">
                  <ImageUploadPreview label="Product Image" value={imagePreview} onChange={
                    (file) => {
                      setImageFile(file);
                      setImagePreview(URL.createObjectURL(file));
                    }
                  }/>
                </div>
                    <div className="flex flex-col gap-4 w-full">
                      <div className="input-group-admin">
                         <label htmlFor="productName">Product Name</label>
                         <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} placeholder="e. g. Running Shoes"/>
                       </div> 
                     <div className="grid grid-cols-2 gap-4">
                         <div className="input-group-admin">
                            <label htmlFor="price">Price (IDR)</label>
                            <input type="number" id="price" name="price" value={formData.price} onChange={handleInputChange} placeholder="e. g. 500000"/>
                         </div>
                         <div className="input-group-admin">
                            <label htmlFor="stock">Stock</label>
                            <input type="number" id="stock" name="stock" value={formData.stock} onChange={handleInputChange} placeholder="e. g. 100"/>
                         </div> 
                     </div>
                     <div className="input-group-admin">
                        <label htmlFor="categoryId">Category</label>
                        <select id="categoryId" name="categoryId" value={formData.categoryId} onChange={handleInputChange}>
                            <option value="" disabled>Select Category</option>
                            {category.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                     </div>
                </div>
            </div>
          <div className="input-group-admin">
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" rows={7} value={formData.description} onChange={handleInputChange} placeholder="Product Details..."></textarea>
          </div>
          <Button size="normal" variant="primary" className="ml-auto mt-3 rounded-lg" disabled={isSubmitting} type="submit">
            {isSubmitting ? (isEditMode ? "Updating..." : "Creating...") : (isEditMode ? "Update Product" : "Create Product")}
          </Button>
        </form>
    </Modal>
  )
}

export default ProductModal
    