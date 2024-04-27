"use client";

import { useMemo } from "react";
import { categories } from "@/components/navbar/Categories";
import { Container } from "@mui/system";
import CompanyHead from "@/components/companies/CompanyHead";
import { SafeCompany, SafeUser } from "@/types";
import { Interview } from "@prisma/client";
import CompanyInfo from "@/components/companies/CompanyInfo";

interface CompanyClientProps {
  interviews?: Interview[];
  company: SafeCompany & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
}
const CompanyClient: React.FC<CompanyClientProps> = ({ 
    company, 
    currentUser, 
}) => {
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
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CompanyClient;
