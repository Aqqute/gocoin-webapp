import { useState } from "react";
import Modal from "./PopupModal";
import { ArrowLeft } from "lucide-react";
import Button from "./Button";
import flag from "../../public/images/nigerian-flag.svg";

export default function WithdrawModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [formData, setFormData] = useState({
    amount: "",
    accountNumber: "",
    bank: "",
    sortCode: "",
    description: "",
    password: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWithdraw = () => {
    console.log("Withdraw data:", formData);
    onClose();
  };

  const handleMethodSelect = (nextStep) => {
    setSelectedMethod(nextStep);
    setStep(nextStep);
  };

  const handleNextStep = () => {
    if (selectedMethod) {
      setStep(selectedMethod);
    }
  };

  const steps = [
    {
      method: "Connected Wallet",
      subtitle: "Withdraw to Connected wallet",
      nextStep: 2,
    },
    {
      method: "Bank account",
      subtitle: "Withdraw to your local bank account",
      nextStep: 3,
    },
  ];

  const confirm = [
    {
        heading: "Amount",
        value: "0.0005BTC",
    },
    {
        heading: "Transfer",
        value: "Free",
    },
    {
        heading: "Total amount",
        value: "0.0005BTC",
    },
  ];

  const receipt = [
    { name: "Transaction ID", value: "$123456" },
    { name: "Status", value: "Received" },
    { name: "Amount Remitted", value: "0.0005BTC" },
    { name: "Transfer fee", value: "Free" },
    { name: "Total amount", value: "0.0005BTC" },
    { name: "Date", value: "27 Jun 2025" },
    { name: "Time", value: "12:25 AM" },
  ];

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      {/* Step 1 – Select Method */}
      {step === 1 && (
        <>
          <div className="flex items-center gap-4">
            <ArrowLeft size={25} color="black" />
            <h4 className="font-bold text-xl leading-8 text-[#393A3F]">
              Select a withdrawal method
            </h4>
          </div>
          <div className="space-y-5 my-4">
            {steps.map((stepItem, idx) => (
              <div
                key={idx}
                onClick={() => handleMethodSelect(stepItem.nextStep)}
                className={`border-b border-[#CBC9C970] h-[85px] w-full py-4 px-3 cursor-pointer hover:border-[#F58300] ${
                  selectedMethod === stepItem.nextStep ? 'border-[#F58300] bg-orange-50' : ''
                }`}
              >
                <h4 className="text-[#2B2B2B] font-bold leading-[26px]">{stepItem.method}</h4>
                <p className="text-xs text-[#20283E] font-normal leading-[23px]">{stepItem.subtitle}</p>
              </div>
            ))}
          </div>
          <Button 
            onClick={handleNextStep} 
            content={"Withdraw"} 
            disabled={!selectedMethod}
          />
        </>
      )}

      {/* Step 2 – Connected Wallet */}
      {step === 2 && (
        <div className="space-y-4">
          <div className="flex items-center gap-4 ">
            <ArrowLeft onClick={() => setStep(1)} size={25} color="black" className="cursor-pointer" />
            <h4 className="font-bold text-xl leading-8 text-[#393A3F]">
              Withdraw to a Connected Wallet
            </h4>
          </div>
          <input
            type="text"
            name="amount"
            placeholder="Enter amount"
            value={formData.amount}
            onChange={handleChange}
            className="outline-none bg-[#F3F4F6] border border-[#F3F4F6] focus:border-[#F69626] py-4 px-3 h-14 rounded-lg w-full"
          />
          <Button onClick={() => setStep(4)} content={"Withdraw"}/>
        </div>
      )}

      {/* Step 3 – Bank Account */}
      {step === 3 && (
        <div className="bg-white min-h-[600px] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <ArrowLeft 
                onClick={() => setStep(1)} 
                size={20} 
                color="#666" 
                className="cursor-pointer" 
              />
              <h2 className="text-lg font-medium text-gray-800">Withdraw to Bank Account</h2>
            </div>
            <button onClick={onClose} className="text-gray-400 text-xl">×</button>
          </div>

          {/* Form Content */}
          <div className="flex-1 px-4 py-6 space-y-3">
            {/* Account Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account Number
              </label>
              <input
                type="text"
                name="accountNumber"
                placeholder="Enter account number"
                value={formData.accountNumber}
                onChange={handleChange}
                className="outline-none bg-[#F3F4F6] border border-[#F3F4F6] focus:border-[#F69626] py-4 px-3 h-14 rounded-lg w-full"
              />
            </div>

            {/* Bank */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bank
              </label>
              <div className="relative">
                <select
                  name="bank"
                  value={formData.bank}
                  onChange={handleChange}
                  className="outline-none bg-[#F3F4F6] border border-[#F3F4F6] focus:border-[#F69626] py-4 px-3 h-14 rounded-lg w-full"
                >
                  <option value="">Select Bank</option>
                  <option value="access">Access Bank</option>
                  <option value="gtbank">GTBank</option>
                  <option value="firstbank">First Bank</option>
                  <option value="zenith">Zenith Bank</option>
                  <option value="uba">UBA</option>
                </select>
              </div>
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="amount"
                  placeholder="Enter Amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="outline-none bg-[#F3F4F6] border border-[#F3F4F6] focus:border-[#F69626] py-4 px-3 h-14 rounded-lg w-full"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                  <img src={flag} alt="NGN" />
                </div>
              </div>
            </div>

            {/* Payment Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment description
              </label>
              <input
                type="text"
                name="description"
                placeholder="Enter description"
                value={formData.description}
                onChange={handleChange}
                className="outline-none bg-[#F3F4F6] border border-[#F3F4F6] focus:border-[#F69626] py-4 px-3 h-14 rounded-lg w-full"
              />
            </div>

            {/* Add as beneficiary */}
            <div className="pt-2">
              <button className="text-orange-500 text-sm font-medium">
                + Add as beneficiary
              </button>
            </div>
          </div>

          {/* Bottom Button */}
          <Button onClick={() => setStep(4)} content={"Withdraw"} />
        </div>
      )}

      {/* Step 4 – Enter Password */}
      {step === 4 && (
        <div className="space-y-4">
          <div className="flex items-center gap-4 ">
            <ArrowLeft onClick={() => setStep(1)} size={25} color="black" className="cursor-pointer" />
            <h4 className="font-bold text-xl leading-8 text-[#393A3F]">
              Enter Password
            </h4>
          </div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="outline-none bg-[#F3F4F6] border border-[#F3F4F6] focus:border-[#F69626] py-4 px-3 h-14 rounded-lg w-full"
          />
          <Button onClick={() => setStep(5)} content={"Submit"}/>
        </div>
      )}

      {/* Step 5 – Confirm Withdrawal */}
      {step === 5 && (
        <div className="space-y-4">
          <div className="flex items-center gap-4 ">
            <ArrowLeft onClick={() => setStep(4)} size={25} color="black" className="cursor-pointer" />
            <h4 className="font-bold text-xl leading-8 text-[#393A3F]">
              Confirm Withdrawal
            </h4>
          </div>
         <div className="space-y-2 my-4">
            {confirm.map((stepItem, idx) => (
              <div
                key={idx}
                className={`border-b border-[#CBC9C970] h-[85px] w-full py-4 px-3 cursor-pointer hover:border-[#F58300 flex justify-between items-center`}
              >
                <p className="text-[#20283E] font-normal text-base">{stepItem.heading}</p>
                <h4 className="text-[#20283E] font-bold text-base ">{stepItem.value}</h4>
              </div>
            ))}
          </div>
          <Button onClick={() => setStep(6)} content={"Withdraw"}/>
        </div>
      )}

      {/* Step 6 – Transaction receipt */}
      {step === 6 && (
        <div className="space-y-4">
            <h4 className="font-bold text-xl leading-8 text-[#393A3F]">
              Transaction receipt
            </h4>
         <div className="my-2">
            {receipt.map((r, idx) => (
              <div
                key={idx}
                className={`border-b border-[#CBC9C970] h-[80px] w-full py-2 px-3 cursor-pointer hover:border-[#F58300 flex justify-between items-center`}
              >
                <p className="text-[#20283E] font-normal text-base">{r.name}</p>
                <h4 className="text-[#20283E] font-bold text-base ">{r.value}</h4>
              </div>
            ))}
          </div>
          <Button onClick={handleWithdraw} content={"Download"}/>
        </div>
      )}
    </Modal>
  );
}