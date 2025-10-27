import { useQuery } from "@tanstack/react-query";
import { getUserFriends } from "../lib/api";
import { Link } from "react-router";
import { PhoneIcon, VideoIcon, MessageCircleIcon } from "lucide-react";
import { capitialize } from "../lib/utils";
import NoFriendsFound from "../components/NoFriendsFound";

const FriendsPage = () => {
  const { data: friends = [], isLoading } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-base-100 via-base-200 to-base-300 min-h-screen relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary/3 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-20 w-48 h-48 bg-secondary/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-56 h-56 bg-accent/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-info/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto space-y-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 slide-in-left">
          <div className="relative">
            <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent drop-shadow-md">
              Your Friends
            </h1>
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-full opacity-60"></div>
          </div>
          <div className="text-sm opacity-70 slide-in-right">
            {friends.length} {friends.length === 1 ? 'friend' : 'friends'}
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="flex flex-col items-center gap-4">
              <span className="loading loading-spinner loading-lg text-primary animate-pulse" />
              <p className="text-base-content/70 animate-pulse">Loading your friends...</p>
            </div>
          </div>
        ) : friends.length === 0 ? (
          <NoFriendsFound />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {friends.map((friend, index) => (
              <div
                key={friend._id}
                className="group card bg-base-200/60 border border-base-300/50 backdrop-blur-lg rounded-2xl hover:bg-base-300/70 hover:shadow-[0_0_25px_rgba(0,0,0,0.2)] hover:-translate-y-1 transition-all duration-500 relative overflow-hidden animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* gradient border accent on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 blur-3xl"></div>

                <div className="card-body p-6 space-y-5 relative z-10">
                  {/* === User Info === */}
                  <div className="flex items-center gap-4">
                    <div className="avatar">
                      <div className="w-16 rounded-full ring ring-primary/40 ring-offset-base-100 ring-offset-2 transition-transform duration-500 group-hover:scale-110">
                        <img
                          src={friend.profilePic}
                          alt={friend.fullName}
                          className="object-cover"
                        />
                      </div>
                    </div>

                    <div>
                      <h3 className="font-bold text-lg text-base-content group-hover:text-primary transition-colors duration-300">
                        {friend.fullName}
                      </h3>
                      <div className="flex items-center text-xs opacity-70 mt-1">
                        <span className="size-2 rounded-full bg-success inline-block animate-pulse mr-2" />
                        Online
                      </div>
                    </div>
                  </div>

                  {/* === Languages === */}
                  <div className="flex flex-wrap gap-2">
                    <span className="badge badge-secondary badge-outline font-medium">
                      <img
                        src={`https://flagcdn.com/24x18/${{English: 'us', Spanish: 'es', French: 'fr', German: 'de', Italian: 'it', Portuguese: 'pt', Chinese: 'cn', Japanese: 'jp', Korean: 'kr', Russian: 'ru', Arabic: 'sa', Hindi: 'in'}[friend.nativeLanguage] || 'us'}.png`}
                        alt={`${friend.nativeLanguage} flag`}
                        className="h-3 mr-1 inline-block"
                      />
                      Native: {capitialize(friend.nativeLanguage)}
                    </span>
                    <span className="badge badge-outline font-medium">
                      <img
                        src={`https://flagcdn.com/24x18/${{English: 'us', Spanish: 'es', French: 'fr', German: 'de', Italian: 'it', Portuguese: 'pt', Chinese: 'cn', Japanese: 'jp', Korean: 'kr', Russian: 'ru', Arabic: 'sa', Hindi: 'in'}[friend.learningLanguage] || 'us'}.png`}
                        alt={`${friend.learningLanguage} flag`}
                        className="h-3 mr-1 inline-block"
                      />
                      Learning: {capitialize(friend.learningLanguage)}
                    </span>
                  </div>

                  {/* === Bio === */}
                  {friend.bio && (
                    <p className="text-sm opacity-80 leading-relaxed border-l-2 border-primary/30 pl-3 italic">
                      "{friend.bio}"
                    </p>
                  )}

                  {/* === Action Buttons === */}
                  <div className="flex gap-2 pt-2">
                    <Link
                      to={`/chat/${friend._id}`}
                      className="btn-enhanced btn btn-outline flex-1 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)] gap-2"
                    >
                      <MessageCircleIcon className="size-4" />
                      <span>Message</span>
                    </Link>
                    <Link
                      to={`/call/${friend._id}?type=voice`}
                      className="btn-enhanced btn btn-primary btn-sm rounded-full hover:scale-110 transition-all duration-300"
                      title="Voice Call"
                    >
                      <PhoneIcon className="size-4" />
                    </Link>
                    <Link
                      to={`/call/${friend._id}?type=video`}
                      className="btn-enhanced btn btn-success btn-sm rounded-full hover:scale-110 transition-all duration-300"
                      title="Video Call"
                    >
                      <VideoIcon className="size-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendsPage;
