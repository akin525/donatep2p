import type React from "react";
import { useState } from "react";
import { Link } from "react-router";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";


const getDeviceName = () => {
  const ua = navigator.userAgent;
  const platform = navigator.platform;
  const browser = (() => {
    if (ua.includes("Firefox")) return "Firefox";
    if (ua.includes("Chrome")) return "Chrome";
    if (ua.includes("Safari")) return "Safari";
    if (ua.includes("Edg")) return "Edge";
    return "Unknown";
  })();

  return `${platform} ${browser}`;
};


export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    bep_address: "",
    country: "",
    email: "",
    phone: "",
    referralCode: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });
  const [loading, setLoading] = useState(false);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true); // ✅ Start loading


    const payload = {
      firstname:formData.firstName,
      lastname: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      bep_address: formData.bep_address,
      country: formData.country,
      referral: formData.referralCode || "",
      device_name: getDeviceName(),
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success === true) {
        const token = data.token;
        sessionStorage.setItem("authToken", token);
        toast.success(data.message || "Account created successfully",);
        window.location.href = "/dashboard";
      } else {
        toast.error(data.message || "Registration failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Network error occurred");
    } finally {
      setLoading(false); // ✅ End loading
    }

  };

  return (
      <div className="min-h-screen bg-[#050A1A] flex flex-col">
        <div className="container mx-auto px-4 py-4">
          <Link
              to="/"
              className="inline-flex items-center text-white hover:text-primary transition"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <Link to="/" className="inline-block">
                <img
                    src="/logo.png"
                    alt="TL Logo"
                    width={120}
                    height={60}
                    className="h-16 w-auto mx-auto"
                />
              </Link>
              <h1 className="text-2xl font-bold mt-6 mb-2">
                Create Your Account
              </h1>
              <p className="text-gray-400">
                Join TradeLink Trading and start trading cryptocurrencies
              </p>
            </div>

            <div className="bg-[#070D20] rounded-xl border border-gray-800 p-8">
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {id: "firstName", label: "First Name", type: "text", placeholder: "Enter your first name"},
                  {id: "lastName", label: "Last Name", type: "text", placeholder: "Enter your last name"},
                  {id: "username", label: "Username", type: "text", placeholder: "Choose a username"},
                  {
                    id: "bep_address",
                    label: "USDT Wallet Address (BEP20)",
                    type: "text",
                    placeholder: "Enter USDT Wallet Address (BEP20)"
                  },
                  {id: "country", label: "Country", type: "text", placeholder: "Enter your country"},
                  {id: "email", label: "Email Address", type: "email", placeholder: "Enter your email"},
                  {id: "phone", label: "Phone Number", type: "tel", placeholder: "Enter your phone number"},
                  {
                    id: "referralCode",
                    label: "Referral Code (Optional)",
                    type: "text",
                    placeholder: "Enter referral code"
                  },
                ].map(({id, label, type, placeholder}) => (
                    <div key={id} className="space-y-2">
                      <label htmlFor={id} className="block text-sm font-medium">
                        {label}
                      </label>
                      <input
                          id={id}
                          name={id}
                          type={type}
                          value={formData[id as keyof typeof formData] as string}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-[#0A1128] border border-gray-700 rounded-lg focus:outline-none focus:border-primary text-white"
                          placeholder={placeholder}
                          required={id !== "referralCode"}
                      />
                    </div>
                ))}

                {/* Password and Confirm Password - span both columns */}
                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="password" className="block text-sm font-medium">Password</label>
                  <div className="relative">
                    <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[#0A1128] border border-gray-700 rounded-lg focus:outline-none focus:border-primary text-white pr-10"
                        placeholder="Create a password"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5"/> : <Eye className="h-5 w-5"/>}
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Password must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number
                  </p>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium">Confirm Password</label>
                  <div className="relative">
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[#0A1128] border border-gray-700 rounded-lg focus:outline-none focus:border-primary text-white pr-10"
                        placeholder="Confirm your password"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5"/> : <Eye className="h-5 w-5"/>}
                    </button>
                  </div>
                </div>

                {/* Terms checkbox - full width */}
                <div className="md:col-span-2">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                          id="agreeTerms"
                          name="agreeTerms"
                          type="checkbox"
                          checked={formData.agreeTerms}
                          onChange={handleChange}
                          className="h-4 w-4 rounded border-gray-700 bg-[#0A1128] text-primary focus:ring-primary"
                          required
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="agreeTerms" className="text-gray-300">
                        I agree to the{" "}
                        <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>{" "}
                        and{" "}
                        <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Submit button - full width */}
                <div className="md:col-span-2">
                  <button
                      type="submit"
                      disabled={loading}
                      className={`w-full px-4 py-3 rounded-lg font-medium transition ${
                          loading
                              ? "bg-gray-600 cursor-not-allowed"
                              : "bg-primary text-black hover:bg-yellow-500"
                      }`}
                  >
                    {loading ? "Creating..." : "Create Account"}
                  </button>

                </div>
              </form>

              {/* Divider */}
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-700"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-[#070D20] text-gray-400">
                    Or sign up with
                  </span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  <button
                      className="flex justify-center items-center py-2.5 border border-gray-700 rounded-lg hover:bg-[#0A1128] transition">
                    <svg
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                      <path
                          d="M12.0003 2.00001C6.47731 2.00001 2.00031 6.47701 2.00031 12C2.00031 16.991 5.65731 21.127 10.4373 21.88V14.892H7.89931V12H10.4373V9.79701C10.4373 7.29001 11.9313 5.90701 14.2153 5.90701C15.3103 5.90701 16.4543 6.10201 16.4543 6.10201V8.56201H15.1913C13.9503 8.56201 13.5633 9.33301 13.5633 10.124V12H16.3363L15.8933 14.892H13.5633V21.88C18.3433 21.129 22.0003 16.992 22.0003 12C22.0003 6.47701 17.5233 2.00001 12.0003 2.00001Z"/>
                    </svg>
                  </button>
                  <button
                      className="flex justify-center items-center py-2.5 border border-gray-700 rounded-lg hover:bg-[#0A1128] transition">
                    <svg
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                      <path
                          d="M21.8,10.4h-9.8v3.8h5.7c-0.5,2.4-2.7,4.1-5.7,4.1c-3.4,0-6.2-2.8-6.2-6.2s2.8-6.2,6.2-6.2c1.5,0,2.9,0.5,4,1.4l2.9-2.9 C17.1,2.7,14.7,1.6,12,1.6c-5.7,0-10.4,4.7-10.4,10.4S6.3,22.4,12,22.4c5.1,0,9.8-3.8,9.8-10.4C21.8,11.5,21.8,10.9,21.8,10.4z"/>
                    </svg>
                  </button>
                  <button
                      className="flex justify-center items-center py-2.5 border border-gray-700 rounded-lg hover:bg-[#0A1128] transition">
                    <svg
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                      <path
                          d="M22.1,12c0-5.6-4.5-10.1-10.1-10.1S1.9,6.4,1.9,12c0,5,3.7,9.2,8.6,10v-7.1H7.8V12h2.7V9.8c0-2.7,1.6-4.1,4-4.1 c1.2,0,2.4,0.2,2.4,0.2v2.6h-1.3c-1.3,0-1.7,0.8-1.7,1.6V12h2.9l-0.5,3h-2.4v7.1C18.4,21.2,22.1,17,22.1,12z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <p className="text-gray-400">
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
  );
}
