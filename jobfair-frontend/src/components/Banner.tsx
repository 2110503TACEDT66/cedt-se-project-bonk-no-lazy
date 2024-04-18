"use client";

import { useState } from "react";
import styles from "./banner.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import getUserProfile from "@/libs/getUserProfile";
import { Link } from "@mui/material";


export default function Banner({user} : {user?:userJSON}) {

  const router = useRouter();
  const {data:session} = useSession();  
  console.log(session)

  return (
    <div className="block p-5 m-0 w-[100vw] h-[95vh] relative">
      <div className="opacity-100 block">
        <Image
          src='/img/cover.jpg'
          alt="cover"
          fill={true}
          priority
          sizes="100vh"
          objectFit="cover"
        />
        <Link href='/company' color='inherit' underline="none">
          <div className={styles.bannerText}>
            <h1 className="text-4xl text-white">Online Job Fair Registration</h1>
            <h3 className="text-xl font-serif text-white">Unlock Your Potential and Secure Your Dream Job - Register Now!</h3>
          </div>
        </Link>
      </div>
    </div>
  );
}
