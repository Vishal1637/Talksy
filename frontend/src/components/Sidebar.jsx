import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, HomeIcon, ShipWheelIcon, UsersIcon } from "lucide-react";

const Sidebar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { path: "/", label: "Home", icon: <HomeIcon className="size-5" /> },
    { path: "/friends", label: "Friends", icon: <UsersIcon className="size-5" /> },
    { path: "/notifications", label: "Notifications", icon: <BellIcon className="size-5" /> },
  ];

  return (
    <aside className="w-64 bg-gradient-to-b from-base-200/90 via-base-300/70 to-base-200/80 backdrop-blur-xl border-r border-base-300/50 hidden lg:flex flex-col h-screen sticky top-0 shadow-[0_4px_30px_rgba(0,0,0,0.1)] transition-all duration-500">
      {/* LOGO */}
      <div className="p-6 border-b border-base-300/50">
        <Link to="/" className="flex items-center gap-3 group relative">
          <div className="relative">
            <ShipWheelIcon className="size-9 text-primary drop-shadow-lg transition-transform duration-500 group-hover:rotate-[360deg]" />
            <div className="absolute inset-0 blur-lg bg-primary/20 rounded-full scale-0 group-hover:scale-100 transition-all duration-500"></div>
          </div>
          <span className="text-3xl font-extrabold font-mono bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent tracking-wider drop-shadow-sm group-hover:scale-105 transition-transform duration-500">
            Talksy
          </span>
        </Link>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 p-4 mt-2 space-y-2">
        {navItems.map((item) => {
          const isActive = currentPath === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`group flex items-center gap-4 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-400 relative overflow-hidden hover:scale-[1.02] ${
                isActive
                  ? "bg-gradient-to-r from-primary/30 to-secondary/30 text-primary shadow-md scale-[1.02]"
                  : "hover:bg-gradient-to-r hover:from-base-300/60 hover:to-base-200/60 text-base-content/80 hover:text-primary"
              }`}
            >
              <span
                className={`transition-all duration-300 ${
                  isActive
                    ? "scale-110 text-primary drop-shadow rotate-12"
                    : "opacity-70 group-hover:opacity-100 group-hover:rotate-12"
                }`}
              >
                {item.icon}
              </span>
              <span className="group-hover:translate-x-1 transition-transform duration-300">{item.label}</span>

              {/* glow effect */}
              <div
                className={`absolute left-0 top-0 h-full w-[3px] rounded-r-lg bg-gradient-to-b from-primary to-secondary transition-all duration-300 ${
                  isActive ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 group-hover:opacity-50 group-hover:scale-y-100"
                }`}
              ></div>

              {/* hover background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
            </Link>
          );
        })}
      </nav>

      {/* PROFILE SECTION */}
      <div className="p-5 border-t border-base-300/50 mt-auto relative">
        <div className="flex items-center gap-3 bg-gradient-to-r from-base-300/50 to-base-200/40 p-3 rounded-xl hover:shadow-lg hover:from-base-300/70 hover:scale-[1.02] transition-all duration-500 cursor-pointer group relative overflow-hidden">
          {/* Hover background effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>

          <div className="relative z-10">
            <div className="avatar">
              <div className="w-10 rounded-full ring ring-primary/40 ring-offset-base-100 ring-offset-2 group-hover:ring-secondary/50 transition-all duration-300">
                <img
                  src={authUser?.profilePic}
                  alt="User Avatar"
                  className="object-cover"
                />
              </div>
            </div>
            <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-base-100 animate-pulse shadow-[0_0_6px_#22c55e]"></span>
          </div>

          <div className="flex-1 relative z-10">
            <p className="font-semibold text-sm text-base-content/90 group-hover:text-primary transition-colors duration-300">
              {authUser?.fullName}
            </p>
            <p className="text-xs text-success/80 flex items-center gap-1">
              <span className="size-2 rounded-full bg-success inline-block animate-pulse" />
              Online
            </p>
          </div>
        </div>

        {/* Subtle glow behind user */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-primary/10 to-transparent blur-2xl pointer-events-none"></div>
      </div>
    </aside>
  );
};

export default Sidebar;
