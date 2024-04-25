"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from "date-fns";

// import useCountries from "@/app/hooks/useCountries";
import { SafeCompany, SafeInterview, SafeUser } from "@/types";

// import HeartButton from "../HeartButton";
import Button from "../Button";
import ClientOnly from "../ClientOnly";

interface CompanyCardProps {
  data: SafeCompany;
  interview?: SafeInterview;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}

const CompanyCard: React.FC<CompanyCardProps> = ({
  data,
  interview,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser,
}) => {
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

  const interviewDate = useMemo(() => {
    if (!interview) {
      return null;
    }

    const interviewDate = new Date(interview.interviewDate);


    return `${format(interviewDate, "PP")}`;
  }, [interview]);


  return (
    <div onClick={() => router.push(`/company/${data.id}`)}
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
            fill
            className="
              object-cover 
              h-full 
              w-full 
              group-hover:scale-110 
              transition
            "
            src={data.imageSrc}
            alt="Listing"
          />
          </div>
          <div className="font-light text-neutral-500">
          {interviewDate || data.category}
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
//         <div className="font-semibold text-lg">
//           {location?.region}, {location?.label}
//         </div>
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
