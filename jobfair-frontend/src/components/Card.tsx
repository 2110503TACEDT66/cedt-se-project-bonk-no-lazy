import Image from "next/image";
import InteractiveCard from "./InteractiveCard";

export default function Card({
  companyName,
  imgSrc,
  onCompare,
}: {
  companyName: string;
  imgSrc: string;
  onCompare?: Function;
}) {

  return (
    <div className="mx-2 my-5 hover:-translate-y-1 duration-150 ease shadow-xl shadow-slate-500/50">
    <InteractiveCard contentName={companyName}>
      <div className="w-full h-[65%] relative rounded-t-lg">
        <Image
          src={imgSrc}
          alt="Company Picture"
          fill={true}
          priority
          sizes="100vh"
          className="object-cover rounded-t-lg transition transform"
        />
      </div>
      <div className="w-full h-[15%] p-[10px] text-black font-semibold">
        {companyName}
      </div>
  
    </InteractiveCard>
    </div>
  );
}
