"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
  GiOfficeChair,
  GiArchiveResearch,
  GiGreekTemple,
} from "react-icons/gi";
import { FaSkiing, FaChalkboardTeacher } from "react-icons/fa";
import { FaMoneyBill1Wave, FaPeopleGroup } from "react-icons/fa6";

import { IoStorefrontSharp } from "react-icons/io5";

import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import {
  MdOutlineVilla,
  MdDesignServices,
  MdBusinessCenter,
  MdEmojiPeople,
  MdOutlineSupportAgent,
  MdEngineering,
  MdHealthAndSafety,
  MdOutlineProductionQuantityLimits,
  MdFastfood,
  MdOutlineCurrencyExchange,
  MdOutlinePrecisionManufacturing,
  MdEmojiTransportation,
} from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { GrTechnology } from "react-icons/gr";

import CategoryBox from "../CategoryBox";
import Container from "../Container";
import { TiShoppingCart } from "react-icons/ti";

export const companyCategories = [
  {
    label: "Technology",
    icon: RiAdminFill,
    description: "This property is close to the beach!",
  },
  {
    label: "Bank",
    icon: MdDesignServices,
    description: "This property is has windmills!",
  },
  {
    label: "Retail",
    icon: MdEmojiPeople,
    description: "This property is in the countryside!",
  },
  {
    label: "Hospitality",
    icon: MdOutlineSupportAgent,
    description: "This is property has a beautiful pool!",
  },
  {
    label: "Entertainment",
    icon: FaChalkboardTeacher,
    description: "This property is on an island!",
  },
  {
    label: "Construction",
    icon: MdEngineering,
    description: "This property is near a lake!",
  },
  {
    label: "Insurance",
    icon: FaMoneyBill1Wave,
    description: "This property has skiing activies!",
  },
  {
    label: "Real Estate",
    icon: MdHealthAndSafety,
    description: "This property is an ancient castle!",
  },
  {
    label: "Creative",
    icon: GrTechnology,
    description: "This property offers camping activities!",
  },
  {
    label: "Healthcare", // This category already existed, so it's not added again.
    icon: MdHealthAndSafety,
    description: "This property is an ancient castle!",
  },
  {
    label: "Education", // This category already existed, so it's not added again.
    icon: FaChalkboardTeacher,
    description: "This property is on an island!",
  },
  {
    label: "Energy",
    icon: MdOutlinePrecisionManufacturing,
    description: "This property is brand new and luxurious!",
  },
  {
    label:  "Telecom",
    icon: MdEmojiTransportation,
    description: "This property is brand new and luxurious!",
  },
  {
    label: "Media",
    icon: GiBarn,
    description: "This property is in a barn!",
  },
  {
    label: "Startup",
    icon: IoDiamond,
    description: "This property is brand new and luxurious!",
  },
];

export const jobCategories = [
  
  {
    label: "On-Site",
    icon: MdEmojiTransportation,
    description: "This property is brand new and luxurious!",
  },
  {
    label: "Online",
    icon: GiBarn,
    description: "This property is in a barn!",
  },
  {
    label: "Hybrid",
    icon: IoDiamond,
    description: "This property is brand new and luxurious!",
  },
];



const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();
  const isMainPage = pathname === "/" || pathname ==="/jobs" ;

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div
        className="
          pt-4
          flex 
          flex-row 
          items-center 
          justify-between
          overflow-x-auto
        "
      >
        {pathname === "/jobs"
          ? jobCategories.map((item) => (
              <CategoryBox
                pathname={pathname}
                key={item.label}
                label={item.label}
                icon={item.icon}
                selected={category === item.label}
              />
            ))
          : companyCategories.map((item) => (
              <CategoryBox
                pathname={pathname}
                key={item.label}
                label={item.label}
                icon={item.icon}
                selected={category === item.label}
              />
            ))}
      </div>
    </Container>
  );
};

export default Categories;
