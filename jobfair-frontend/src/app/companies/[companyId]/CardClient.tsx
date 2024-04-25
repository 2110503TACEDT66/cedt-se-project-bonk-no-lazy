// "use client";

// import { useMemo } from "react";
// import { CompanyItem, ReviewItem, user } from "../../../../interface";
// import { categories } from "@/components/navbar/Categories";
// import { Container } from "@mui/system";
// import CompanyHead from "@/components/listings/CompanyHead";
// import { SafeUser } from "@/types";
// interface CardClientProps {
//   reviewItem?: ReviewItem[];
//   company: CompanyItem;
//   currentUser?: SafeUser;
// }
// const CardClient: React.FC<CardClientProps> = ({ company, currentUser }) => {
//   // const category = useMemo(()=>{
//   //     return categories.find((item)=>
//   //     item.label === company.category)
//   // },[company.category])
//   // use this when our company model
//   // has category attr
//   return (
//     <Container>
//       <div className="max-w-screen-lg mx-auto">
//         <div className="flex flex-col gap-6">
//           <CompanyHead
//             title={company.name}
//             imageSrc={company.picture}
//             id={company.id}
//             currentUser={currentUser}
//           ></CompanyHead>
//         </div>
//       </div>
//     </Container>
//   );
// };

// export default CardClient;
