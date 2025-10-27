import { useState } from "react";
import toast from "react-hot-toast";

// Custom Message Component for Reactions and Timestamps
const CustomMessage = ({ message, isMyMessage }) => {
  const [showReactions, setShowReactions] = useState(false);
  const [reactions, setReactions] = useState(message.reactions || []);

  const handleReaction = async (emoji) => {
    try {
      // Add reaction logic here
      const newReaction = {
        type: emoji,
        user_id: message.user.id,
        created_at: new Date().toISOString(),
      };

      // Update local state
      setReactions(prev => [...prev, newReaction]);
      setShowReactions(false);

      toast.success(`Reacted with ${emoji}`);
    } catch {
      toast.error("Failed to add reaction");
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;

    if (diff < 60000) return "Just now";
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className={`message-wrapper ${isMyMessage ? 'my-message' : 'other-message'} relative group`}>
      <div className="message-content">
        {message.text}
      </div>

      {/* Timestamp */}
      <div className="timestamp text-xs opacity-60 mt-1">
        {formatTimestamp(message.created_at)}
      </div>

      {/* Reactions Display */}
      {reactions.length > 0 && (
        <div className="reactions flex gap-1 mt-2">
          {reactions.slice(0, 3).map((reaction, index) => (
            <span key={index} className="reaction-badge bg-base-200 px-2 py-1 rounded-full text-sm">
              {reaction.type} {reactions.filter(r => r.type === reaction.type).length}
            </span>
          ))}
        </div>
      )}

      {/* Reaction Button */}
      <button
        onClick={() => setShowReactions(!showReactions)}
        className="reaction-btn opacity-0 group-hover:opacity-100 transition-opacity absolute -right-8 top-0 bg-base-200 hover:bg-base-300 rounded-full p-1"
      >
        <span className="text-sm">😊</span>
      </button>

      {/* Reaction Picker */}
      {showReactions && (
        <div className="reaction-picker absolute bottom-full right-0 bg-base-100 border border-base-300 rounded-lg p-2 shadow-lg z-10">
          <div className="flex gap-1">
            {['👍', '❤️', '😂', '😮', '😢', '😡'].map(emoji => (
              <button
                key={emoji}
                onClick={() => handleReaction(emoji)}
                className="hover:bg-base-200 rounded p-1 transition-colors"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomMessage;
