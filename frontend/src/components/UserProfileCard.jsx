import { Link } from "react-router";
import { PhoneIcon, VideoIcon, MessageCircleIcon, MapPinIcon } from "lucide-react";
import { capitialize } from "../lib/utils";

const UserProfileCard = ({ user }) => {
  if (!user) return null;

  return (
    <div className="bg-base-200/80 backdrop-blur-md border border-base-300/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 opacity-50"></div>

      <div className="relative z-10">
        {/* User Info */}
        <div className="flex items-center gap-4 mb-4">
          <div className="avatar">
            <div className="w-16 h-16 rounded-full ring ring-primary/40 ring-offset-base-100 ring-offset-2">
              <img
                src={user.profilePic}
                alt={user.fullName}
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex-1">
            <h3 className="font-bold text-xl text-base-content">{user.fullName}</h3>
            {user.location && (
              <div className="flex items-center text-sm opacity-70 mt-1">
                <MapPinIcon className="size-3 mr-1 text-secondary" />
                {user.location}
              </div>
            )}
            <div className="flex items-center text-xs opacity-60 mt-1">
              <span className="size-2 rounded-full bg-success inline-block animate-pulse mr-2" />
              Online
            </div>
          </div>
        </div>

        {/* Languages */}
        <div className="flex flex-wrap gap-2 mb-4">
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

        {/* Bio */}
        {user.bio && (
          <p className="text-sm opacity-80 leading-relaxed border-l-2 border-primary/30 pl-3 italic mb-4">
            "{user.bio}"
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Link
            to={`/chat/${user._id}`}
            className="btn-enhanced btn btn-outline flex-1 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)] gap-2"
          >
            <MessageCircleIcon className="size-4" />
            <span>Message</span>
          </Link>
          <Link
            to={`/call/${user._id}?type=voice`}
            className="btn-enhanced btn btn-primary btn-sm rounded-full hover:scale-110 transition-all duration-300"
            title="Voice Call"
          >
            <PhoneIcon className="size-4" />
          </Link>
          <Link
            to={`/call/${user._id}?type=video`}
            className="btn-enhanced btn btn-success btn-sm rounded-full hover:scale-110 transition-all duration-300"
            title="Video Call"
          >
            <VideoIcon className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
