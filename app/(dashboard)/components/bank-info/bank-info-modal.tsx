import Button from "@/app/(landing)/ui/button";
import Modal from "../ui/modal";

type TBankInfoModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const BankInfoModal = ({ isOpen, onClose }: TBankInfoModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Bank Account">
      <div className="flex flex-col gap-6">
        
        <div className="flex flex-col gap-4 w-full font-medium">
          <div className="input-group-admin">
            <label htmlFor="BankName">Bank Name</label>
            <input
              type="text"
              id="BankName"
              name="BankName"
              placeholder="e. g. Mandiri, BCA, BRI"
            />
          </div>

          <div className="input-group-admin">
            <label htmlFor="AccountNumber">Account Number</label>
            <input
              type="text"
              id="AccountNumber"
              name="AccountNumber"
              placeholder="e. g. 1234567890"
            />
          </div>

          <div className="input-group-admin">
            <label htmlFor="AccountName">Account Holder</label>
            <input
              type="text"
              id="AccountName"
              name="AccountName"
              placeholder="Holder Name as registered on the account"
            />
          </div>
        </div>

        <Button
          size="normal"
          variant="primary"
          className="ml-auto rounded-lg"
        >
          Create Bank Account
        </Button>

      </div>
    </Modal>
  );
};

export default BankInfoModal;