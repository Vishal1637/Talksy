import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";

import {
  StreamVideo,
  StreamVideoClient,
  StreamCall,
  CallControls,
  SpeakerLayout,
  StreamTheme,
  CallingState,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { PhoneIcon } from "lucide-react";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import toast from "react-hot-toast";
import PageLoader from "../components/PageLoader";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const CallPage = () => {
  const { id: callId } = useParams();
  const [searchParams] = useSearchParams();
  const callType = searchParams.get("type") || "video"; // default to video
  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  const [isConnecting, setIsConnecting] = useState(true);

  const { authUser, isLoading } = useAuthUser();

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  useEffect(() => {
    const initCall = async () => {
      if (!tokenData.token || !authUser || !callId) return;

      try {
        console.log("Initializing Stream video client...");

        const user = {
          id: authUser._id,
          name: authUser.fullName,
          image: authUser.profilePic,
        };

        const videoClient = new StreamVideoClient({
          apiKey: STREAM_API_KEY,
          user,
          token: tokenData.token,
        });

        const callInstance = videoClient.call("default", callId);

        await callInstance.join({ create: true });

        // Disable video for voice calls
        if (callType === "voice") {
          callInstance.camera.disable();
        }

        console.log("Joined call successfully");

        setClient(videoClient);
        setCall(callInstance);
      } catch (error) {
        console.error("Error joining call:", error);
        toast.error("Could not join the call. Please try again.");
      } finally {
        setIsConnecting(false);
      }
    };

    initCall();
  }, [tokenData, authUser, callId, callType]);

  if (isLoading || isConnecting) return <PageLoader />;

  return (
    <div className="h-screen bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Enhanced Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-secondary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-56 h-56 bg-accent/5 rounded-full blur-3xl float-animation"></div>
      </div>

      <div className="w-full max-w-4xl relative z-10">
        {client && call ? (
          <StreamVideo client={client}>
            <StreamCall call={call}>
              <CallContent callType={callType} />
            </StreamCall>
          </StreamVideo>
        ) : (
          <div className="flex items-center justify-center h-full bg-base-100/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-base-300/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-error/5 to-transparent"></div>
            <div className="text-center space-y-6 relative z-10 p-8">
              <div className="w-20 h-20 bg-gradient-to-br from-error/20 to-error/10 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <PhoneIcon className="w-10 h-10 text-error animate-pulse" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-base-content">Connection Failed</h2>
                <p className="text-base-content/70 text-lg">Could not initialize call. Please refresh or try again later.</p>
              </div>
              <button
                onClick={() => window.location.reload()}
                className="btn btn-primary btn-outline hover:bg-primary hover:text-white transition-all duration-300"
              >
                Try Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const CallContent = ({ callType }) => {
  const { useCallCallingState, useParticipants } = useCallStateHooks();
  const callingState = useCallCallingState();
  const participants = useParticipants();

  const navigate = useNavigate();

  if (callingState === CallingState.LEFT) return navigate("/");

  return (
    <StreamTheme>
      {callType === "voice" ? (
        <div className="flex flex-col items-center justify-center h-full bg-base-100/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-base-300/30 relative overflow-hidden card-enhanced">
          {/* Enhanced Voice call background pattern */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="absolute top-10 left-10 w-20 h-20 border-2 border-primary/30 rounded-full animate-ping"></div>
            <div className="absolute bottom-10 right-10 w-16 h-16 border-2 border-secondary/30 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute top-1/2 left-1/4 w-12 h-12 border-2 border-accent/30 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
          </div>

          <div className="text-center space-y-8 relative z-10">
            {participants.length > 1 ? (
              <div className="flex items-center justify-center space-x-6">
                {participants.slice(0, 2).map((participant) => (
                  <div key={participant.sessionId} className="flex flex-col items-center group">
                    <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-xl ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300 group-hover:scale-110">
                      {participant.image ? (
                        <img src={participant.image} alt={participant.name} className="w-full h-full rounded-full object-cover" />
                      ) : (
                        <span className="text-white text-2xl font-bold">{participant.name?.charAt(0).toUpperCase()}</span>
                      )}
                    </div>
                    <p className="text-base mt-3 text-base-content font-medium">{participant.name}</p>
                    <div className="flex items-center text-xs text-success mt-1">
                      <span className="size-2 rounded-full bg-success inline-block animate-pulse mr-1"></span>
                      Connected
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-40 h-40 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto shadow-2xl animate-pulse ring-8 ring-primary/20">
                  <PhoneIcon className="w-20 h-20 text-white" />
                </div>
                <p className="text-base-content/70 text-lg">Waiting for participant...</p>
              </div>
            )}
            <div className="space-y-2">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent scale-in">
                Voice Call
              </h2>
              <p className="text-base-content/60 slide-in-left">
                {participants.length > 1 ? `${participants.length} participants connected` : 'Connecting...'}
              </p>
            </div>
            <div className="mt-10">
              <CallControls />
            </div>
          </div>
        </div>
      ) : (
        <div className="relative">
          <SpeakerLayout />
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
            <CallControls />
          </div>
        </div>
      )}
    </StreamTheme>
  );
};

export default CallPage;
