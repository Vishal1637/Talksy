import { useState, useEffect } from "react";
import { ShipWheelIcon, LoaderIcon, CameraIcon } from "lucide-react";
import { Link } from "react-router";
import useLogin from "../hooks/useLogin";

// Enhanced floating bubbles background with more variety
const FloatingBubbles = () => {
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    const tempBubbles = [];
    for (let i = 0; i < 25; i++) {
      tempBubbles.push({
        id: i,
        size: Math.random() * 100 + 40,
        left: Math.random() * 100,
        duration: Math.random() * 30 + 25,
        delay: Math.random() * 8,
        color: ['primary', 'secondary', 'accent', 'info'][Math.floor(Math.random() * 4)],
        shape: Math.random() > 0.5 ? 'rounded-full' : 'rounded-2xl',
      });
    }
    setBubbles(tempBubbles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {bubbles.map((b) => (
        <div
          key={b.id}
          className={`absolute ${b.shape} bg-${b.color}/12 blur-2xl animate-float opacity-50 hover:opacity-90 transition-all duration-1000 hover:scale-110`}
          style={{
            width: `${b.size}px`,
            height: `${b.size}px`,
            left: `${b.left}%`,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
            bottom: `-${b.size}px`,
          }}
        />
      ))}
    </div>
  );
};

const LoginPage = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const { isPending, error, loginMutation } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-tr from-primary/10 via-secondary/5 to-accent/10 p-4 overflow-hidden">
      <FloatingBubbles />

      <div className="relative z-10 border border-primary/20 flex flex-col lg:flex-row w-full max-w-5xl bg-base-100 rounded-2xl shadow-2xl overflow-hidden animate-fade-in">

        {/* LOGIN FORM */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 flex flex-col space-y-6">
          {/* LOGO */}
          <div className="flex items-center gap-2 animate-slide-up bounce-gentle">
            <ShipWheelIcon className="size-9 text-primary float-animation" />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
              Talksy
            </span>
          </div>

          {/* ERROR MESSAGE */}
          {error && (
            <div className="alert alert-error animate-slide-up shadow-lg border border-error/20 bg-error/10 backdrop-blur-sm">
              <span className="font-medium">{error.response?.data?.message || "Something went wrong"}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5 animate-slide-up">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Welcome Back
              </h2>
              <p className="text-base opacity-80 text-base-content/80">
                Sign in to your account to continue your language journey
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {/* EMAIL */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-base-content/90">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="hello@example.com"
                  className="input w-full focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 focus:scale-[1.02] bg-base-100/80 backdrop-blur-sm border-base-300/50 hover:border-primary/50"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  required
                />
              </div>

              {/* PASSWORD */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-base-content/90">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="input w-full focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 focus:scale-[1.02] bg-base-100/80 backdrop-blur-sm border-base-300/50 hover:border-primary/50"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  required
                />
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                className="btn btn-primary w-full flex items-center justify-center gap-3 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] hover:scale-105 transition-all duration-300 font-semibold text-lg py-3 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 relative overflow-hidden group"
                disabled={isPending}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {!isPending ? (
                  <>
                    <ShipWheelIcon className="size-5 group-hover:rotate-180 transition-transform duration-500 relative z-10" />
                    <span className="relative z-10">Sign In</span>
                  </>
                ) : (
                  <>
                    <LoaderIcon className="animate-spin size-5 relative z-10" />
                    <span className="relative z-10">Signing In...</span>
                  </>
                )}
              </button>

              <div className="text-center mt-6 animate-slide-up">
                <p className="text-base text-base-content/80">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-primary hover:text-secondary font-semibold hover:underline transition-all duration-300 relative group"
                  >
                    Create one
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>

        {/* IMAGE / ILLUSTRATION */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8 text-center space-y-4 animate-float">
            <div className="relative aspect-square max-w-sm mx-auto">
              <img src="/i.png" alt="Language illustration" className="w-full h-full hover:scale-105 transition-transform duration-500" />
            </div>
            <h2 className="text-xl font-semibold">Connect with language partners worldwide</h2>
            <p className="opacity-70">
              Practice conversations, make friends, and improve your language skills together
            </p>
          </div>
        </div>
      </div>

      {/* Tailwind Animations */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0); opacity: 0.5; }
            50% { transform: translateY(-50vh); opacity: 0.2; }
            100% { transform: translateY(-100vh); opacity: 0; }
          }
          .animate-float { animation-name: float; animation-iteration-count: infinite; animation-timing-function: linear; }
          @keyframes slide-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
          .animate-slide-up { animation: slide-up 0.6s ease forwards; }
          @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
          .animate-fade-in { animation: fade-in 0.6s ease forwards; }
        `}
      </style>
    </div>
  );
};

export default LoginPage;
