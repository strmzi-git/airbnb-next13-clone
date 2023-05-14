"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
import { IconType } from "react-icons";
import qs from "query-string";

interface CategoryBoxProps {
  label: string;
  icon: IconType;
  selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = function ({
  label,
  icon: Icon,
  selected,
}) {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    // Create empty query object
    let currentQuery = {};
    // Parse current queryobject to an object from strsing
    if (params) {
      currentQuery = qs.parse(params.toString());
    }
    // Make a new query object with a new feature: category
    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };
    // if category already existed and was === label, remove it (toggle)
    if (params?.get("category") === label) {
      delete updatedQuery.category;
    }
    // create url object
    const url = qs.stringifyUrl(
      { url: "/", query: updatedQuery },
      {
        skipNull: true,
      }
    );
    // update the url
    router.push(url);
  }, [label, params, router]);

  return (
    <div
      className={`flex flex-col items-center justify-center gap-1 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer 
      ${selected ? "border-b-neutral-800" : "border-transparent"}
      ${selected ? "text-neutral-800" : "text-neutral-500"}
      `}
      onClick={handleClick}
    >
      <Icon size={26} />
      <div className="font-medium text-sm ">{label}</div>
    </div>
  );
};

export default CategoryBox;
