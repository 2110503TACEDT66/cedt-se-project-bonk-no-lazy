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
  
} from "react-icons/gi";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import { MdOutlineVilla } from "react-icons/md";
import { FcBusinessman } from "react-icons/fc";



import CategoryBox from "../CategoryBox";
import Container from "../Container";

export const categories = [
  {
    label: "Administrative",
    icon: FcBusinessman,
    description: "This property is close to the beach!",
  },
  {
    label: "Design",
    icon: GiWindmill,
    description: "This property is has windmills!",
  },
  {
    label: "Business",
    icon: MdOutlineVilla,
    description: "This property is modern!",
  },
  {
    label: "Consulting",
    icon: TbMountain,
    description: "This property is in the countryside!",
  },
  {
    label: "Customer",
    icon: TbPool,
    description: "This is property has a beautiful pool!",
  },
  {
    label: "Education",
    icon: GiIsland,
    description: "This property is on an island!",
  },
  {
    label: "Engineering",
    icon: GiBoatFishing,
    description: "This property is near a lake!",
  },
  {
    label: "Fin&Acc",
    icon: FaSkiing,
    description: "This property has skiing activies!",
  },
  {
    label: "Healthcare",
    icon: GiCastle,
    description: "This property is an ancient castle!",
  },
  {
    label: "HR",
    icon: GiCaveEntrance,
    description: "This property is in a spooky cave!",
  },
  {
    label: "IT",
    icon: GiForestCamp,
    description: "This property offers camping activities!",
  },
  {
    label: "Legal",
    icon: BsSnow,
    description: "This property is in arctic environment!",
  },
  {
    label: "Marketing",
    icon: GiCactus,
    description: "This property is in the desert!",
  },
  {
    label: "Media&Comms",
    icon: GiBarn,
    description: "This property is in a barn!",
  },
  {
    label: "Operations",
    icon: IoDiamond,
    description: "This property is brand new and luxurious!",
  },
  {
    label: "Other",
    icon: IoDiamond,
    description: "This property is brand new and luxurious!",
  },
  {
    label: "Research",
    icon: IoDiamond,
    description: "This property is brand new and luxurious!",
  },
  {
    label: "Food",
    icon: IoDiamond,
    description: "This property is brand new and luxurious!",
  },
  {
    label: "Sales",
    icon: IoDiamond,
    description: "This property is brand new and luxurious!",
  },
  {
    label: "Manufacturing",
    icon: IoDiamond,
    description: "This property is brand new and luxurious!",
  },
  {
    label: "Transportation",
    icon: IoDiamond,
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
          pt-7
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