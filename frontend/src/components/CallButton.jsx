import { VideoIcon, PhoneIcon } from "lucide-react";

function CallButton({ handleVideoCall, handleVoiceCall }) {
  return (
    <div className="p-4 border-b border-base-300/30 bg-gradient-to-r from-base-200/70 via-base-300/50 to-base-200/70 backdrop-blur-sm flex items-center justify-end gap-3 max-w-7xl mx-auto w-full absolute top-0 z-10 shadow-[0_2px_10px_rgba(0,0,0,0.1)]">
      <button
        onClick={handleVoiceCall}
        className="btn-enhanced btn btn-primary btn-sm text-white gap-2 group relative overflow-hidden glow-primary"
        title="Voice Call"
      >
        <PhoneIcon className="size-5 group-hover:rotate-12 transition-transform duration-300" />
        <span className="hidden sm:inline font-medium">Voice</span>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-ping opacity-75"></div>
      </button>
      <button
        onClick={handleVideoCall}
        className="btn-enhanced btn btn-success btn-sm text-white gap-2 group relative overflow-hidden glow-primary"
        title="Video Call"
      >
        <VideoIcon className="size-5 group-hover:rotate-12 transition-transform duration-300" />
        <span className="hidden sm:inline font-medium">Video</span>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-ping opacity-75"></div>
      </button>
    </div>
  );
}

export default CallButton;
