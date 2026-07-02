import React from "react";
import type { Platform } from "@/types";
import { PLATFORMS, getPlatformLabel } from "@/utils/dataHelpers";
import { SearchBar } from "./SearchBar";

interface PlatformFilterProps {
  selected: Platform;
  onChange: (platform: Platform) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export const PlatformFilter = React.memo(function PlatformFilter({
  selected,
  onChange,
  searchQuery,
  onSearchChange,
}: PlatformFilterProps) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
      {/* Search Input */}
      <SearchBar 
        value={searchQuery} 
        onChange={onSearchChange} 
        placeholder="Search by username or name..." 
      />

      {/* Segmented Controls / Pills */}
      <div className="flex p-1 bg-gray-100 dark:bg-slate-800 rounded-xl shadow-inner w-full md:w-auto">
        {PLATFORMS.map((p) => {
          const isSelected = selected === p;
          return (
            <button
              key={p}
              type="button"
              onClick={() => onChange(p)}
              className={`
                flex-1 md:flex-none relative px-5 py-2 text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none
                ${isSelected 
                  ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm ring-1 ring-black/5 dark:ring-white/5" 
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-200/50 dark:hover:bg-slate-700/50"}
              `}
            >
              {getPlatformLabel(p)}
            </button>
          );
        })}
      </div>
    </div>
  );
});
