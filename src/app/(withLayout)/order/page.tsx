/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

interface CartItem {
  productId: any;
  _id: string;
  productName: string;
  thumbnail: string;
  size?: string;
  color?: string;
  quantity: number;
  price: number;
}

interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  shippingAddress: string;
  city: string;
}

const PlaceOrderPage = () => {
  const router = useRouter();
  const [customer, setCustomer] = useState<CustomerInfo>({
    name: "",
    email: "",
    phone: "",
    shippingAddress: "",
    city: "",
  });

  const [cart, setCart] = useState<CartItem[]>([]);
  const [itemsPrice, setItemsPrice] = useState(0);
  const [coupon, setCoupon] = useState("");
  const [isCouponValid, setIsCouponValid] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [paymentMethod, setPaymentMethod] =
    useState<string>("Cash on Delivery");

  const shippingPrice = isCouponValid ? 0 : 80;
  const totalPrice = itemsPrice + shippingPrice;

  const bdCities = [
    "Dhaka",
    "Chattogram",
    "Khulna",
    "Rajshahi",
    "Barishal",
    "Sylhet",
    "Rangpur",
    "Mymensingh",
    "Cumilla",
    "Gazipur",
    "Narayanganj",
    "Bogra",
    "Jessore",
    "Cox's Bazar",
    "Pabna",
    "Tangail",
    "Noakhali",
    "Brahmanbaria",
    "Dinajpur",
    "Faridpur",
  ];

  useEffect(() => {
    const storedCustomer = localStorage.getItem("user");
    if (storedCustomer) setCustomer(JSON.parse(storedCustomer));

    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const cartData: CartItem[] = JSON.parse(storedCart);
      setCart(cartData);
      const subtotal = cartData.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      setItemsPrice(subtotal);
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    const updatedCustomer = { ...customer, [name]: value };
    setCustomer(updatedCustomer);
  };

  const handleCouponApply = () => {
    setIsCouponValid(coupon.trim().toUpperCase() === "FREESHIP");
  };
  const handlePaymentMethodChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPaymentMethod(e.target.value);
  };

  const handlePlaceOrder = async () => {
    const { name, email, phone, city, shippingAddress } = customer;

    if (!name || !email || !phone || !city || !shippingAddress) {
      alert("Please fill in all required fields.");
      return;
    }
    const orderData = {
      customer,
      items: cart.map((item) => ({
        productId: item.productId,
        productName: item.productName,
        image: item.thumbnail,
        size: item.size,
        color: item.color,
        quantity: item.quantity,
        price: item.price,
      })),
      summary: {
        itemsPrice,
        shippingPrice,
        totalPrice,
      },
      paymentStatus: paymentMethod === "Cash on Delivery" ? "pending" : "paid",
      paymentMethod,
    };
    try {
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const result = await res.json();
      if (result.success === true) {
        toast.success(result.message);
        setPaymentCompleted(true);
        localStorage.removeItem("cart");
        setTimeout(() => {
          router.push("/");
        });
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      console.error("Order failed:", err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row p-6 gap-6">
      {/* Left - Customer Info */}
      <div className="md:w-1/2 bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
        <input
          type="text"
          name="name"
          value={customer.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full mb-3 p-2 border rounded"
        />
        {!customer.name && (
          <p className="text-red-500 text-sm">This field is required.</p>
        )}

        <input
          type="email"
          name="email"
          value={customer.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
        />
        {!customer.email && (
          <p className="text-red-500 text-sm">This field is required.</p>
        )}

        <input
          type="text"
          name="phone"
          value={customer.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="w-full mb-3 p-2 border rounded"
        />
        {!customer.phone && (
          <p className="text-red-500 text-sm">This field is required.</p>
        )}

        <select
          name="city"
          value={customer.city}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        >
          <option value="">Select City</option>
          {bdCities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        {!customer.city && (
          <p className="text-red-500 text-sm">This field is required.</p>
        )}

        <textarea
          name="shippingAddress"
          value={customer.shippingAddress}
          onChange={handleChange}
          placeholder="Shipping Address"
          className="w-full mb-3 p-2 border rounded"
          rows={3}
        ></textarea>
        {!customer.shippingAddress && (
          <p className="text-red-500 text-sm">This field is required.</p>
        )}
      </div>

      {/* Right - Cart Summary */}
      <div className="md:w-1/2 bg-white p-6 rounded shadow">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold mb-4">Your Order</h2>
          <Link
            href="/cart"
            className="px-3 py-1 text-white bg-yellow-500 hover:bg-yellow-600 rounded"
          >
            ✏️Edit Order
          </Link>
        </div>
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex items-center gap-4 border-b pb-2"
            >
              <img
                src={item.thumbnail}
                alt={item.productName}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1">
                <p className="font-medium">{item.productName}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                {item.size && (
                  <p className="text-sm text-gray-500">Size: {item.size}</p>
                )}
                {item.color && (
                  <p className="text-sm text-gray-500">Color: {item.color}</p>
                )}
              </div>
              <div className="font-semibold">
                ৳{(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        {/* Coupon */}
        <div className="mt-6">
          <label className="block text-sm font-medium mb-1">Coupon Code</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="flex-1 p-2 border rounded"
              placeholder="Enter code like FREESHIP"
            />
            <button
              onClick={handleCouponApply}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Apply
            </button>
          </div>
          {isCouponValid && (
            <p className="text-green-600 text-sm mt-2">
              Coupon applied: Free shipping!
            </p>
          )}
        </div>

        {/* Summary */}
        <div className="mt-6 border-t pt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Items Price</span>
            <span>৳{itemsPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>৳{shippingPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-base">
            <span>Total</span>
            <span>৳{totalPrice.toFixed(2)}</span>
          </div>
        </div>

        {/* Payment Section - Always visible */}
        <div className="mt-6 p-4 bg-green-50 border border-green-300 rounded">
          <h3 className="text-lg font-semibold mb-2">Choose Payment Method</h3>

          {/* Payment Method Selection */}
          <div className="space-y-3">
            <div>
              <input
                type="radio"
                id="cashOnDelivery"
                name="paymentMethod"
                value="Cash on Delivery"
                checked={paymentMethod === "Cash on Delivery"}
                onChange={handlePaymentMethodChange}
                className="mr-2"
              />
              <label htmlFor="cashOnDelivery" className="text-sm">
                Cash on Delivery
              </label>
            </div>

            <div>
              <input
                type="radio"
                id="visaCard"
                name="paymentMethod"
                value="Visa Card"
                checked={paymentMethod === "Visa Card"}
                onChange={handlePaymentMethodChange}
                className="mr-2"
              />
              <label htmlFor="visaCard" className="text-sm">
                Visa Card
              </label>
              {paymentMethod === "Visa Card" && (
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="Card Number"
                    className="w-full p-2 border rounded mb-2"
                  />
                  <input
                    type="text"
                    placeholder="Expiration Date"
                    className="w-full p-2 border rounded mb-2"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    className="w-full p-2 border rounded"
                  />
                </div>
              )}
            </div>

            <div>
              <input
                type="radio"
                id="bKash"
                name="paymentMethod"
                value="bKash"
                checked={paymentMethod === "bKash"}
                onChange={handlePaymentMethodChange}
                className="mr-2"
              />
              <label htmlFor="bKash" className="text-sm">
                bKash
              </label>
              {paymentMethod === "bKash" && (
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="bKash Number"
                    className="w-full p-2 border rounded mb-2"
                  />
                </div>
              )}
            </div>

            <div>
              <input
                type="radio"
                id="nagad"
                name="paymentMethod"
                value="Nagad"
                checked={paymentMethod === "Nagad"}
                onChange={handlePaymentMethodChange}
                className="mr-2"
              />
              <label htmlFor="nagad" className="text-sm">
                Nagad
              </label>
              {paymentMethod === "Nagad" && (
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="Nagad Number"
                    className="w-full p-2 border rounded mb-2"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Confirm Payment Button */}
          <button
            onClick={handlePlaceOrder}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition mt-4"
          >
            Confirm Payment
          </button>
        </div>

        {paymentCompleted && (
          <div className="mt-6 text-center text-green-700 font-bold">
            ✅ Payment successful! Thank you for your order.
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaceOrderPage;
