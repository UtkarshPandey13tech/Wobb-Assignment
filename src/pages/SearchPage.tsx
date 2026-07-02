import { useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import type { Platform } from "@/types";
import { Layout } from "@/components/Layout";
import { PlatformFilter } from "@/components/PlatformFilter";
import { ProfileList } from "@/components/ProfileList";
import { extractProfiles, filterProfiles } from "@/utils/dataHelpers";

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const platform = (searchParams.get("platform") as Platform) || "instagram";
  const searchQuery = searchParams.get("q") || "";

  const allProfiles = useMemo(() => extractProfiles(platform), [platform]);
  const filtered = useMemo(() => filterProfiles(allProfiles, searchQuery), [allProfiles, searchQuery]);

  const handleProfileClick = useCallback((username: string) => {
    console.log("Clicked profile:", username);
  }, []);

  const handlePlatformChange = useCallback((p: Platform) => {
    setSearchParams((prev) => {
      prev.set("platform", p);
      prev.delete("q");
      return prev;
    });
  }, [setSearchParams]);

  const handleSearchChange = useCallback((val: string) => {
    setSearchParams((prev) => {
      if (val) {
        prev.set("q", val);
      } else {
        prev.delete("q");
      }
      return prev;
    });
  }, [setSearchParams]);

  return (
    <Layout>
      <div className="flex flex-col items-center mb-10 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
          Discover <span className="text-gradient">Top Creators</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
          Browse and filter through the best influencers across Instagram, YouTube, and TikTok to find your next collaboration.
        </p>
      </div>

      <PlatformFilter
        selected={platform}
        onChange={handlePlatformChange}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />

      <div className="flex justify-between items-end mb-4 border-b border-gray-200 dark:border-slate-800 pb-2">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          {searchQuery ? "Search Results" : "Trending Profiles"}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
          Showing {filtered.length} {filtered.length === 1 ? 'profile' : 'profiles'}
        </p>
      </div>

      <ProfileList
        profiles={filtered}
        platform={platform}
        searchQuery={searchQuery}
        onProfileClick={handleProfileClick}
      />
    </Layout>
  );
}
