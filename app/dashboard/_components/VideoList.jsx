import React, { useState } from 'react'
import { Thumbnail } from "@remotion/player";
import RemotionVideo from './RemotionVideo';
import PlayerDialog from './PlayerDialog';
import { useRouter } from "next/navigation";
function VideoList({ videoList }) {
    const [openPlayDialog,setOpenPlayerDialog]=useState(false);
    const [videoId,setVideoId]=useState();

    const router = useRouter()
    
    return (
        <div className='mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-1 
        gap-10'>
            {videoList?.map((video, index) => (
                <div className='cursor-pointer 
                hover:scale-105 transition-all'
                // onClick={()=>{setOpenPlayerDialog(Date.now());setVideoId(video?.id)}}
                onClick={()=>{router.replace('/dashboard/video/' + video?.id)}}
                >
                    <Thumbnail
                        component={RemotionVideo}
                        compositionWidth={1000}
                        compositionHeight={390}
                        frameToDisplay={30}
                        durationInFrames={120}
                        fps={30}
                        style={{
                            borderRadius:15
                        }}
                        inputProps={{
                            ...video,
                            setDurationInFrame:(v)=>console.log(v)
                        }}
                    />
                </div>
            ))}
            <PlayerDialog playVideo={openPlayDialog} videoId={videoId} />
        </div>
    )
}

export default VideoList