import { useState } from "react";
import { ShipWheelIcon } from "lucide-react";
import { Link } from "react-router";
import useSignUp from "../hooks/useSignUp";

const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { isPending, error, signupMutation } = useSignUp();

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);
  };

  return (
    <div className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 bg-gradient-to-tr from-primary/10 via-secondary/5 to-accent/10 relative overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-secondary/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-info/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>
      <div className="flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100/70 backdrop-blur-md border border-primary/25 rounded-2xl shadow-2xl overflow-hidden">

        {/* LEFT FORM */}
        <div className="w-full lg:w-1/2 p-6 sm:p-8 flex flex-col justify-center">

          {/* LOGO */}
          <div className="mb-6 flex items-center justify-start gap-3 transition-transform duration-500 hover:animate-bounceHover bounce-gentle">
            <ShipWheelIcon className="size-9 text-primary float-animation" />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider drop-shadow-md">
              Talksy
            </span>
          </div>

          {error && (
            <div className="alert alert-error mb-6 shadow-lg border border-error/20 bg-error/10 backdrop-blur-sm animate-pulse">
              <span className="font-medium">{error.response?.data?.message || "Something went wrong"}</span>
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-6">

            <div className="text-center space-y-3 animate-fadeInUp">
              <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Create an Account
              </h2>
              <p className="text-lg opacity-80 text-base-content/80">Join Talksy and start your language learning adventure!</p>
            </div>

            {/* FULLNAME */}
            <div className="form-control w-full animate-fadeInUp">
              <label className="label">
                <span className="label-text font-semibold text-base-content/90">Full Name</span>
              </label>
              <input
                type="text"
                placeholder=""
                className="input w-full focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 focus:scale-[1.02] bg-base-100/80 backdrop-blur-sm border-base-300/50 hover:border-primary/50"
                value={signupData.fullName}
                onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                required
              />
            </div>

            {/* EMAIL */}
            <div className="form-control w-full animate-fadeInUp">
              <label className="label">
                <span className="label-text font-semibold text-base-content/90">Email</span>
              </label>
              <input
                type="email"
                placeholder=""
                className="input w-full focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 focus:scale-[1.02] bg-base-100/80 backdrop-blur-sm border-base-300/50 hover:border-primary/50"
                value={signupData.email}
                onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                required
              />
            </div>

            {/* PASSWORD */}
            <div className="form-control w-full animate-fadeInUp">
              <label className="label">
                <span className="label-text font-semibold text-base-content/90">Password</span>
              </label>
              <input
                type="password"
                placeholder=""
                className="input w-full focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 focus:scale-[1.02] bg-base-100/80 backdrop-blur-sm border-base-300/50 hover:border-primary/50"
                value={signupData.password}
                onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                required
              />
              <p className="text-sm opacity-70 mt-2 text-base-content/70">Password must be at least 6 characters long</p>
            </div>

            {/* TERMS */}
            <div className="form-control animate-fadeInUp">
              <label className="label cursor-pointer justify-start gap-3 hover:text-primary transition-colors duration-300 p-3 rounded-lg hover:bg-base-200/50">
                <input type="checkbox" className="checkbox checkbox-primary checkbox-sm accent-primary scale-110" required />
                <span className="text-sm leading-relaxed text-base-content/80">
                  I agree to the{" "}
                  <span className="text-primary hover:text-secondary font-medium hover:underline transition-all duration-300">
                    terms of service
                  </span>{" "}
                  and{" "}
                  <span className="text-primary hover:text-secondary font-medium hover:underline transition-all duration-300">
                    privacy policy
                  </span>
                </span>
              </label>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className={`btn w-full mt-4 rounded-full font-semibold transition-all duration-300 text-lg py-3 ${
                isPending
                  ? "btn-disabled bg-base-300/70 text-base-content/60"
                  : "btn-primary bg-gradient-to-r from-primary to-secondary hover:scale-105 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] hover:from-primary/90 hover:to-secondary/90 relative overflow-hidden group"
              } animate-fadeInUp`}
              disabled={isPending}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              {isPending ? (
                <>
                  <span className="loading loading-spinner loading-sm mr-3 relative z-10"></span>
                  <span className="relative z-10">Creating...</span>
                </>
              ) : (
                <span className="relative z-10">Create Account</span>
              )}
            </button>

            <div className="text-center mt-6 animate-fadeInUp">
              <p className="text-base text-base-content/80">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-primary hover:text-secondary font-semibold hover:underline transition-all duration-300 relative group"
                >
                  Sign in
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300"></span>
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* RIGHT ILLUSTRATION */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center overflow-hidden relative">
          <div className="max-w-md p-8 animate-float">
            <img
              src="/i.png"
              alt="Language connection illustration"
              className="w-full h-full object-contain rounded-xl shadow-lg hover:scale-105 transition-transform duration-500"
            />
            <div className="text-center space-y-3 mt-6">
              <h2 className="text-2xl font-semibold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent drop-shadow-md">
                Connect with language partners worldwide
              </h2>
              <p className="opacity-70">
                Practice conversations, make friends, and improve your language skills together.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
