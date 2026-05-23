"use client";

import Button from "@/app/(landing)/ui/button";
import { FiPlus } from "react-icons/fi";
import BankInfoList from "../../components/bank-info/bank-info-list";
import BankInfoModal from "../../components/bank-info/bank-info-modal";
import DeleteModal from "../../components/ui/delete-modal";
import { useEffect, useState } from "react";
import { Bank } from "@/app/types";
import { deleteBank, getAllBank } from "@/app/services/bank.service";
import { toast } from "react-toastify/unstyled";


const BankInfoManagement = () => {
  const [isModalOpen, setIsOpenModal] = useState(false);
  const [bank, setBank] = useState<Bank[]>([]);
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [bankToDeleteId, setBankToDeleteId] = useState("");

  const fetchBanks = async () => {
    try {
      const data = await getAllBank();
      setBank(data);
    } catch (error) {
      console.error ("Failed to fetch bank data", error);
    }
  }

  const handleCloseModal = () => {
    setIsOpenModal(false);
    setSelectedBank(null);
  };

  const handleEdit = (bank: Bank) => {
    setSelectedBank(bank);
    setIsOpenModal(true);
  };

  const handleDelete = (id: string) => {
    setBankToDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!bankToDeleteId) return;

    try {
      await deleteBank(bankToDeleteId);
      toast.success("Bank info deleted successfully!");
      setBankToDeleteId("")
      setIsDeleteModalOpen(false);
      fetchBanks();
    } catch (error) {
      console.error ("Failed to delete bank", error);
      toast.error("Failed to delete bank info");
    }
  };


   useEffect(() => {
    fetchBanks();
  }, []);

    return ( 
        <div>
          <div className="flex justify-between items-center mb-10 ">
            <div>
              <h1 className="font-bold text-2xl">Bank Information </h1>
              <p className="opacity-50">Manage destination accounts for customer transfers. </p>
            </div>
            <Button 
                size="normal" 
                variant="primary"
                className="rounded-lg"
                onClick={() => setIsOpenModal(true)}
            >
                <FiPlus size={24} /> Add Bank Account
            </Button>
          </div>
          <BankInfoList banks={bank} onEdit={handleEdit} onDelete={handleDelete} />
          <BankInfoModal isOpen={isModalOpen} onSuccess={fetchBanks} onClose={handleCloseModal}
          bank={selectedBank} />

          <DeleteModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={handleDeleteConfirm} />
        </div>
    )
};

export default BankInfoManagement;