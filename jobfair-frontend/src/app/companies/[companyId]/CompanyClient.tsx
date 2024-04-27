"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { categories } from "@/components/navbar/Categories";
import { Container } from "@mui/system";
import CompanyHead from "@/components/companies/CompanyHead";
import { SafeCompany, SafeInterview, SafeUser } from "@/types";
import CompanyInfo from "@/components/companies/CompanyInfo";
import useLoginModal from "@/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import CompanyInterview from "@/components/companies/CompanyInterview";

const initialDate = {
  interviewDate: new Date(),
  key: 'selection'
}

interface CompanyClientProps {
  interviews?: SafeInterview[];
  company: SafeCompany & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
}
const CompanyClient: React.FC<CompanyClientProps> = ({ 
    company,
    interviews = [],
    currentUser, 
}) => {
  const loginModal = useLoginModal()
  const router = useRouter()

  const disabledDates = useMemo(() => {
    return interviews.map((interview) => new Date(Date.parse(interview.interviewDate)));
  }, [interviews])

  const [isLoading, setIsLoading] = useState(false)
  const [interviewDate, setInterviewDate] = useState<Date>(initialDate.interviewDate)

  const onCreateInterview = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen()
    }

    setIsLoading(true)

    axios.post('/api/interviews', {
      interviewDate: interviewDate,
      companyId: company?.id,
    })
    .then(() => {
      toast.success('Interview booked!')
      setInterviewDate(initialDate.interviewDate)

      router.refresh()
    })
    .catch(() => {
      toast.error('Something went wrong.')
    })
    .finally(() => {
      setIsLoading(false)
    })
  }, [interviewDate, company?.id, router, currentUser, loginModal])

  const category = useMemo(() => {
      return categories.find((item) =>
      item.label === company.category)
  }, [company.category])

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <CompanyHead
            name={company.name}
            imageSrc={company.imageSrc}
            locationValue={company.locationValue}
            address={company.address}
            id={company.id}
            currentUser={currentUser}
          />
          <div className="
            grid
            grid-cols-1
            md:grid-cols-7
            md:gap-10
            mt-6
          ">
            <CompanyInfo 
                user={company.user}
                category={category}
                description={company.description}
                website={company.website}
                tel={company.tel}
                locationValue={company.locationValue}
            />
            <div
              className="
                order-first
                mb-10
                md:order-last
                md:col-span-3
              "
            >
              <CompanyInterview 
                onChangeDate={(value) => setInterviewDate(value)}
                interviewDate={interviewDate}
                onSubmit={onCreateInterview}
                disabled={isLoading}
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CompanyClient;
