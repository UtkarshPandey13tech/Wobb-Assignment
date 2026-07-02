import React from "react";
import { useNavigate } from "react-router-dom";
import type { Platform, UserProfileSummary } from "@/types";
import { VerifiedBadge } from "./VerifiedBadge";
import { useList } from "@/hooks/useList";
import { formatNumber } from "@/utils/formatters";

interface ProfileCardProps {
  profile: UserProfileSummary;
  platform: Platform;
  searchQuery: string;
  onProfileClick?: (username: string) => void;
}



export const ProfileCard = React.memo(function ProfileCard({
  profile,
  platform,
  searchQuery,
  onProfileClick,
}: ProfileCardProps) {
  const navigate = useNavigate();
  const { isSaved, toggleProfile } = useList();
  const saved = isSaved(profile.username);

  const handleClick = () => {
    if (onProfileClick) onProfileClick(profile.username);
    navigate(`/profile/${profile.username}?platform=${platform}`);
  };

  return (
    <div
      onClick={handleClick}
      className="glass-card rounded-2xl p-5 cursor-pointer flex flex-col h-full group"
      data-search={searchQuery}
    >
      <div className="flex items-start gap-4 mb-4">
        <img 
          src={profile.picture} 
          className="w-16 h-16 rounded-full object-cover shadow-sm ring-2 ring-transparent group-hover:ring-indigo-100 dark:group-hover:ring-indigo-900 transition-all" 
          alt={profile.username}
        />
        <div className="flex-1 min-w-0 pt-1">
          <div className="font-bold text-lg text-gray-900 dark:text-white truncate flex items-center gap-1">
            <span className="truncate">@{profile.username}</span>
            <VerifiedBadge verified={profile.is_verified} />
          </div>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
            {profile.fullname}
          </div>
        </div>
      </div>
      
      <div className="mt-auto flex items-center justify-between">
        <div className="text-sm font-semibold text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-slate-700/50 px-3 py-1.5 rounded-lg">
          {formatNumber(profile.followers, "followers")}
        </div>
        
        <button
          className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
            saved 
              ? "bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20" 
              : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-500/10 dark:text-indigo-400 dark:hover:bg-indigo-500/20"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            toggleProfile(profile.username);
          }}
        >
          {saved ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
              Remove
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
              </svg>
              Add
            </>
          )}
        </button>
      </div>
    </div>
  );
});
