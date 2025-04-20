"use client";

import Loading from "@/app/loading";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type Order = {
  _id: string;
  orderNumber: string;
  customer: { name: string; email: string };
  orderStatus: "processing" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
};

const OrderManagementPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("accessToken")?.replace(/^"|"$/g, "") || ""
      : "";

  const fetchOrders = async () => {
    setLoading(true);

    const res = await fetch("https://dress-wave-server.vercel.app/api/orders", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();
    setOrders(data.data || []);
    setLoading(false);
  };

  const handleUpdateStatus = async (
    id: string,
    newStatus: Order["orderStatus"]
  ) => {
    const res = await fetch(
      `https://dress-wave-server.vercel.app/api/orders/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ orderStatus: newStatus }),
      }
    );

    const result = await res.json();
    if (result.success) {
      toast.success(result.message);
      setTimeout(() => {
        fetchOrders();
      }, 200);
    } else {
      toast.error(result.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl text-center font-bold mb-4">
        📦 Order Management
      </h2>

      {loading ? (
        <Loading />
      ) : (
        <div className="grid md:grid-cols-2 gap-5">
          {orders.map((order) => (
            <div key={order._id} className="border rounded-xl p-4 shadow-sm">
              <p>
                <strong>Order #:</strong> {order.orderNumber}
              </p>
              <p>
                <strong>Customer:</strong> {order.customer.name} (
                {order.customer.email})
              </p>
              <p className="flex items-center gap-2">
                <strong>Status:</strong>
                {["processing", "shipped", "delivered", "cancelled"].map(
                  (status) => (
                    <button
                      key={status}
                      onClick={() =>
                        handleUpdateStatus(
                          order._id,
                          status as Order["orderStatus"]
                        )
                      }
                      className={`px-3 py-1 rounded border 
        ${
          order.orderStatus === status
            ? "bg-blue-500 text-white border-blue-600"
            : "bg-white text-gray-700 border-gray-300"
        }
        hover:bg-blue-600 transition duration-200`}
                    >
                      {status}
                    </button>
                  )
                )}
              </p>

              <p>
                <strong>Ordered:</strong>{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderManagementPage;
