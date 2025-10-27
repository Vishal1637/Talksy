import { Link } from "react-router";
import { LANGUAGE_TO_FLAG } from "../constants";
import { PhoneIcon, VideoIcon, MessageCircleIcon } from "lucide-react";

const FriendCard = ({ friend }) => {
  return (
    <div className="card-enhanced group relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary to-secondary rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-accent to-secondary rounded-full blur-2xl"></div>
      </div>

      <div className="card-body p-5 relative z-10">
        {/* USER INFO */}
        <div className="flex items-center gap-4 mb-4">
          <div className="avatar size-14 ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300">
            <div className="rounded-full overflow-hidden">
              <img
                src={friend.profilePic}
                alt={friend.fullName}
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg truncate group-hover:text-primary transition-colors duration-300">
              {friend.fullName}
            </h3>
            <div className="flex items-center gap-1 text-sm opacity-70">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span>Online</span>
            </div>
          </div>
        </div>

        {/* LANGUAGES */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="badge badge-secondary badge-sm gap-1 hover:scale-105 transition-transform duration-200">
            {getLanguageFlag(friend.nativeLanguage)}
            <span className="font-medium">Native: {friend.nativeLanguage}</span>
          </span>
          <span className="badge badge-outline badge-sm gap-1 hover:scale-105 transition-transform duration-200">
            {getLanguageFlag(friend.learningLanguage)}
            <span className="font-medium">Learning: {friend.learningLanguage}</span>
          </span>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-3">
          <Link
            to={`/chat/${friend._id}`}
            className="btn-enhanced btn btn-outline btn-sm flex-1 gap-2 group/btn hover:border-primary hover:text-primary"
          >
            <MessageCircleIcon className="size-4 group-hover/btn:rotate-12 transition-transform duration-300" />
            <span className="font-medium">Chat</span>
          </Link>
          <Link
            to={`/call/${friend._id}?type=voice`}
            className="btn-enhanced btn btn-primary btn-sm gap-2 group/btn hover:scale-110"
            title="Voice Call"
          >
            <PhoneIcon className="size-4 group-hover/btn:rotate-12 transition-transform duration-300" />
            <span className="hidden sm:inline font-medium">Voice</span>
          </Link>
          <Link
            to={`/call/${friend._id}?type=video`}
            className="btn-enhanced btn btn-success btn-sm gap-2 group/btn hover:scale-110"
            title="Video Call"
          >
            <VideoIcon className="size-4 group-hover/btn:rotate-12 transition-transform duration-300" />
            <span className="hidden sm:inline font-medium">Video</span>
          </Link>
        </div>
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 rounded-xl"></div>
        <div className="absolute inset-0 shadow-[0_0_30px_rgba(147,51,234,0.1)] rounded-xl"></div>
      </div>
    </div>
  );
};
export default FriendCard;

function getLanguageFlag(language) {
  if (!language) return null;

  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];

  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${langLower} flag`}
        className="h-3 mr-1 inline-block"
      />
    );
  }
  return null;
}
