import type { ProfileDetailResponse } from "@/types";
import { findProfileInSearchData } from "./dataHelpers";

const profileModules = import.meta.glob<ProfileDetailResponse>(
  "../assets/data/profiles/*.json"
);

const profileCache = new Map<string, ProfileDetailResponse>();

export async function loadProfileByUsername(
  username: string
): Promise<ProfileDetailResponse | null> {
  if (profileCache.has(username)) {
    return profileCache.get(username)!;
  }

  const path = `../assets/data/profiles/${username}.json`;
  const loader = profileModules[path];

  if (!loader) {
    const summaryProfile = findProfileInSearchData(username);
    if (!summaryProfile) {
      return null;
    }

    const data: ProfileDetailResponse = {
      data: {
        success: true,
        user_profile: {
          ...summaryProfile,
          description: summaryProfile.fullname 
            ? `${summaryProfile.fullname} is a popular creator with a massive following. They have built an engaged community around their content.`
            : `@${summaryProfile.username} is a popular creator with a massive following. They have built an engaged community around their content.`,
          posts_count: summaryProfile.followers > 100000000 
            ? 2400 
            : summaryProfile.followers > 1000000 
            ? 1200 
            : 450,
          avg_likes: summaryProfile.engagements 
            ? Math.floor(summaryProfile.engagements * 0.9) 
            : Math.floor(summaryProfile.followers * 0.05),
          avg_comments: summaryProfile.engagements 
            ? Math.floor(summaryProfile.engagements * 0.1) 
            : Math.floor(summaryProfile.followers * 0.005),
          avg_reels_plays: summaryProfile.avg_views 
            ? Math.floor(summaryProfile.avg_views * 1.1) 
            : undefined,
          gender: "unknown",
          age_group: "unknown",
        }
      }
    };

    profileCache.set(username, data);
    return data;
  }

  const result = await loader();
  const data =
    (result as { default?: ProfileDetailResponse }).default ?? result;
  
  const finalData = data as ProfileDetailResponse;
  profileCache.set(username, finalData);
  return finalData;
}
