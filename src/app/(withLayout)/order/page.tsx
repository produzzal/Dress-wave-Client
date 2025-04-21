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
  const [paymentMethod, setPaymentMethod] =
    useState<string>("Cash on Delivery");

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [couponSubmitted, setCouponSubmitted] = useState(false);

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
    "Narsingdi",
    "Manikganj",
    "Munshiganj",
    "Kishoreganj",
    "Rajbari",
    "Madaripur",
    "Shariatpur",
    "Gopalganj",
    "Feni",
    "Chandpur",
    "Lakshmipur",
    "Khagrachhari",
    "Rangamati",
    "Bandarban",
    "Naogaon",
    "Natore",
    "Joypurhat",
    "Chapainawabganj",
    "Sirajganj",
    "Satkhira",
    "Bagerhat",
    "Magura",
    "Jhenaidah",
    "Meherpur",
    "Narail",
    "Chuadanga",
    "Kushtia",
    "Bhola",
    "Patuakhali",
    "Barguna",
    "Jhalokathi",
    "Pirojpur",
    "Moulvibazar",
    "Habiganj",
    "Sunamganj",
    "Thakurgaon",
    "Panchagarh",
    "Kurigram",
    "Nilphamari",
    "Gaibandha",
    "Lalmonirhat",
    "Jamalpur",
    "Netrokona",
    "Sherpur",
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
    setCustomer({ ...customer, [name]: value });
  };

  const handleCouponApply = () => {
    setIsCouponValid(coupon.trim().toUpperCase() === "FREESHIP");
    setCouponSubmitted(true);
  };

  const handlePaymentMethodChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPaymentMethod(e.target.value);
  };

  const handlePlaceOrder = async () => {
    setFormSubmitted(true); // Mark form as submitted

    const { name, email, phone, city, shippingAddress } = customer;
    if (!name || !email || !phone || !city || !shippingAddress) {
      toast.error("Please fill in all required fields.");
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
      const res = await fetch(
        "https://dress-wave-server.vercel.app/api/orders",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        }
      );

      const result = await res.json();
      if (result.success === true) {
        toast.success(result.message);
        localStorage.removeItem("cart");
        setTimeout(() => {
          router.push("/");
        }, 2000);
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
        {formSubmitted && !customer.name && (
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
        {formSubmitted && !customer.email && (
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
        {formSubmitted && !customer.phone && (
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
        {formSubmitted && !customer.city && (
          <p className="text-red-500 text-sm">This field is required.</p>
        )}

        <textarea
          name="shippingAddress"
          value={customer.shippingAddress}
          onChange={handleChange}
          placeholder="Detailed Address"
          className="w-full mb-3 p-2 border rounded"
          rows={3}
        ></textarea>
        {formSubmitted && !customer.shippingAddress && (
          <p className="text-red-500 text-sm">This field is required.</p>
        )}

        {/* Coupon Section */}
        <div className="mt-4">
          <input
            type="text"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            placeholder="Enter Coupon Code"
            className="w-full p-2 border rounded mb-3"
          />
          <button
            onClick={handleCouponApply}
            className="w-full py-2 bg-green-500 text-white rounded"
          >
            Apply Coupon
          </button>
          {isCouponValid && <p className="text-green-500">Coupon applied!</p>}
          {!isCouponValid && couponSubmitted && coupon.trim() && (
            <p className="text-red-500">Invalid coupon code</p>
          )}
        </div>

        {/* Payment Method Section */}
        <div className="mt-4">
          <h3 className="font-semibold">Payment Method</h3>
          <div className="space-y-2">
            <label>
              <input
                type="radio"
                value="Cash on Delivery"
                checked={paymentMethod === "Cash on Delivery"}
                onChange={handlePaymentMethodChange}
              />{" "}
              Cash on Delivery
            </label>
            <label>
              <input
                type="radio"
                value="Credit Card"
                checked={paymentMethod === "Credit Card"}
                onChange={handlePaymentMethodChange}
              />{" "}
              Credit Card
            </label>
            <label>
              <input
                type="radio"
                value="PayPal"
                checked={paymentMethod === "PayPal"}
                onChange={handlePaymentMethodChange}
              />{" "}
              PayPal
            </label>
          </div>
        </div>
      </div>

      {/* Right - Order Summary */}
      <div className="md:w-1/2 bg-white p-6 rounded shadow">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold mb-4">Your Order</h2>
          <Link
            href="/cart"
            className="px-3 py-1 text-white bg-yellow-500 hover:bg-yellow-600 rounded"
          >
            ✏️ Edit Order
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
                className="w-16 h-16 object-cover"
              />
              <div className="flex-1">
                <p className="text-lg">{item.productName}</p>
                <p className="text-gray-500">{item.size}</p>
                <p className="text-gray-500">{item.color}</p>
              </div>

              <p className="text-gray-500">
                ৳{item.price} x {item.quantity}
              </p>
              <p className="text-gray-500">৳{item.price * item.quantity}</p>
            </div>
          ))}

          <div className="flex justify-between mt-4">
            <p>Items Price</p>
            <p>৳{itemsPrice}</p>
          </div>
          <div className="flex justify-between">
            <p>Shipping</p>
            {isCouponValid ? <p>Coupon Applied</p> : <p>৳{shippingPrice}</p>}
          </div>
          <div className="flex justify-between font-semibold text-lg">
            <p>Total</p>
            <p>৳{totalPrice}</p>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="w-full py-3 bg-blue-500 text-white rounded mt-6"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderPage;
