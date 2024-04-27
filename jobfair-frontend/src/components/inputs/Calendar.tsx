'use client'

import { Calendar, Range, RangeKeyDict } from "react-date-range";

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

interface CalendarProps {
    value: Date;
    onChange: (value: Date) => void;
    disabledDates?: Date[]
}

const InterviewCalendar: React.FC<CalendarProps> = ({
    value,
    onChange,
    disabledDates,
}) => {
    return (
        <Calendar 
            color="#262626"
            rangeColors={["#262626"]}
            date={value}
            onChange={onChange}
            direction="vertical"
            minDate={new Date()}
            disabledDates={disabledDates}
            displayMode="date"
            showDateDisplay={false}
        />
    )
}

export default InterviewCalendar