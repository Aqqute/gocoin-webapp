import { useState } from "react";
import Modal from "../PopupModal";
import { ArrowLeft, X } from "lucide-react";
import Button from "../Button";
import flag from "../../../public/images/nigerian-flag.svg";
import { useAuth } from "../../contexts/AuthContext";
import { withdrawToBank } from "../../config/wallet";
import toast from "react-hot-toast";

export default function WithdrawModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [selectedMethod, setSelectedMethod] = useState(null);

  // Connected Wallet Data
  const [walletWithdrawalData, setWalletWithdrawalData] = useState({
    amount: "",
    walletAddress: "",
    password: "",
  });

  // Bank Account Data
  const [bankWithdrawalData, setBankWithdrawalData] = useState({
    accountNumber: "",
    bankName: "",
    amountGoToken: "",
    amountFiat: "",
    fiatCurrency: "USD",
    paymentDescription: "",
    password: "",
  });

  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [receipt, setReceipt] = useState([]);

  if (!isOpen) return null;

  // Handle changes for bank withdrawal
  const handleBankChange = (e) => {
    const { name, value } = e.target;

    // auto-sync Fiat ↔ GoToken
    if (name === "amountFiat") {
      const fiat = value === "" ? "" : Number(value);
      setBankWithdrawalData((prev) => ({
        ...prev,
        amountFiat: fiat,
        amountGoToken: fiat !== "" ? fiat + 5 : "", // example: add conversion logic
      }));
      return;
    }

    if (name === "amountGoToken") {
      const tokenAmt = value === "" ? "" : Number(value);
      setBankWithdrawalData((prev) => ({
        ...prev,
        amountGoToken: tokenAmt,
        amountFiat: tokenAmt !== "" ? tokenAmt - 5 : "", // example: subtract conversion logic
      }));
      return;
    }

    // everything else (accountNumber, bankName, password, etc.)
    setBankWithdrawalData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle changes for wallet withdrawal
  const handleWalletChange = (e) => {
    const { name, value } = e.target;
    setWalletWithdrawalData({ ...walletWithdrawalData, [name]: value });
  };

  // Handle Withdraw
  const handleWithdraw = async () => {
    // Validation
    const {
      accountNumber,
      bankName,
      amountGoToken,
      amountFiat,
      fiatCurrency,
      paymentDescription,
      password,
    } = bankWithdrawalData;

    if (
      !accountNumber ||
      !bankName ||
      !amountGoToken ||
      !amountFiat ||
      !fiatCurrency ||
      !password
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setIsLoading(true);

      const payload = {
        accountNumber: String(accountNumber),
        bankName,
        amountGoToken: Number(amountGoToken),
        amountFiat: Number(amountFiat),
        fiatCurrency: fiatCurrency || "USD",
        paymentDescription: paymentDescription || "Withdrawal",
        password,
      };

      const result = await withdrawToBank(payload, token);

      if (result.success) {
        const updatedReceipt = [
          {
            name: "Transaction ID",
            value: result.data.transactionId || "$123456",
          },
          { name: "Status", value: result.data.status || "Processing" },
          {
            name: "Amount Remitted",
            value: `${payload.amountFiat} ${payload.fiatCurrency}`,
          },
          { name: "Transfer fee", value: result.data.fee || "Free" },
          {
            name: "Total amount",
            value: `${payload.amountFiat} ${payload.fiatCurrency}`,
          },
          { name: "Date", value: new Date().toLocaleDateString() },
          { name: "Time", value: new Date().toLocaleTimeString() },
        ];

        setReceipt(updatedReceipt);
        toast.success("Withdrawal Successful!");
        setStep(6); // show receipt step instead of closing modal
      } else {
        console.error("Withdrawal failed:", result.error);
        toast.error(`Withdrawal Failed: ${result.error}`);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("Unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
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
      value: `${bankWithdrawalData.amountFiat} ${bankWithdrawalData.fiatCurrency}`,
    },
    {
      heading: "Transfer",
      value: "Free",
    },
    {
      heading: "Total amount",
      value: `${bankWithdrawalData.amountFiat} ${bankWithdrawalData.fiatCurrency}`,
    },
  ];

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <div className="relative">
        <X color="#000" size={25} onClick={onClose} className="absolute right-0 top-0 cursor-pointer" />
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
                    selectedMethod === stepItem.nextStep
                      ? "border-[#F58300] bg-orange-50"
                      : ""
                  }`}
                >
                  <h4 className="text-[#2B2B2B] font-bold leading-[26px]">
                    {stepItem.method}
                  </h4>
                  <p className="text-xs text-[#20283E] font-normal leading-[23px]">
                    {stepItem.subtitle}
                  </p>
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
              <ArrowLeft
                onClick={() => setStep(1)}
                size={25}
                color="black"
                className="cursor-pointer"
              />
              <h4 className="font-bold text-xl leading-8 text-[#393A3F]">
                Withdraw to a Connected Wallet
              </h4>
            </div>
            <input
              type="text"
              name="amount"
              placeholder="Enter amount"
              value={walletWithdrawalData.amount}
              onChange={handleWalletChange}
              className="outline-none bg-[#F3F4F6] border border-[#F3F4F6] focus:border-[#F69626] py-4 px-3 h-14 rounded-lg w-full"
            />
            <Button onClick={() => setStep(4)} content={"Withdraw"} />
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
                <h2 className="text-lg font-medium text-gray-800">
                  Withdraw to Bank Account
                </h2>
              </div>
              <button onClick={onClose} className="text-gray-400 text-xl">
                ×
              </button>
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
                  value={bankWithdrawalData.accountNumber}
                  onChange={handleBankChange}
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
                    name="bankName"
                    value={bankWithdrawalData.bankName}
                    onChange={handleBankChange}
                    className="outline-none bg-[#F3F4F6] border border-[#F3F4F6] focus:border-[#F69626] py-4 px-3 h-14 rounded-lg w-full"
                  >
                    <option value="">Select Bank</option>
                    <option value="Access Bank">Access Bank</option>
                    <option value="GTBank">GTBank</option>
                    <option value="First Bank">First Bank</option>
                    <option value="Zenith Bank">Zenith Bank</option>
                    <option value="UBA">UBA</option>
                  </select>
                </div>
              </div>

              {/* amount fiat */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="amountFiat"
                    placeholder="Enter Amount"
                    value={bankWithdrawalData.amountFiat}
                    onChange={handleBankChange}
                    className="outline-none bg-[#F3F4F6] border border-[#F3F4F6] focus:border-[#F69626] py-4 px-3 h-14 rounded-lg w-full"
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                    <img src={flag} alt="NGN" />
                  </div>
                </div>
              </div>

              {/* Go Token Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Go Token Amount
                </label>
                <input
                  type="number"
                  name="amountGoToken"
                  placeholder="Enter Go Token amount"
                  value={bankWithdrawalData.amountGoToken}
                  onChange={handleBankChange}
                  className="outline-none bg-[#F3F4F6] border border-[#F3F4F6] focus:border-[#F69626] py-4 px-3 h-14 rounded-lg w-full"
                />
              </div>

              {/* Payment Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment description
                </label>
                <input
                  type="text"
                  name="paymentDescription"
                  placeholder="Enter description"
                  value={bankWithdrawalData.paymentDescription}
                  onChange={handleBankChange}
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
              <ArrowLeft
                onClick={() => setStep(selectedMethod === 2 ? 2 : 3)}
                size={25}
                color="black"
                className="cursor-pointer"
              />
              <h4 className="font-bold text-xl leading-8 text-[#393A3F]">
                Enter Password
              </h4>
            </div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={
                selectedMethod === 2
                  ? walletWithdrawalData.password
                  : bankWithdrawalData.password
              }
              onChange={
                selectedMethod === 2 ? handleWalletChange : handleBankChange
              }
              className="outline-none bg-[#F3F4F6] border border-[#F3F4F6] focus:border-[#F69626] py-4 px-3 h-14 rounded-lg w-full"
            />
            <Button onClick={() => setStep(5)} content={"Submit"} />
          </div>
        )}

        {/* Step 5 – Confirm Withdrawal */}
        {step === 5 && (
          <div className="space-y-4">
            <div className="flex items-center gap-4 ">
              <ArrowLeft
                onClick={() => setStep(4)}
                size={25}
                color="black"
                className="cursor-pointer"
              />
              <h4 className="font-bold text-xl leading-8 text-[#393A3F]">
                Confirm Withdrawal
              </h4>
            </div>
            <div className="space-y-2 my-4">
              {confirm.map((stepItem, idx) => (
                <div
                  key={idx}
                  className={`border-b border-[#CBC9C970] h-[85px] w-full py-4 px-3 cursor-pointer hover:border-[#F58300] flex justify-between items-center`}
                >
                  <p className="text-[#20283E] font-normal text-base">
                    {stepItem.heading}
                  </p>
                  <h4 className="text-[#20283E] font-bold text-base ">
                    {stepItem.value}
                  </h4>
                </div>
              ))}
            </div>
            <Button
              onClick={handleWithdraw}
              content={isLoading ? "Loading..." : "Withdraw"}
              disabled={isLoading}
            />
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
                  className={`border-b border-[#CBC9C970] h-[80px] w-full py-2 px-3 cursor-pointer hover:border-[#F58300] flex justify-between items-center`}
                >
                  <p className="text-[#20283E] font-normal text-base">{r.name}</p>
                  <h4 className="text-[#20283E] font-bold text-base ">
                    {r.value}
                  </h4>
                </div>
              ))}
            </div>
            {/* <Button onClick={handleWithdraw} content={isLoading ? "Loading..." : "Download"} disabled={isLoading}/> */}
          </div>
        )}
      </div>
    </Modal>
  );
}
