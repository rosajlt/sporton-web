import Button from "@/app/(landing)/ui/button";
import Modal from "../ui/modal";
import { Bank } from "@/app/types";
import { useEffect, useState } from "react";
import { createBank, updateBank } from "@/app/services/bank.service";
import { toast } from "react-toastify/unstyled";

type TBankInfoModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  bank: Bank | null;
};

const BankInfoModal = ({ isOpen, onClose, onSuccess, bank }: TBankInfoModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditMode = !!bank;
  const [formData, setFormData] = useState<Partial<Bank>>({
    accountName: "",
    accountNumber: "",
    bankName: "",
  });

   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (isEditMode) {
        await updateBank(bank._id, formData);
      } else {
        await createBank(formData);
      }
      setFormData({
        accountName: "",
        bankName: "",
        accountNumber: "",
      });
      onSuccess?.();
      onClose();
      toast.success(isEditMode ? "Bank updated successfully!" : "Bank info created successfully!");
    } catch (error) {
      console.error(isEditMode ? "Failed to update bank info" : "Failed to create bank info", error);
      toast.error(isEditMode ? "Failed to update bank info" : "Failed to create bank info");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (isEditMode && isOpen) {
      setFormData({
        accountName: bank.accountName,
        accountNumber: bank.accountNumber,
        bankName: bank.bankName,
      });
    } else if (!isOpen) {
      setFormData({
        accountName: "",
        bankName: "",
        accountNumber: "",
      });
    }
  }, [bank, isOpen, isEditMode]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Bank Account">
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        
        <div className="flex flex-col gap-4 w-full font-medium">
          <div className="input-group-admin">
            <label htmlFor="bankName">Bank Name</label>
            <input
              type="text"
              id="bankName"
              name="bankName"
              placeholder="e. g. Mandiri, BCA, BRI"
              value={formData.bankName}
              onChange={handleChange}
            />
          </div>

          <div className="input-group-admin">
            <label htmlFor="accountNumber">Account Number</label>
            <input
              type="text"
              id="accountNumber"
              name="accountNumber"
              placeholder="e. g. 1234567890"
              value={formData.accountNumber}
              onChange={handleChange}
            />
          </div>

          <div className="input-group-admin">
            <label htmlFor="accountName">Account Holder</label>
            <input
              type="text"
              id="accountName"
              name="accountName"
              placeholder="Holder Name as registered on the account"
              value={formData.accountName}
              onChange={handleChange}
            />
          </div>
        </div>

        <Button
          size="normal"
          variant="primary"
          className="ml-auto rounded-lg"
          disabled={isSubmitting}
          onClick={handleSubmit}
          type="submit"
        >
          {isEditMode ? "Update Bank Info" : "Create Bank Info"}
        </Button>

      </form>
    </Modal>
  );
};

export default BankInfoModal;