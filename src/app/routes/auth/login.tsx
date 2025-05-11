import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

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

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [siteName, setSiteName] = useState("Smart P2P Circle");
  const [loginEnabled, setLoginEnabled] = useState(true);

  const device_name = getDeviceName();
  const navigate = useNavigate();

  // Check token on load
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  // Fetch system config
  useEffect(() => {
    const fetchSystemConfig = async () => {
      try {
        const res = await fetch(`${baseUrl}system-config`);
        const result = await res.json();

        if (result.success) {
          setSiteName(result.data.sitename || "Smart P2P Circle");
          setLoginEnabled(result.data.login === 1);
        } else {
          toast.error("Failed to load system config.");
        }
      } catch (err) {
        toast.error("System config error.");
      }
    };

    fetchSystemConfig();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEnabled) {
      toast.error("Login is currently disabled by admin.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${baseUrl}login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, device_name }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      if (data.success === true) {
        const token = data.token;
        rememberMe
            ? localStorage.setItem("authToken", token)
            : sessionStorage.setItem("authToken", token);

        toast.success(data.message || "Login successful");
        window.location.href = "/dashboard";
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error: any) {
      toast.error(error.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="min-h-screen bg-[#050A1A] flex flex-col">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="inline-flex items-center text-white hover:text-primary transition">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <Link to="/" className="inline-block">
                <h4 className="text-center font-gothic">
                  {siteName?.toUpperCase()} <span className="text-primary font-gothic">P2P</span> CIRCLE
                </h4>
              </Link>
              <h1 className="text-2xl font-bold mt-6 mb-2">Welcome Back</h1>
              <p className="text-gray-400">Sign in to your {siteName} trading account</p>
            </div>

            <div className="bg-[#070D20] rounded-xl border border-gray-800 p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium">Email Address</label>
                  <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-[#0A1128] border border-gray-700 rounded-lg focus:outline-none focus:border-primary text-white"
                      placeholder="Enter your email"
                      required
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label htmlFor="password" className="block text-sm font-medium">Password</label>
                    <Link to="/forgot-password" className="text-sm text-primary hover:underline">Forgot password?</Link>
                  </div>
                  <div className="relative">
                    <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 bg-[#0A1128] border border-gray-700 rounded-lg focus:outline-none focus:border-primary text-white pr-10"
                        placeholder="Enter your password"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                      id="remember-me"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-700 bg-[#0A1128] text-primary focus:ring-primary"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">Remember me</label>
                </div>

                <button
                    type="submit"
                    disabled={loading || !loginEnabled}
                    className={`w-full px-4 py-3 rounded-lg font-medium transition ${
                        loading || !loginEnabled
                            ? "bg-gray-500 cursor-not-allowed"
                            : "bg-primary hover:bg-yellow-500 text-black"
                    }`}
                >
                  {loading ? "Signing in..." : "Sign In"}
                </button>
              </form>

              <div className="mt-6">
                {/*<div className="relative">*/}
                {/*  <div className="absolute inset-0 flex items-center">*/}
                {/*    <div className="w-full border-t border-gray-700"></div>*/}
                {/*  </div>*/}
                {/*  <div className="relative flex justify-center text-sm">*/}
                {/*    <span className="px-2 bg-[#070D20] text-gray-400">Or continue with</span>*/}
                {/*  </div>*/}
                {/*</div>*/}

                {/*<div className="mt-6 grid grid-cols-3 gap-3">*/}
                {/*  /!* Social Login Buttons *!/*/}
                {/*  {["facebook", "google", "twitter"].map((name, i) => (*/}
                {/*      <button key={i} className="flex justify-center items-center py-2.5 border border-gray-700 rounded-lg hover:bg-[#0A1128] transition">*/}
                {/*        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">*/}
                {/*          /!* Placeholder icon paths *!/*/}
                {/*          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />*/}
                {/*        </svg>*/}
                {/*      </button>*/}
                {/*  ))}*/}
                {/*</div>*/}
              </div>
            </div>

            <div className="text-center mt-8">
              <p className="text-gray-400">
                Don&apos;t have an account?{" "}
                <Link to="/register" className="text-primary hover:underline">Sign up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
  );
}
