"use client";
import { useCountries } from "@/app/hooks/useCountries";
import useSearchModel from "@/app/hooks/useSearchModel";
import { differenceInDays } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { BiSearch } from "react-icons/bi";
const Search = () => {
  const searchModel = useSearchModel();
  const params = useSearchParams();
  const { getByValue } = useCountries();

  const locationValue = params?.get("locationValue");
  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");
  const guestCount = params?.get("guestCount");

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue as string)?.label;
    }
    return "Anywhere";
  }, [locationValue]);

  const dateLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      let dayDifference = differenceInDays(end, start);
      if (dayDifference === 0) dayDifference = 1;
      return `${dayDifference} days`;
    }
    return "Any Time";
  }, [startDate, endDate]);

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} guests`;
    }
    return "Guests";
  }, [guestCount]);
  return (
    <div
      onClick={searchModel.onOpen}
      className="border-[1px] py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer sm:w-auto w-full "
    >
      <div className="flex flex-row items-center justify-between">
        <div className="text-sm font-semibold px-6">{locationLabel}</div>
        <div className="hidden sm:block text-sm font-semibold border-x-[1px] flex-1 text-center px-6">
          {dateLabel}
        </div>
        <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
          <div className="hidden sm:block ">{guestLabel}</div>
          <div className="p-2 bg-rose-500 text-white rounded-full">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Search;
