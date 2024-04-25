import Container from "@/components/Container";
import CompanyCard from "@/components/companies/CompanyCard";
import EmptyState from "@/components/EmptyState";

import getCompanies, { ICompaniesParams } from "@/app/actions/getCompanies";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "@/components/ClientOnly";

interface HomeProps {
  searchParams: ICompaniesParams;
}

const Home = async ({ searchParams }: HomeProps) => {
  const companies = await getCompanies(searchParams);
  const currentUser = await getCurrentUser();

  if (companies.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div
          className="
            pt-24
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
          "
        >
          {companies.map((company: any) => {
            return <div>{company.name}</div>;
          })}
        </div>
      </Container>
    </ClientOnly>
  );
};

export default Home;
