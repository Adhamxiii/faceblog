"use client";

import { useRouter } from "next/navigation";

const Pagination = ({
  page,
  hasPrevious,
  hasNext,
}: {
  page: number;
  hasPrevious: boolean;
  hasNext: boolean;
}) => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between gap-[10px]">
      <button
        className="flex w-[100px] cursor-pointer items-center justify-center gap-[10px] rounded-[10px] border-none bg-[#dc143c] px-[20px] py-[10px] text-[16px] text-white disabled:bg-gray-400 disabled:cursor-not-allowed"
        onClick={() => router.push(`?page=${page - 1}`)}
        disabled={!hasPrevious}
      >
        Previous
      </button>
      <button
        className="flex w-[100px] cursor-pointer items-center justify-center gap-[10px] rounded-[10px] border-none bg-[#dc143c] px-[20px] py-[10px] text-[16px] text-white disabled:bg-gray-400 disabled:cursor-not-allowed"
        onClick={() => router.push(`?page=${page + 1}`)}
        disabled={!hasNext}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
