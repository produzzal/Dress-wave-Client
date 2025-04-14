"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface DeleteProductProps {
  productId: string;
  onDeleteSuccess?: () => void; // Optional callback after successful delete
}

export default function DeleteProduct({
  productId,
  onDeleteSuccess,
}: DeleteProductProps) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const cleanToken = token.replace(/^"|"$/g, "");
      setAccessToken(cleanToken);
    }
  }, []);

  const handleDelete = async () => {
    if (!accessToken) {
      toast.error("Access token not found");
      return;
    }

    const confirm = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirm) return;

    setIsDeleting(true);
    try {
      const res = await fetch(
        `https://dress-wave-server.vercel.app/api/products/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const result = await res.json();

      if (result.success === true) {
        toast.success(result.message || "Product deleted successfully");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        if (onDeleteSuccess) onDeleteSuccess();
      } else {
        toast.error(result.message || "Failed to delete product");
      }
    } catch (err) {
      toast.error("Error: " + (err as Error).message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div>
      {/* PC button */}
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-[5px] rounded hidden md:inline-block"
      >
        {isDeleting ? "Deleting..." : "🚫 Delete"}
      </button>

      {/* Mobile button */}
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="bg-red-500 hover:bg-red-600 text-white text-sm px-12 py-1 rounded md:hidden w-full"
      >
        {isDeleting ? "Deleting..." : "🚫 Delete"}
      </button>
    </div>
  );
}
