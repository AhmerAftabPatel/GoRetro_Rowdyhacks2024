'use client'
import React, { useEffect, useState } from "react";
import VideoPlayer from "../../_components/VideoPlayer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { VideoData } from "@/configs/schema";

export default function VideoRenderPage({ params }) {
  const [videoData, setVideoData] = useState({});

  // useEffect(() => {
  //   // videoId && setOpenDialog(!openDialog);
  //   params.id && GetVideoData();
  // }, []);

  // const GetVideoData = async () => {
  //   const result = await db
  //     .select()
  //     .from(VideoData)
  //     .where(eq(VideoData.id, params.id));

  //   console.log(result, "isresult");
  //   setVideoData(result[0]);
  // };
  // console.log(videoData, "video")

  const getVideoData = (data) => {
    setVideoData(data)
    console.log(data, "done data got")
  }
  return (
    <div className="flex justify-between gap-4">
      <div className="w-full" style={{ width: 1000, height: 750 }}>
        <VideoPlayer videoId={params.id} playVideo={true} getVideoData={getVideoData}/>
      </div>
      <div className="">
      <p>
          {/* {videoData.} */}
          Your video is ready!
        </p>
        {videoData?.script?.map((scrt) => {
          return (
            <>
            {scrt.ContentText}
            </>
          )
        })}
        
        <div className="flex justify-between items-center mt-4 gap-4">
          <Link href={"/dashboard"}>
            <Button className="my-4">Back</Button>
          </Link>
          <Link href={"/dashboard"}>
            <Button className="my-4 bg-black">Share</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
