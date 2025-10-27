import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  getOutgoingFriendReqs,
  getRecommendedUsers,
  sendFriendRequest,
} from "../lib/api";
import { Link } from "react-router";
import {
  CheckCircleIcon,
  MapPinIcon,
  UserPlusIcon,
  UsersIcon,
} from "lucide-react";

import { capitialize } from "../lib/utils";

const HomePage = () => {
  const queryClient = useQueryClient();
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());



  const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getRecommendedUsers,
  });

  const { data: outgoingFriendReqs } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
  });

  const { mutate: sendRequestMutation, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] }),
  });

  useEffect(() => {
    const outgoingIds = new Set();
    if (outgoingFriendReqs && outgoingFriendReqs.length > 0) {
      outgoingFriendReqs.forEach((req) => outgoingIds.add(req.recipient._id));
      setOutgoingRequestsIds(outgoingIds);
    }
  }, [outgoingFriendReqs]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-base-100 via-base-200 to-base-300 min-h-screen relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary/3 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-20 w-48 h-48 bg-secondary/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-56 h-56 bg-accent/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-info/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto space-y-14 relative z-10">
        {/* ======= RECOMMENDED USERS ======= */}
        <section className="relative slide-in-left">
          <div className="mb-8 sm:mb-10 relative">
            <h2 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-secondary via-accent to-primary bg-clip-text text-transparent drop-shadow-md">
              Meet New Learners
            </h2>
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-secondary via-accent to-primary rounded-full opacity-60"></div>
            <p className="opacity-70 mt-3 text-sm sm:text-base slide-in-right">
              Discover perfect language exchange partners based on your profile.
            </p>
          </div>

          {loadingUsers ? (
            <div className="flex justify-center py-12">
              <div className="flex flex-col items-center gap-4">
                <span className="loading loading-spinner loading-lg text-secondary animate-pulse" />
                <p className="text-base-content/70 animate-pulse">Finding perfect language partners...</p>
              </div>
            </div>
          ) : recommendedUsers.length === 0 ? (
            <div className="card bg-gradient-to-br from-base-200/70 to-base-300/50 backdrop-blur-md border border-base-300/40 text-center p-10 rounded-3xl shadow-inner hover:shadow-[0_0_25px_rgba(0,0,0,0.1)] transition-all duration-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-50"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UsersIcon className="w-8 h-8 text-primary/70" />
                </div>
                <h3 className="font-bold text-xl mb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  No recommendations available
                </h3>
                <p className="text-base-content opacity-70 text-lg">
                  Check back later for new language partners!
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recommendedUsers.map((user, index) => {
                const hasRequestBeenSent = outgoingRequestsIds.has(user._id);

                return (
                  <div
                    key={user._id}
                    className="group card bg-base-200/60 border border-base-300/50 backdrop-blur-lg rounded-2xl hover:bg-base-300/70 hover:shadow-[0_0_25px_rgba(0,0,0,0.2)] hover:-translate-y-1 transition-all duration-500 relative overflow-hidden animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.15}s` }}
                  >
                    {/* gradient border accent on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 blur-3xl"></div>

                    <div className="card-body p-6 space-y-5 relative z-10">
                      {/* === User Info === */}
                      <div className="flex items-center gap-4">
                        <div className="avatar">
                          <div className="w-16 rounded-full ring ring-primary/40 ring-offset-base-100 ring-offset-2 transition-transform duration-500 group-hover:scale-110">
                            <img
                              src={user.profilePic}
                              alt={user.fullName}
                              className="object-cover"
                            />
                          </div>
                        </div>

                        <div>
                          <h3 className="font-bold text-lg text-base-content">
                            {user.fullName}
                          </h3>
                          {user.location && (
                            <div className="flex items-center text-xs opacity-70 mt-1">
                              <MapPinIcon className="size-3 mr-1 text-secondary" />
                              {user.location}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* === Languages === */}
                      <div className="flex flex-wrap gap-2">
                        <span className="badge badge-secondary badge-outline font-medium">
                          <img
                            src={`https://flagcdn.com/24x18/${{English: 'us', Spanish: 'es', French: 'fr', German: 'de', Italian: 'it', Portuguese: 'pt', Chinese: 'cn', Japanese: 'jp', Korean: 'kr', Russian: 'ru', Arabic: 'sa', Hindi: 'in'}[user.nativeLanguage] || 'us'}.png`}
                            alt={`${user.nativeLanguage} flag`}
                            className="h-3 mr-1 inline-block"
                          />
                          Native: {capitialize(user.nativeLanguage)}
                        </span>
                        <span className="badge badge-outline font-medium">
                          <img
                            src={`https://flagcdn.com/24x18/${{English: 'us', Spanish: 'es', French: 'fr', German: 'de', Italian: 'it', Portuguese: 'pt', Chinese: 'cn', Japanese: 'jp', Korean: 'kr', Russian: 'ru', Arabic: 'sa', Hindi: 'in'}[user.learningLanguage] || 'us'}.png`}
                            alt={`${user.learningLanguage} flag`}
                            className="h-3 mr-1 inline-block"
                          />
                          Learning: {capitialize(user.learningLanguage)}
                        </span>
                      </div>

                      {/* === Bio === */}
                      {user.bio && (
                        <p className="text-sm opacity-80 leading-relaxed border-l-2 border-primary/30 pl-3 italic">
                          “{user.bio}”
                        </p>
                      )}

                      {/* === Button === */}
                      <button
                        className={`btn w-full mt-3 rounded-full transition-all duration-500 font-semibold group/btn relative overflow-hidden ${
                          hasRequestBeenSent
                            ? "btn-disabled bg-base-300/70 text-base-content/60"
                            : "btn-primary bg-gradient-to-r from-primary to-secondary hover:scale-[1.04] hover:shadow-[0_0_20px_rgba(0,0,0,0.2)] hover:from-primary/90 hover:to-secondary/90"
                        }`}
                        onClick={() => sendRequestMutation(user._id)}
                        disabled={hasRequestBeenSent || isPending}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                        {hasRequestBeenSent ? (
                          <>
                            <CheckCircleIcon className="size-4 mr-2 relative z-10 group-hover/btn:scale-110 transition-transform duration-300" />
                            <span className="relative z-10">Request Sent</span>
                          </>
                        ) : (
                          <>
                            <UserPlusIcon className="size-4 mr-2 relative z-10 group-hover/btn:rotate-12 transition-transform duration-300" />
                            <span className="relative z-10">Send Friend Request</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

// Add some custom animations to the global CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes gentle-float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    33% { transform: translateY(-10px) rotate(1deg); }
    66% { transform: translateY(5px) rotate(-1deg); }
  }
  .animate-gentle-float {
    animation: gentle-float 6s ease-in-out infinite;
  }
`;
document.head.appendChild(style);

export default HomePage;
