"use client";

import TransactionTable from "../../components/transactions/transaction-table";
import TransactionModal from "../../components/transactions/transaction-modal";
import { useEffect, useState } from "react";
import { Transaction } from "@/app/types";
import { getAllTransactions, updateTransaction } from "@/app/services/transaction.service";
import { toast } from "react-toastify";

const TransactionManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState<Transaction | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchTransactions = async () => {
   try {
     const data = await getAllTransactions();
     setTransactions(data);
   } catch (error) {
     console.error("Failed to fetch transactions:", error);
   } finally {
      setIsModalOpen(false);
      setSelectedTransactionId(null);
   }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTransactionId(null);
  };

  const handleViewDetails = (transaction: Transaction) => {
    setSelectedTransactionId(transaction);
    setIsModalOpen(true);
  };

  const handleUpdateStatus = async (id: string, status: "paid" | "rejected") => {
    try {
      const formData = new FormData();
      formData.append("status", status);
      await updateTransaction(id, formData);

      toast.success("Transaction status updated successfully!");
      
      await fetchTransactions();
      
    } catch (error) {
      console.error("Failed to update transaction status:", error);
      toast.error("Failed to update transaction status.");
    }  finally {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  } , []);

    return ( 
        <div>
          <div className="flex justify-between items-center mb-10 ">
            <div>
              <h1 className="font-bold text-2xl">Transaction Management</h1>
              <p className="opacity-50">Verify incoming payments and manage orders.</p>
            </div>
          </div>
          <TransactionTable transactions={transactions} onViewDetails={handleViewDetails} />
          {selectedTransactionId && <TransactionModal transaction={selectedTransactionId} onStatusChange={handleUpdateStatus} isOpen={isModalOpen} onClose={handleCloseModal} />}
        </div>
    )
};

export default TransactionManagement;