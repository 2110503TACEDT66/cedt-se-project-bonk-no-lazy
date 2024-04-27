'use client';

import Button from "../Button";
import Calendar from "../inputs/Calendar";

import { Range } from "react-date-range";

interface CompanyInterviewProps {
  interviewDate: Date,
  onChangeDate: (value: Date) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
}

const CompanyInterview: React.FC<
  CompanyInterviewProps
> = ({
  interviewDate,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates
}) => {
  return ( 
    <div 
      className="
      bg-white 
        rounded-xl 
        border-[1px]
      border-neutral-200 
        overflow-hidden
      "
    >
      <div className="
      flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold">
          $ 1000
        </div>
        <div className="font-light text-neutral-600">
          night
        </div>
      </div>
      <hr />
      <Calendar
        value={interviewDate}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value)}
      />
      <hr />
      <div className="p-4">
        <Button 
          disabled={disabled} 
          label="Reserve" 
          onClick={onSubmit}
        />
      </div>
      <hr />
      <div 
        className="
          p-4 
          flex 
          flex-row 
          items-center 
          justify-between
          font-semibold
          text-lg
        "
      >
        <div>
          Total
        </div>
        <div>
          $ 1000
        </div>
      </div>
    </div>
   );
}
 
export default CompanyInterview;