import instagramData from "@/assets/data/search/instagram.json";
import youtubeData from "@/assets/data/search/youtube.json";
import tiktokData from "@/assets/data/search/tiktok.json";
import type { Platform, SearchData, UserProfileSummary } from "@/types";

const platformData: Record<Platform, SearchData> = {
  instagram: instagramData as SearchData,
  youtube: youtubeData as SearchData,
  tiktok: tiktokData as SearchData,
};

export function getSearchData(platform: Platform): SearchData {
  return platformData[platform];
}

export function extractProfiles(platform: Platform): UserProfileSummary[] {
  const data = getSearchData(platform);
  return data.accounts.map((item) => {
    const p = item.account.user_profile;
    const resolvedUsername = p.username || p.handle || (p as { custom_name?: string }).custom_name || "creator";
    return {
      ...p,
      username: resolvedUsername,
    };
  });
}

export function filterProfiles(
  profiles: UserProfileSummary[],
  query: string
): UserProfileSummary[] {
  if (!query) return profiles;
  const cleanQuery = query.trim().startsWith("@") ? query.trim().slice(1) : query.trim();
  if (!cleanQuery) return profiles;
  const lowerQuery = cleanQuery.toLowerCase();
  return profiles.filter((p) => {
    const matchUsername = p.username ? p.username.toLowerCase().includes(lowerQuery) : false;
    const matchFullname = p.fullname ? p.fullname.toLowerCase().includes(lowerQuery) : false;
    const matchHandle = p.handle ? p.handle.toLowerCase().includes(lowerQuery) : false;
    const customName = (p as { custom_name?: string }).custom_name;
    const matchCustomName = customName ? String(customName).toLowerCase().includes(lowerQuery) : false;
    return matchUsername || matchFullname || matchHandle || matchCustomName;
  });
}

export function findProfileInSearchData(username: string): UserProfileSummary | null {
  const lowerUsername = username.toLowerCase();
  for (const platform of PLATFORMS) {
    const profiles = extractProfiles(platform);
    const found = profiles.find((p) => {
      const pUsername = p.username || "";
      return pUsername.toLowerCase() === lowerUsername;
    });
    if (found) return found;
  }
  return null;
}

export const PLATFORMS: Platform[] = ["instagram", "youtube", "tiktok"];

export function getPlatformLabel(platform: Platform): string {
  if (platform === "instagram") return "Instagram";
  if (platform === "youtube") return "YouTube";
  return "TikTok";
}
