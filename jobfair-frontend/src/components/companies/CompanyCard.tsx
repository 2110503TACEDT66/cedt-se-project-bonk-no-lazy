"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from "date-fns";
import { MdLocationPin } from "react-icons/md";

// import useCountries from "@/app/hooks/useCountries";
import { SafeCompany, SafeInterview, SafeJobPosition, SafeUser } from "@/types";

// import HeartButton from "../HeartButton";
import Button from "../Button";
import ClientOnly from "../ClientOnly";
import useCountries from "@/hooks/useCountries";
import HeartButton from "../HeartButton";

interface CompanyCardProps {
  data: SafeCompany;
  interview?: SafeInterview;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
  jobPositions?: SafeJobPosition[] | null;
}

const CompanyCard: React.FC<CompanyCardProps> = ({
  data,
  interview,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser,
  jobPositions,
}) => {
  console.log(jobPositions)
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue)

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
    
    return jobPositions.filter((jobPosition) => jobPosition.companyId === data.id).length;
  }, [jobPositions, data.id]);


  return (
    <div
      onClick={() => router.push(`/companies/${data.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div
          className="
            aspect-square 
            w-full 
            relative 
            overflow-hidden 
            rounded-xl
          "
        >
          <Image
            className="
              object-cover 
              h-full 
              w-full 
              group-hover:scale-110 
              transition
            "
            src={data.imageSrc}
            alt="Company"
            fill
            objectFit="contain" // นี้เป็นส่วนที่เพิ่มเข้ามา
          />
          <div className="absolute top-3 right-3">
            <HeartButton 
              companyId={data.id} 
              currentUser={currentUser} 
            />
          </div>
        </div>
        <div className="">
          <div className="font-bold text-lg py-1">
            {data.name}
          </div>
          <div className="flex items-center ">
            <div className="font-light text-neutral-500 text-xs">
              {interviewDate || data.category}
            </div>
            <div className="font-light text-neutral-500 text-m ml-4">
              <MdLocationPin />
            </div>
            <div className="font-light text-neutral-500 text-xs ">
              {data.address}, {location?.region}, {location?.label}
            </div>
          </div>
          <div className="flex items-center">
            <div className="font-bold text-blue-400 text-m">
              {jobPositionCount} Job{" "}
              {jobPositionCount === 1 ? "Position" : "Positions"} Available :
            </div>
          </div>
          <div className="flex items-center">
            <div className="font-light text-neutral-500 text-xs">
              {jobPositions
                ?.filter(
                  (jobPosition: SafeJobPosition) =>
                    jobPosition.companyId === data.id
                )
                .map((jobPosition: SafeJobPosition) => jobPosition.title)
                .join(", ")}
            </div>
          </div>
          {onAction && actionLabel && (
            <Button
              disabled={disabled}
              small
              label={actionLabel}
              onClick={handleCancel}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default CompanyCard;
