"use client";

import { useSearchParams, useRouter } from "next/navigation";
import React, { useState } from "react";

import { formUrlQuery, removeKeysFromUrlQuery } from "@/lib/url";
import { cn } from "@/lib/utils";

import { Button } from "../ui/button";

// Sort options - these are always visible
const sortFilters = [
  { name: "Newest", value: "newest" },
  { name: "Popular", value: "popular" },
  { name: "Unanswered", value: "unanswered" },
];

interface HomeFilterProps {
  topTags?: Tag[];
}

const HomeFilter = ({ topTags = [] }: HomeFilterProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filterParams = searchParams.get("filter");
  const [active, setActive] = useState(filterParams || "");

  const handleTypeClick = (filter: string) => {
    let newUrl = "";

    if (filter === active) {
      setActive("");

      newUrl = removeKeysFromUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ["filter"],
      });
    } else {
      setActive(filter);

      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: filter.toLowerCase(),
      });
    }

    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="mt-10 flex flex-col gap-5">
      {/* Sort Filters */}
      <div className="flex flex-wrap gap-3">
        <span className="text-dark400_light700 body-medium">Sort by:</span>
        {sortFilters.map((filter) => (
          <Button
            key={filter.value}
            className={cn(
              `body-medium rounded-lg px-6 py-3 capitalize shadow-none`,
              active === filter.value
                ? "bg-primary-100 text-primary-500 hover:bg-primary-100 dark:bg-dark-400 dark:text-primary-500 dark:hover:bg-dark-400"
                : "bg-light-800 text-light-500 hover:bg-light-800 dark:bg-dark-300 dark:text-light-500 dark:hover:bg-dark-300"
            )}
            onClick={() => handleTypeClick(filter.value)}
          >
            {filter.name}
          </Button>
        ))}
      </div>

      {/* Tag Filters - Only show if tags are provided */}
      {topTags && topTags.length > 0 && (
        <div className="flex flex-wrap gap-3">
          <span className="text-dark400_light700 body-medium">
            Filter by tag:
          </span>
          {topTags.map((tag) => (
            <Button
              key={tag._id}
              className={cn(
                `body-medium rounded-lg px-6 py-3 shadow-none`,
                active === tag.name.toLowerCase()
                  ? "bg-primary-100 text-primary-500 hover:bg-primary-100 dark:bg-dark-400 dark:text-primary-500 dark:hover:bg-dark-400"
                  : "bg-light-800 text-light-500 hover:bg-light-800 dark:bg-dark-300 dark:text-light-500 dark:hover:bg-dark-300"
              )}
              onClick={() => handleTypeClick(tag.name)}
            >
              {tag.name}
              <span className="ml-2 text-xs opacity-60">({tag.questions})</span>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeFilter;
