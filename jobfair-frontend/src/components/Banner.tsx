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
    <div
      className={styles.banner}
    >
      <div className={styles.bannerImg}>
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
        {
          session? <div className="bg-rose-200 text-rose-500 border border-rose-500 font-semibold z-30 absolute top-0 right-0 m-3
          hover:bg-rose-500 rounded-lg p-2 hover:text-white hover:border-transparent transition transform duration-200 ease hover:-translate-y-2">
             Welcome {user?.data.name} </div> : null
        }
        <button
          className="bg-white text-indigo-600 border border-indigo-600 
        font-semibold py-2 px-2 m-2 rounded-lg z-30 absolute bottom-0 right-0
        hover:bg-indigo-600 hover:text-white hover:border-transparent transition transform duration-200 ease hover:-translate-y-2"
          onClick={(e) => {
            e.stopPropagation();
            router.push("/company");
          }}
        >
          Companies
        </button>
      </div>
    </div>
  );
}
