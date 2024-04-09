'use client'

import VideoPlayer from "./VideoPlayer"
import { useState } from "react"
import { useWindowListener } from "../hooks/useWindowListener";

export default function PromoteCard(){
    
    const [playing, setPlaying] = useState(true);
   
    useWindowListener('contextmenu',(e)=>e.preventDefault())

    return(
        <div className="w-[80%] shadow-lg mx-[10%] p-2 rounded-lg bg-gray-200 flex flex-row px-2 item-center">
            <VideoPlayer vdoSrc="/video/getvaccine.mp4" isPlaying={playing}></VideoPlayer>
            <div className="mx-1">
                Come get Vaccinated!
                <button className="block rounded-md bg-sky-600 hover:bg-cyan-500 hover:text-gray-100 px-3 py-2 text-white shadow-sm"
                        onClick={() => {
                            setPlaying(!playing);
                        }}>
                    {playing? 'PAUSE':'PLAY'}
                </button>
            </div>
        </div>
    )
}
