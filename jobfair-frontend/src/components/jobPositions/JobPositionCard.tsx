"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from "date-fns";
import { MdLocationPin } from "react-icons/md";
import { GiStairsGoal } from "react-icons/gi";
import { MdBusinessCenter } from "react-icons/md";
import { IoBusiness } from "react-icons/io5";
import { FaStairs } from "react-icons/fa6";

import { SafeCompany, SafeInterview, SafeJobPosition, SafeUser } from "@/types";

import Button from "../Button";
import useCountries from "@/hooks/useCountries";
import HeartButton from "../HeartButton";

interface JobPositionCardProps {
  data: SafeJobPosition;
  interview?: SafeInterview;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
  jobPositions?: SafeJobPosition[] | null;
}

const JobPositionCard: React.FC<JobPositionCardProps> = ({
  data,
  interview,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser,
  jobPositions,
}) => {
  console.log(jobPositions);
  const router = useRouter();
  const { getByValue } = useCountries();

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [disabled, onAction, actionId]
  );

  const interviewDate = useMemo(() => {
    if (!interview) {
      return null;
    }

    const interviewDate = new Date(interview.interviewDate);

    return `${format(interviewDate, "PP")}`;
  }, [interview]);

  const jobPositionCount = useMemo(() => {
    if (!jobPositions) {
      return 0;
    }

    return jobPositions.filter(
      (jobPosition) => jobPosition.companyId === data.id
    ).length;
  }, [jobPositions, data.id]);

  return (
    <div
      onClick={() => router.push(`/jobs/${data.id}`)}
      className="col-span-2 
                cursor-pointer   
                rounded-full 
                drop-shadow-md
                hover:drop-shadow-xl
                transition
                cursor-pointer"
    >
      <div className="flex flex-col gap-4 w-full bg-white shadow-md rounded-xl p-6">
        {/* Logo section */}
        <div className="aspect-square relative overflow-hidden rounded-xl w-16 ml-4">
          <Image
            className="object-cover h-full w-full rounded-xl group-hover:scale-110 transition "
            src={data.company.imageSrc}
            alt="Company Logo"
            layout="fill"
            objectFit="contain"
          />
        </div>

        {/* Job details section */}
        <div className="">
          {/* Job title */}
          <div className="font-bold text-2xl text-gray-800  ml-4 cursor-pointer hover:underline">
            {data.title}
          </div>
          <div className="font-light text-sm text-gray-500 ml-5">
            Posted date: {format(Date.parse(data.createdAt), "MMM do yyyy")}
          </div>
          {/* Company name and job type */}
          <div className=""></div>
          <div className="h-px bg-gray-300 my-2 w-full"></div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="flex font-bold text-neutral-500 text-xs ml-5 gap-2">
              <IoBusiness /> {data.company.name}
            </div>
            <div className="flex font-bold text-neutral-500 text-xs ml-2 gap-2">
              <MdBusinessCenter /> {data.type}
            </div>
            <div className="flex font-bold text-neutral-500 text-xs ml-5 gap-2">
              <GiStairsGoal /> {data.experience}
            </div>
          </div>

          {/* Experience */}
        </div>
      </div>
    </div>
  );
};
export default JobPositionCard;
