import { useState } from "react";

import useStore from "../hooks/useStore";
import axiosI from "../lib/axiosInstance";

const Topbar = () => {
  const { checkedImg } = useStore();
  const [isLoading, setIsLoading] = useState(false);
  // handlers
  const handleClick = async () => {
    if (checkedImg.length === 0) return;
    try {
      setIsLoading(true);
      await axiosI.delete("/", { data: { items: checkedImg } });

      window.location.reload();
    } catch (error) {
      console.log("DEL_ERROR");
    } finally {
      setIsLoading(false);
    }
  };

  const itemsContent =
    checkedImg.length > 0
      ? `${checkedImg.length} items selected`
      : "No items selected";
  return (
    <div className="bg-white rounded-t px-8 md:px-12 py-4 md:py-6 flex justify-between items-center mt-4">
      <div className="font-semibold text-base md:text-lg">{itemsContent}</div>
      <button
        disabled={isLoading}
        className="text-rose-500 cursor-pointer font-semibold transition hover:opacity-80 disabled:cursor-not-allowed"
        onClick={handleClick}
      >
        Delete files
      </button>
    </div>
  );
};

export default Topbar;
