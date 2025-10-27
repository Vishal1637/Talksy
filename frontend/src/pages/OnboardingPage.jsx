import { useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { completeOnboarding } from "../lib/api";
import { LoaderIcon, MapPinIcon, ShipWheelIcon, ShuffleIcon, CameraIcon } from "lucide-react";
import { LANGUAGES } from "../constants";

const OnboardingPage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Profile onboarded successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onboardingMutation(formState);
  };

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
    setFormState({ ...formState, profilePic: randomAvatar });
    toast.success("Random profile picture generated!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-primary/10 via-secondary/5 to-accent/10 flex items-center justify-center p-4">
      <div className="card bg-base-200 w-full max-w-3xl shadow-2xl rounded-2xl overflow-hidden animate-fadeInUp">
        <div className="card-body p-6 sm:p-8">

          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 animate-fadeInUp">
            Complete Your Profile
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* PROFILE PIC */}
            <div className="flex flex-col items-center space-y-4 animate-fadeInUp">
              <div className="size-32 rounded-full bg-base-300 overflow-hidden transition-transform duration-500 hover:scale-105 shadow-lg">
                {formState.profilePic ? (
                  <img
                    src={formState.profilePic}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <CameraIcon className="size-12 text-base-content opacity-40" />
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={handleRandomAvatar}
                className="btn btn-accent flex items-center gap-2 animate-pulse hover:scale-105 transition-transform duration-300"
              >
                <ShuffleIcon className="size-4" /> Generate Random Avatar
              </button>
            </div>

            {/* FULL NAME */}
            <div className="form-control animate-fadeInUp">
              <label className="label"><span className="label-text">Full Name</span></label>
              <input
                type="text"
                name="fullName"
                value={formState.fullName}
                onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                className="input input-bordered w-full focus:ring-2 focus:ring-primary focus:scale-105 transition-all duration-300"
                placeholder="Your full name"
              />
            </div>

            {/* BIO */}
            <div className="form-control animate-fadeInUp">
              <label className="label"><span className="label-text">Bio</span></label>
              <textarea
                name="bio"
                value={formState.bio}
                onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
                className="textarea textarea-bordered h-24 focus:scale-105 focus:ring-2 focus:ring-primary transition-all duration-300"
                placeholder="Tell others about yourself and your language learning goals"
              />
            </div>

            {/* LANGUAGES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeInUp">
              <div className="form-control">
                <label className="label"><span className="label-text">Native Language</span></label>
                <select
                  name="nativeLanguage"
                  value={formState.nativeLanguage}
                  onChange={(e) => setFormState({ ...formState, nativeLanguage: e.target.value })}
                  className="select select-bordered w-full focus:scale-105 focus:ring-2 focus:ring-primary transition-all duration-300"
                >
                  <option value="">Select your native language</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`native-${lang}`} value={lang.toLowerCase()}>{lang}</option>
                  ))}
                </select>
              </div>

              <div className="form-control">
                <label className="label"><span className="label-text">Learning Language</span></label>
                <select
                  name="learningLanguage"
                  value={formState.learningLanguage}
                  onChange={(e) => setFormState({ ...formState, learningLanguage: e.target.value })}
                  className="select select-bordered w-full focus:scale-105 focus:ring-2 focus:ring-primary transition-all duration-300"
                >
                  <option value="">Select language you're learning</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`learning-${lang}`} value={lang.toLowerCase()}>{lang}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* LOCATION */}
            <div className="form-control animate-fadeInUp">
              <label className="label"><span className="label-text">Location</span></label>
              <div className="relative">
                <MapPinIcon className="absolute top-1/2 left-3 -translate-y-1/2 size-5 text-base-content opacity-70" />
                <input
                  type="text"
                  name="location"
                  value={formState.location}
                  onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                  className="input input-bordered w-full pl-10 focus:scale-105 focus:ring-2 focus:ring-primary transition-all duration-300"
                  placeholder="City, Country"
                />
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              className="btn w-full btn-primary flex items-center justify-center gap-2 hover:scale-105 hover:shadow-lg transition-transform duration-300 animate-fadeInUp"
              disabled={isPending}
              type="submit"
            >
              {!isPending ? (
                <>
                  <ShipWheelIcon className="size-5" /> Complete Onboarding
                </>
              ) : (
                <>
                  <LoaderIcon className="animate-spin size-5" /> Onboarding...
                </>
              )}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
