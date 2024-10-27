"use client";
import React, { useEffect, useState } from "react";
import { Player } from "@remotion/player";
import RemotionVideo from "./RemotionVideo";
import { Button } from "@/components/ui/button";
import { db } from "@/configs/db";
import { VideoData } from "@/configs/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";

function VideoPlayer({ playVideo, videoId, getVideoData }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [videoData, setVideoData] = useState();
  const [durationInFrame, setDurationInFrame] = useState(100);

  useEffect(() => {
    videoId && setOpenDialog(!openDialog);
    videoId && GetVideoData();
  }, [playVideo]);

  const GetVideoData = async () => {
    const result = await db
      .select()
      .from(VideoData)
      .where(eq(VideoData.id, videoId));

    console.log(result);
    setVideoData(result[0]);
    getVideoData && getVideoData(result[0])
  };

  return (
    <>
      <Player
        component={RemotionVideo}
        durationInFrames={Number(durationInFrame.toFixed(0)) + 100} // Added +100 to add extra buffer time
        compositionWidth={500}
        compositionHeight={650}
        fps={30}
        controls={true}
        inputProps={{
          ...videoData,
          setDurationInFrame: (frameValue) => setDurationInFrame(frameValue),
        }}
      />
      
    </>
  );
}

export default VideoPlayer;
