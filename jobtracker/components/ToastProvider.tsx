"use client";

import { ToastContainer } from "react-toastify";
import { useTheme } from "@/components/theme-provider";
import "react-toastify/dist/ReactToastify.css";

export default function ToastProvider() {
  const { theme } = useTheme();

  return (
    <ToastContainer
      position="bottom-right"
      theme={theme}
      autoClose={3000}
      newestOnTop
      closeOnClick
      pauseOnHover
    />
  );
}
