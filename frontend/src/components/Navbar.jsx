import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, LogOutIcon, ShipWheelIcon } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import useLogout from "../hooks/useLogout";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");
  const { logoutMutation } = useLogout();

  return (
    <nav className="sticky top-0 z-50 h-16 flex items-center px-6 bg-gradient-to-r from-base-200/70 via-base-300/60 to-base-200/70 backdrop-blur-2xl border-b border-base-300/40 shadow-[0_0_25px_rgba(0,0,0,0.15)] transition-all duration-700">
      {/* LEFT SIDE: LOGO */}
      {isChatPage && (
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative">
            <ShipWheelIcon className="size-9 text-primary transition-transform duration-700 group-hover:rotate-[360deg]" />
            <span className="absolute inset-0 rounded-full blur-lg bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-40 scale-75 group-hover:scale-100 transition-all duration-700"></span>
          </div>
          <span className="text-3xl font-black font-mono bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent tracking-wider drop-shadow-sm group-hover:scale-105 transition-transform duration-700">
            Talksy
          </span>
        </Link>
      )}

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-5 ml-auto">
        {/* Notification Button */}
        <Link to="/notifications" className="relative group">
          <button className="btn btn-ghost btn-circle hover:bg-primary/10 hover:scale-110 transition-all duration-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <BellIcon className="h-6 w-6 text-base-content/80 group-hover:text-primary group-hover:rotate-12 transition-all duration-300 relative z-10" />
          </button>
          <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-error rounded-full border-2 border-base-100 animate-pulse shadow-[0_0_6px_#ef4444]"></span>
        </Link>

        {/* THEME SELECTOR — FIXED VERSION */}
        <div className="relative flex items-center justify-center">
          {/* subtle glow behind selector */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-secondary/30 to-primary/30 blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none" />
          <div className="transition-transform duration-500 hover:scale-110">
            <ThemeSelector />
          </div>
        </div>

        {/* User Avatar */}
        <div className="relative group cursor-pointer">
          <div className="avatar transition-transform duration-500 group-hover:scale-110">
            <div className="w-10 rounded-full ring ring-primary/40 ring-offset-base-100 ring-offset-2 group-hover:ring-secondary/50 transition-all duration-500 shadow-[0_0_15px_rgba(147,51,234,0.2)] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <img
                src={authUser?.profilePic}
                alt="User Avatar"
                className="object-cover relative z-10"
              />
            </div>
          </div>
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-base-100 animate-pulse shadow-[0_0_6px_#22c55e]"></div>
        </div>

        {/* Logout Button */}
        <button
          onClick={logoutMutation}
          className="relative btn btn-ghost btn-circle hover:bg-error/10 hover:scale-110 transition-all duration-300 group overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-error/5 to-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <LogOutIcon className="h-6 w-6 text-base-content/80 group-hover:text-error group-hover:rotate-12 transition-all duration-300 relative z-10" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-error to-rose-500 blur-md opacity-0 group-hover:opacity-20 transition-all duration-700"></div>
        </button>
      </div>

      {/* Gradient bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-secondary to-accent opacity-70 blur-[1px]"></div>
    </nav>
  );
};

export default Navbar;
