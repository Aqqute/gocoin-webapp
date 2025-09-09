import { ArrowLeft, X } from "lucide-react";
import Modal from "../PopupModal";
import { useState } from "react";
import Button from "../Button";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";

export default function SwapModal({ isOpen, onClose }) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fromCurrency: "",
    fromAmount: "",
    toCurrency: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const { token } = useAuth();

  const handleSwap = async () => {
    // validation
    const { fromCurrency, toCurrency, fromAmount } = formData;

    if (!fromCurrency || !toCurrency || !fromAmount) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setIsLoading(true);

      const payload = {
        fromCurrency,
        toCurrency,
        fromAmount: Number(fromAmount),
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL || "https://gocoin.onrender.com"}/api/wallet/swap`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data && response.data.status === "success") {
        onClose();
        toast.success(response.data.message || "Currency swap initiated successfully.");
        console.log(response.data.data);
      } else {
        toast.error(response.data.message || "Swap failed");
      }
    } catch (error) {
      const message = error?.response?.data?.message || "Unexpected error occurred";
      toast.error(message);
      console.error("Swap error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="relative">
        <X
          color="#000"
          size={25}
          onClick={onClose}
          className="absolute right-0 top-0 cursor-pointer"
        />

        <div className="flex items-center gap-4">
          <ArrowLeft size={25} color="black" />
          <h4 className="font-bold text-xl leading-8 text-[#393A3F]">
            Swap Currencies
          </h4>
        </div>

        <form className="my-5 space-y-5">
          <div>
            <label className="text-[#393A3F] font-bold text-base mb-2">
              Swap from
            </label>
            <select
              name="fromCurrency"
              value={formData.fromCurrency}
              onChange={handleChange}
              className="outline-none bg-[#F3F4F6] border border-[#F3F4F6] focus:border-[#F69626] py-4 px-3 h-14 rounded-lg w-full"
            >
              <option value="">Select currency</option>
              <option value="USDT">USDT</option>
              <option value="NGN">NGN</option>
              <option value="GoToken">GoToken</option>
            </select>
          </div>
          <div>
            <label className="text-[#393A3F] font-bold text-base mb-2">
              Amount to swap
            </label>
            <input
              type="text"
              name="fromAmount"
              onChange={handleChange}
              value={formData.fromAmount}
              className="outline-none bg-[#F3F4F6] border border-[#F3F4F6] focus:border-[#F69626] py-4 px-3 h-14 rounded-lg w-full"
            />
          </div>
          <div>
            <label className="text-[#393A3F] font-bold text-base mb-2">
              Swap to
            </label>
            <select
              name="toCurrency"
              value={formData.toCurrency}
              onChange={handleChange}
              className="outline-none bg-[#F3F4F6] border border-[#F3F4F6] focus:border-[#F69626] py-4 px-3 h-14 rounded-lg w-full"
            >
              <option value="">Select currency</option>
              <option value="USDT">USDT</option>
              <option value="NGN">NGN</option>
              <option value="GoToken">GoToken</option>
            </select>
          </div>
          <Button
            type={"button"}
            content={isLoading ? "Loading..." : "Swap"}
            onClick={() => handleSwap()}
          />
        </form>
      </div>
    </Modal>
  );
}
