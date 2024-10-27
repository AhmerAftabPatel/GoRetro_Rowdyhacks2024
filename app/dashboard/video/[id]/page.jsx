
import React from "react";
import VideoPlayer from "../../_components/VideoPlayer";
import { Button } from "@/components/ui/button";

export default function VideoRenderPage({ params }) {
  
  return (
    <div className="flex justify-center items-center">
      <div className="w-full" style={{width : 1000, height: 750}}>
        <VideoPlayer videoId={params.id} playVideo={true} />
      </div>
    </div>
  );
}
