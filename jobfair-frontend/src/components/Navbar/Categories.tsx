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
} from "react-icons/gi";
import {
  FaSkiing,
  FaChalkboardTeacher,

} from "react-icons/fa";
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

export const categories = [
  {
    label: "Administrative",
    icon: RiAdminFill,
    description: "This property is close to the beach!",
  },
  {
    label: "Design",
    icon: MdDesignServices,
    description: "This property is has windmills!",
  },
  {
    label: "Business",
    icon: MdBusinessCenter,
    description: "This property is modern!",
  },
  {
    label: "Consulting",
    icon: MdEmojiPeople,
    description: "This property is in the countryside!",
  },
  {
    label: "Support",
    icon: MdOutlineSupportAgent,
    description: "This is property has a beautiful pool!",
  },
  {
    label: "Education",
    icon: FaChalkboardTeacher,
    description: "This property is on an island!",
  },
  {
    label: "Engineering",
    icon: MdEngineering,
    description: "This property is near a lake!",
  },
  {
    label: "Fin&Acc",
    icon: FaMoneyBill1Wave,
    description: "This property has skiing activies!",
  },
  {
    label: "Healthcare",
    icon: MdHealthAndSafety,
    description: "This property is an ancient castle!",
  },
  {
    label: "HR",
    icon: FaPeopleGroup,
    description: "This property is in a spooky cave!",
  },
  {
    label: "IT",
    icon: GrTechnology,
    description: "This property offers camping activities!",
  },
  {
    label: "Legal",
    icon: BsSnow,
    description: "This property is in arctic environment!",
  },
  {
    label: "Marketing",
    icon: IoStorefrontSharp,
    description: "This property is in the desert!",
  },
  {
    label: "Media&Com",
    icon: GiBarn,
    description: "This property is in a barn!",
  },
  {
    label: "Other",
    icon: IoDiamond,
    description: "This property is brand new and luxurious!",
  },
  {
    label: "Product",
    icon: MdOutlineProductionQuantityLimits,
    description: "This property is brand new and luxurious!",
  },
  {
    label: "Research",
    icon: GiArchiveResearch,
    description: "This property is brand new and luxurious!",
  },
  {
    label: "Food Services",
    icon: MdFastfood,
    description: "This property is brand new and luxurious!",
  },
  {
    label: "Sales",
    icon: MdOutlineCurrencyExchange,
    description: "This property is brand new and luxurious!",
  },
  {
    label: "Manufacturing",
    icon: MdOutlinePrecisionManufacturing,
    description: "This property is brand new and luxurious!",
  },
  {
    label: "Transportation",
    icon: MdEmojiTransportation,
    description: "This property is brand new and luxurious!",
  },
];


const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();
  const isMainPage = pathname === "/";

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
        {categories.map((item) => (
          <CategoryBox
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
