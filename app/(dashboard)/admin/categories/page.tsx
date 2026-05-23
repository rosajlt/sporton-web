"use client";

import Button from "@/app/(landing)/ui/button";
import { FiPlus } from "react-icons/fi";
import CategoryTable from "../../components/categories/category-table";
import CategoryModal from "../../components/categories/category-modal";
import DeleteModal from "../../components/ui/delete-modal";
import { useEffect, useState } from "react";
import { Category } from "@/app/types";
import { deleteCategory, getAllCategories } from "@/app/services/category.services";
import { toast } from "react-toastify";

const CategoryManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryToDeleteId, setCategoryToDeleteId] = useState("");

  const fetchCategories = async () => {
    try {
      const data = await getAllCategories();
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  }; 

  const handleDelete = (category: Category) => {
   setCategoryToDeleteId(category._id);
   setIsDeleteModalOpen(true);
  }

  const handleEdit = (id: string) => {
   const category = categories.find(c => c._id === id);
   if (category) {
     setSelectedCategory(category);
     setIsModalOpen(true);
   }
  }

  const handleConfirmDelete = async () => {
      if (!categoryToDeleteId) return;
      try {
        await deleteCategory(categoryToDeleteId);
        fetchCategories();
        toast.success("Category deleted successfully!");
        setIsDeleteModalOpen(false);
        setCategoryToDeleteId("");
      } catch (error) {
        console.error("Failed to delete category:", error);
        toast.error("Failed to delete category");
      } 
    };
    
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

    return ( 
        <div>
          <div className="flex justify-between items-center mb-10 ">
            <div>
              <h1 className="font-bold text-2xl">Category Management</h1>
              <p className="opacity-50">Organize your category into categories. </p>
            </div>
            <Button 
                size="normal" 
                variant="primary"
                className="rounded-lg"
                onClick={() => {
                  setSelectedCategory(null);
                  setIsModalOpen(true);
                }}
            >
                <FiPlus size={24} /> Add Category
            </Button>
          </div>
          <CategoryTable categories={categories} onDelete={handleDelete} onEdit={handleEdit} />
          <CategoryModal isOpen={isModalOpen} onClose={handleCloseModal} category={selectedCategory} onSuccess={fetchCategories} />
          <DeleteModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={handleConfirmDelete} />
        </div>
    )
};

export default CategoryManagement;