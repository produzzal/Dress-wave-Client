/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const CartPage = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Calculate subtotal based on discount price
  const getSubtotal = (item: any) => {
    const priceToUse = item.discountPrice > 0 ? item.discountPrice : item.price;
    return priceToUse * item.quantity;
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + getSubtotal(item),
    0
  );

  const handleDelete = (
    itemId: string,
    itemSize: string,
    itemColor: string
  ) => {
    const updatedCart = cartItems.filter(
      (item) =>
        !(
          item.id === itemId &&
          item.color === itemColor &&
          item.size === itemSize
        )
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Item Deleted Successfully");
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  const handleQuantityChange = (
    itemId: string,
    itemColor: string,
    itemSize: string,
    newQuantity: number
  ) => {
    const updatedCart = cartItems.map((item) =>
      item.id === itemId && item.color === itemColor && item.size === itemSize
        ? { ...item, quantity: newQuantity }
        : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update localStorage
  };

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      toast.error(
        "Your cart is empty. Please add products to cart before placing order."
      );
      return;
    }
    router.push("/order");
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center my-5">Your Cart Items</h1>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 text-left">Image</th>
              <th className="py-2 px-4 text-left">Product Name</th>
              <th className="py-2 px-4 text-left">Unit Price</th>
              <th className="py-2 px-4 text-left">Color</th>
              <th className="py-2 px-4 text-left">Size</th>
              <th className="py-2 px-4 text-left">Quantity</th>
              <th className="py-2 px-4 text-left">Subtotal</th>
              <th className="py-2 px-4 text-left">Delete</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-4 text-center">
                  Your cart is empty.
                </td>
              </tr>
            ) : (
              cartItems.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="py-2 px-4">
                    <img
                      src={item.thumbnail}
                      alt={item.productName}
                      width={64}
                      height={64}
                      className="object-cover rounded"
                    />
                  </td>
                  <td className="py-2 px-4">{item.productName}</td>
                  <td className="py-2 px-4">
                    {item.discountPrice > 0 ? (
                      <>
                        <span className="line-through text-gray-400">
                          ৳{item.price}
                        </span>
                        <span className="ml-2 text-red-500">
                          ৳{item.discountPrice}
                        </span>
                      </>
                    ) : (
                      `৳${item.price}`
                    )}
                  </td>
                  <td className="py-2 px-4">{item.color}</td>
                  <td className="py-2 px-4">{item.size}</td>
                  <td className="py-2 px-4">
                    <div className="flex items-center">
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item.id,
                            item.color,
                            item.size,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                        className="px-3 py-1 border rounded text-lg"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        readOnly
                        className="w-12 text-center border-l border-r"
                      />
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item.id,
                            item.color,
                            item.size,
                            item.quantity + 1
                          )
                        }
                        className="px-3 py-1 border rounded text-lg"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="py-2 px-4">৳{getSubtotal(item).toFixed(2)}</td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() =>
                        handleDelete(item.id, item.size, item.color)
                      }
                      className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-[5px] rounded"
                    >
                      🚫 Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {cartItems.length === 0 ? (
          <p className="text-center">Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg p-3 shadow-sm space-y-2"
            >
              <div className="flex gap-3">
                <img
                  src={item.thumbnail}
                  alt={item.productName}
                  width={64}
                  height={64}
                  className="rounded object-cover"
                />
                <div>
                  <p className="font-semibold">{item.productName}</p>
                  <p className="text-sm text-gray-600">Color: {item.color}</p>
                  <p className="text-sm text-gray-600">Size: {item.size}</p>
                  <p className="text-sm text-gray-600">
                    Price:{" "}
                    {item.discountPrice > 0 ? (
                      <>
                        <span className="line-through text-gray-400">
                          ৳{item.price}
                        </span>
                        <span className="ml-1 text-red-500">
                          ৳{item.discountPrice}
                        </span>
                      </>
                    ) : (
                      `৳${item.price}`
                    )}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      handleQuantityChange(
                        item.id,
                        item.color,
                        item.size,
                        item.quantity - 1
                      )
                    }
                    className="px-3 py-1 border rounded text-lg"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    readOnly
                    className="w-12 text-center border-l border-r"
                  />
                  <button
                    onClick={() =>
                      handleQuantityChange(
                        item.id,
                        item.color,
                        item.size,
                        item.quantity + 1
                      )
                    }
                    className="px-3 py-1 border rounded text-lg"
                  >
                    +
                  </button>
                </div>

                <div>
                  <p className="text-sm">
                    Subtotal: ৳{getSubtotal(item).toFixed(2)}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleDelete(item.id, item.size, item.color)}
                className="bg-red-500 hover:bg-red-600 text-white text-sm w-full py-1 rounded mt-2"
              >
                🚫 Delete
              </button>
            </div>
          ))
        )}
      </div>

      {/* Actions */}
      {cartItems.length > 0 && (
        <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xl font-semibold">
            Total: ৳{totalAmount.toFixed(2)}
          </div>
          <div className="flex gap-3">
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>
            <Link href="/shop">
              <button className="bg-yellow-600 text-white px-6 py-2 rounded hover:bg-yellow-700">
                Go for Shopping
              </button>
            </Link>
          </div>
        </div>
      )}

      {cartItems.length === 0 && (
        <div className="flex justify-center mt-6">
          <Link href="/shop">
            <button className="bg-yellow-600 text-white px-6 py-2 rounded hover:bg-yellow-700">
              Go for Shopping
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;
