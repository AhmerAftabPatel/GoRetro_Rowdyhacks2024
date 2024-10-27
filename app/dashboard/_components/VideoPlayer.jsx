"use client";
import React, { useEffect, useState } from "react";
import { Player } from "@remotion/player";
import RemotionVideo from "./RemotionVideo";
import { Button } from "@/components/ui/button";
import { db } from "@/configs/db";
import { VideoData } from "@/configs/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";

function VideoPlayer({ playVideo, videoId }) {
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
  };

  return (
    <>
      <Player
        component={RemotionVideo}
        durationInFrames={Number(durationInFrame.toFixed(0)) + 100} // Added +100 to add extra buffer time
        compositionWidth={1000}
        compositionHeight={650}
        fps={30}
        controls={true}
        inputProps={{
          ...videoData,
          setDurationInFrame: (frameValue) => setDurationInFrame(frameValue),
        }}
      />
      <div className="flex justify-between items-center">
      <Link href={"/dashboard"}>
        <Button className="my-4">Back</Button>
      </Link>
      <Link href={"/dashboard"}>
        <Button className="my-4 bg-black">Share</Button>
      </Link>
      </div>
      <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
    </>
  );
}

export default VideoPlayer;
