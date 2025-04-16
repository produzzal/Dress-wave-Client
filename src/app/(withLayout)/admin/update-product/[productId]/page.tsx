/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "react-toastify";
import { TProduct } from "@/components/utils/types/product.interface";
import Loading from "@/app/loading";

export default function UpdateProductPage({ params }: { params: any }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { productId }: { productId: any } = React.use(params);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<TProduct>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "images",
  });

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const cleanToken = token.replace(/^"|"$/g, "");
      setAccessToken(cleanToken);
    }

    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `https://dress-wave-server.vercel.app/api/products/${productId}`
        );
        const data = await res.json();

        if (data?.data) {
          reset({
            ...data.data,
            images: data.data.images?.map((url: string) => ({ url })),
          });
        } else {
          toast.error("Product not found");
        }
      } catch (err) {
        toast.error("Failed to fetch product");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId, reset]);

  const onSubmit = async (data: TProduct) => {
    if (!accessToken) {
      toast.error("Access token not found");
      return;
    }

    const payload = {
      ...data,
      images: data.images?.map((img) => img.url),
      color: data.color
        ? String(data.color)
            .split(",")
            .map((color) => color.trim())
        : [],
      size: data.size
        ? String(data.size)
            .split(",")
            .map((size) => size.trim())
        : [],
    };

    try {
      const res = await fetch(
        `https://dress-wave-server.vercel.app/api/products/${productId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(payload),
          credentials: "include",
        }
      );
      console.log(data);

      const result = await res.json();
      console.log(result);

      if (result.success) {
        toast.success(result.message || "Product updated successfully!");
      } else {
        toast.error(result.message || "Failed to update product");
      }
    } catch (err) {
      toast.error("Error: " + (err as Error).message);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      <h1 className="text-2xl text-center font-semibold text-gray-500">
        Update Product (Admin View)
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {[
          { name: "productName", label: "Product Name", type: "text" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "price", label: "Price", type: "number" },
          { name: "discountPrice", label: "Discount Price", type: "number" },
          { name: "material", label: "Material", type: "text" },
          { name: "brand", label: "Brand", type: "text" },
          { name: "category", label: "Category", type: "text" },
          { name: "subcategory", label: "Subcategory", type: "text" },
          { name: "stockAvailability", label: "Stock", type: "number" },
          { name: "thumbnail", label: "Thumbnail URL", type: "text" },
        ].map(({ name, label, type }) => (
          <div key={name}>
            <label className="block font-medium mb-1">{label}</label>
            {type === "textarea" ? (
              <textarea
                {...register(name as keyof TProduct)}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <input
                type={type}
                {...register(name as keyof TProduct)}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            )}
          </div>
        ))}
        <div>
          <label className="block font-medium mb-1">Color</label>
          <input
            {...register("color", { required: false })}
            placeholder="e.g. red, yellow"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Size</label>
          <input
            {...register("size", { required: false })}
            placeholder="e.g. S, M, L"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block font-medium mb-2">Images</label>
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-3 items-center mb-2">
              <input
                {...register(`images.${index}.url`)}
                placeholder={`Image URL ${index + 1}`}
                className="flex-1 p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => append({ url: "" })}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            + Add Image
          </button>
        </div>

        <button
          type="submit"
          className="w-full py-3 mt-6 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"
        >
          Update Product
        </button>
      </form>
    </div>
  );
}
