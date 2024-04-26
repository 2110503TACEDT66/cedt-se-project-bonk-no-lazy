"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from "date-fns";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";

// import useCountries from "@/app/hooks/useCountries";
import { SafeCompany, SafeInterview, SafeJobPosition, SafeUser } from "@/types";

// import HeartButton from "../HeartButton";
import Button from "../Button";
import ClientOnly from "../ClientOnly";
import { JobPosition } from "@prisma/client";

interface CompanyCardProps {
  data: SafeCompany;
  name?: String;
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
  name,
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
  // const { getByValue } = useCountries();

  // const location = getByValue(data.locationValue);

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

  // const price = useMemo(() => {
  //   if (interview) {
  //     return interview.totalPrice;
  //   }

  //   return data.price;
  // }, [interview, data.price]);


  const companyName = useMemo(() => {
    return name || null;
  }, [name]);


    


  const interviewDate = useMemo(() => {
    if (!interview) {
      return null;
    }

    const interviewDate = new Date(interview.interviewDate);


    return `${format(interviewDate, "PP")}`;
  }, [interview]);

  const jobPositionCount = useMemo(() => {
    if (!jobPositions) return 0;
    return jobPositions.filter((jobPosition) => jobPosition.companyId === data.id).length;
  }, [jobPositions, data.id]);


  return (
    <div
      onClick={() => router.push(`/company/${data.id}`)}
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
            layout="fill"
            objectFit="contain" // นี้เป็นส่วนที่เพิ่มเข้ามา
          />
        </div>

        <div className="font-semibold text-lg">{companyName || data.name}</div>
        <div className="flex items-center">
          <div className="font-light text-neutral-500 text-xs">
            {interviewDate || data.category}
          </div>
          <div className="icon">
            <i className="fa fa-TbBeach"></i>
          </div>
          <div className="font-light text-neutral-500 text-xs ml-4">
            {data.address}
          </div>
        </div>
        <div className="flex items-center">
          <div className="font-semibold text-blue-400 text-sm">
            {jobPositionCount} Job {jobPositionCount === 1 ? 'Position':'Positions'} Available
          </div>
        </div>
        <div className="flex items-center">
          <div className="font-light text-neutral-500 text-sm">
            {
              jobPositions?.filter((jobPosition: SafeJobPosition) => jobPosition.companyId === data.id)
              .map((jobPosition: SafeJobPosition) => jobPosition.title).join(', ')
            }
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
  );
}
//   return (
//     <div
//       onClick={() => router.push(`/listings/${data.id}`)}
//       className="col-span-1 cursor-pointer group"
//     >
//       <div className="flex flex-col gap-2 w-full">
//         <div
//           className="
//             aspect-square 
//             w-full 
//             relative 
//             overflow-hidden 
//             rounded-xl
//           "
//         >
//           <Image
//             fill
//             className="
//               object-cover 
//               h-full 
//               w-full 
//               group-hover:scale-110 
//               transition
//             "
//             src={data.imageSrc}
//             alt="Listing"
//           />
//           <div
//             className="
//             absolute
//             top-3
//             right-3
//           "
//           >
//             <HeartButton listingId={data.id} currentUser={currentUser} />
//           </div>
//         </div>
        // <div className="font-semibold text-lg">
        //   {location?.region}, {location?.label}
        // </div>
//         <div className="font-light text-neutral-500">
//           {interviewDate || data.category}
//         </div>
//         <div className="flex flex-row items-center gap-1">
//           <div className="font-semibold">$ {price}</div>
//           {!interview && <div className="font-light">night</div>}
//         </div>
//         {onAction && actionLabel && (
//           <Button
//             disabled={disabled}
//             small
//             label={actionLabel}
//             onClick={handleCancel}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

export default CompanyCard;
