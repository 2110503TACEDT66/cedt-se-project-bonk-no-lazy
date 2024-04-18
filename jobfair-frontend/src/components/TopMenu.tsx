import styles from '@/components/topmenu.module.css'
import Image from 'next/image';
import TopMenuItem from './TopMenuItem';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Link from 'next/link';
import { ClassNames } from '@emotion/react';
import getUserProfile from '@/libs/getUserProfile';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

export default async function TopMenu(){


    const session = await getServerSession(authOptions)

    var profile;

    if (session) {
        profile = await getUserProfile(session.user.token) as userJSON
    }
    console.log(profile?.data.role)
    return(
        <div className='h-[50px] bg-neutral-900 border-neutral-700 border-t-0 border-l-0 border-r-0 border-2 fixed top-0 right-0 z-30 flex flex-row
        rounded-b-lg w-[100vw] items-center pl-[10px] pr-[50px]'>
            <Link href='/' >
                    <div className='flex items-center h-[70%] px-2 py-2 rounded-lg 
                     text-black bg-white text-sm
                     flex-start top-2 mx-2 transition transform duration-200 ease hover:scale-105' >
                        Home
                    </div>
                </Link>
            {
                session?
                <>
                    <Link href='/api/auth/signout'>
                        <div className='flex items-center h-[70%] px-2 py-2 rounded-lg 
                        text-black bg-white text-sm
                        left-10 top-2 transition transform duration-200 ease hover:scale-105'>
                            Sign Out of {profile?.data.name}
                        </div>
                    </Link>
                    <Link href='/mybooking' >
                        <div className='flex items-center h-[70%] px-2 py-2 rounded-lg 
                            text-black bg-white text-sm
                            flex-start top-2 mx-2 transition transform duration-200 ease hover:scale-105'>
                                My Booking
                        </div>
                    </Link>
                    {
                        profile?.data.role == 'company'?<Link href='/mycompany' >
                        <div id='sigin-button' className='flex items-center h-[70%] px-2 py-2 rounded-lg 
                        text-black bg-white text-sm
                        flex-start top-2 mx-2 transition transform duration-200 ease hover:scale-105'>
                            My Company Profile
                        </div>
                    </Link>:''
                    }
                    
                    <Link href='/booking'>
                        <div className='absolute right-20 h-[70%] px-2 py-2 rounded-lg 
                            text-black bg-white text-sm
                            flex-start top-2 mx-2 transition transform duration-200 ease hover:scale-105'>
                                Booking
                        </div>
                    </Link>
                </>
                :(
                    <> 
                        <Link href='api/auth/signin' >
                            <div id='sigin-button' className='flex items-center h-[70%] px-2 py-2 rounded-lg 
                            text-black bg-white text-sm
                            flex-start top-2 mx-2 transition transform duration-200 ease hover:scale-105'>
                                Sign in 
                            </div>
                        </Link>
                            <Link href='/register' >
                            <div id='tegister-button' className='flex items-center h-[70%] px-2 py-2 rounded-lg 
                            text-black bg-white text-sm
                            flex-start top-2 mx-2 transition transform duration-200 ease hover:scale-105'>
                                Register
                            </div>
                        </Link>
                    </>
                )

            }            
            <Image src={'/img/logo.png'} className={styles.logoimg} alt='logo' 
            width={0} height={0} sizes='100vh'/>
        </div>
    );
}