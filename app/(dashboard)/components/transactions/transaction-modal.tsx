import Button from "@/app/(landing)/ui/button";
import Modal from "../ui/modal"
import { useState } from "react";
import Image from "next/image";
import ImageUploadPreview from "../ui/image-upload-preview";
import priceFormatter from "@/app/utils/price-formatter";
import { FiCheck, FiX } from "react-icons/fi";

type TransactionModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const TransactionModal = ({ isOpen, onClose }: TransactionModalProps) => {
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Verify Transactions">
        <div className="flex gap-6">
            <div>
                <h4 className="font-semibold text-xs mb-2">Payment Proof</h4>
                <Image src="/payment-proof.png" alt="Payment Proof" width={200} height={401} />
            </div>
                  <div>
                     <h4 className="font-semibold text-xs mb-2">Order Details</h4>
                     <div className="bg-gray-100 rounded-md flex flex-col gap-2.5 p-4 text-xs mb-5">
                      <div className="flex justify-between gap-10 font-medium ">
                        <div className="opacity-50">Date</div>
                        <div className="text-right">23/02/2026 19:32</div>
                      </div>
                      <div className="flex justify-between font-medium">
                        <div className="opacity-50">Customer</div>
                        <div className="text-right">John Doe</div>
                      </div>
                       <div className="flex justify-between font-medium">
                        <div className="opacity-50">Contact</div>
                        <div className="text-right">08123456789</div>
                      </div>
                       <div className="flex justify-between gap-10 font-medium">
                        <div className="opacity-50 whitespace-nowrap">Shipping Address</div>
                        <div className="text-right">Merdeka Street, Jakarta, Indonesia, 332122</div>
                      </div>
                    </div>
                    <h4 className="font-semibold text-xs mb-2">Items Purchased</h4>
                    <div className="border border-gray-200 rounded-lg p-2 flex items-center gap-2">
                      <div className="bg-gray-100 rounded aspect-square w-8 h-8 flex items-center justify-center">
                        <Image src="/product/product-4.png" alt="Product Image" width={30} height={30} />
                      </div>
                      <div className="font-medium text-xs"> SportOn HyperFast Shoes </div>
                      <div className="text-medium ml-auto text-xs">3 units</div>
                    </div>
                    <div className="flex justify-between text-xs mt-6">
                      <h4 className="font-semibold ">Total</h4>
                      <div className="text-primary font-semibold">{priceFormatter(450000)}</div>
                    </div>
                    <div className="flex justify-end gap-5 mt-12">
                      <Button className="text-primary! bg-primary-light! rounded-md"
                              size="small">
                        <FiX size={20}/>
                        Reject
                      </Button>
                      <Button className="text-white! bg-[#50C252]! rounded-md"
                              size="small">
                        <FiCheck size={20}/>
                        Approve
                      </Button>
                    </div>
             </div>
        </div>
    </Modal>
  )
}

export default TransactionModal
    