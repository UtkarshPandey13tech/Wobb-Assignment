import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import { useList } from "@/hooks/useList";
import { formatEngagementRate, formatNumber } from "@/utils/formatters";
import type { FullUserProfile, ProfileDetailResponse } from "@/types";
import { loadProfileByUsername } from "@/utils/profileLoader";

export function ProfileDetailPage() {
  const { username } = useParams<{ username: string }>();
  const [searchParams] = useSearchParams();
  const platform = searchParams.get("platform") || "unknown";
  const [profileData, setProfileData] = useState<ProfileDetailResponse | null>(
    null
  );
  const [loaded, setLoaded] = useState(false);
  const { isSaved, toggleProfile } = useList();
  const saved = username ? isSaved(username) : false;

  useEffect(() => {
    if (!username) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoaded(false);
    setProfileData(null);

    loadProfileByUsername(username).then((data) => {
      setProfileData(data);
      setLoaded(true);
    });
  }, [username]);

  if (!username) {
    return (
      <Layout>
        <p>Invalid profile</p>
        <Link to="/">Back</Link>
      </Layout>
    );
  }

  if (!loaded) {
    return (
      <Layout title={`@${username}`}>
        <div className="flex justify-center py-20">
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-24 h-24 bg-gray-200 dark:bg-slate-700 rounded-full mb-4"></div>
            <div className="h-6 w-32 bg-gray-200 dark:bg-slate-700 rounded mb-2"></div>
            <div className="h-4 w-48 bg-gray-200 dark:bg-slate-700 rounded"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!profileData) {
    return (
      <Layout>
        <div className="text-center py-20">
          <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Profile Not Found</h3>
          <p className="text-gray-500 mb-6">Could not load profile details for @{username}</p>
          <Link to="/" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
            Back to Search
          </Link>
        </div>
      </Layout>
    );
  }

  const user: FullUserProfile = profileData.data.user_profile;

  return (
    <Layout>
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors">
          <svg className="mr-1.5 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
          </svg>
          Back to Search
        </Link>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-slate-700 mb-8 max-w-4xl mx-auto">
        <div className="px-6 sm:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5">
              <img
                src={user.picture}
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-indigo-100 dark:border-slate-700 object-cover shadow-md bg-white"
                alt={user.username}
              />
              <div className="pt-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center sm:justify-start gap-2">
                  @{user.username}
                  <VerifiedBadge verified={user.is_verified} />
                </h1>
                <p className="text-gray-600 dark:text-gray-400 font-medium text-lg mt-1">{user.fullname}</p>
                <div className="inline-flex mt-2 items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-slate-700 dark:text-gray-200 capitalize">
                  {platform}
                </div>
              </div>
            </div>
            
            <div className="mt-6 sm:mt-0 flex flex-col sm:flex-row gap-3">
              {user.url && (
                <a
                  href={user.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 dark:border-slate-600 shadow-sm text-sm font-medium rounded-lg text-gray-700 dark:text-gray-200 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                >
                  <svg className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  View Profile
                </a>
              )}
              <button
                onClick={() => toggleProfile(user.username)}
                className={`inline-flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg transition-colors ${
                  saved 
                    ? "bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50" 
                    : "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                }`}
              >
                {saved ? "Remove from List" : "Add to List"}
              </button>
            </div>
          </div>

          {user.description && (
            <div className="mb-8 p-4 bg-gray-50 dark:bg-slate-800/50 rounded-xl border border-gray-100 dark:border-slate-700/50">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap text-sm sm:text-base">
                {user.description}
              </p>
            </div>
          )}

          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Performance Metrics</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Followers</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatNumber(user.followers)}
              </div>
            </div>
            
            <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Engagement Rate</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatEngagementRate(user.engagement_rate)}
              </div>
            </div>

            {user.posts_count !== undefined && (
              <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Posts</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{user.posts_count}</div>
              </div>
            )}
            
            {user.engagements !== undefined && (
              <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Engagements</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatNumber(user.engagements)}
                </div>
              </div>
            )}

            {user.avg_likes !== undefined && (
              <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Avg Likes</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatNumber(user.avg_likes)}
                </div>
              </div>
            )}
            
            {user.avg_comments !== undefined && (
              <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Avg Comments</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{user.avg_comments}</div>
              </div>
            )}
            
            {user.avg_views !== undefined && user.avg_views > 0 && (
              <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Avg Views</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatNumber(user.avg_views)}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
