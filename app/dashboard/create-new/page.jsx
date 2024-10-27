"use client"
import React, { useContext, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import axios from 'axios';
import CustomLoading from './_components/CustomLoading';
import { v4 as uuidv4 } from 'uuid';
import { VideoDataContext } from '@/app/_context/VideoDataContext';
import { db } from '@/configs/db';
import { Users, VideoData } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import PlayerDialog from '../_components/PlayerDialog';
import { useRouter } from 'next/navigation';
import { UserDetailContext } from '@/app/_context/UserDetailContext';
import { eq } from 'drizzle-orm';
import { toast } from 'sonner';
import SelectHero from './_components/SelectHero';
import SelectEra from './_components/selectEra';



function CreateNew() {

  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [videoScript, setVideoScript] = useState();
  const [audioFileUrl, setAudioFileUrl] = useState();
  const [captions, setCaptions] = useState();
  const [imageList, setImageList] = useState();
  const [playVideo,setPlayVideo]=useState(false);
  const [videoId,setVideoid]=useState();
  const {videoData,setVideoData}=useContext(VideoDataContext);
  const {userDetail,setUserDetail}=useContext(UserDetailContext);
  const {user}=useUser();
  const onHandleInputChange = (fieldName, fieldValue) => {
    console.log(fieldName, fieldValue)

    setFormData(prev => ({
      ...prev,
      [fieldName]: fieldValue
    }))
  }

  //heroStyle

  const onCreateClickHandler = () => {
    console.log(userDetail)
    if(userDetail?.credits<=0)
    {
      toast("You don't have enough Credits")
        return ;
    }
    GetVideoScript();
  }

  // Get Video Script
  const GetVideoScript = async () => {
    setLoading(true)
    // const prompt = 'Write a script to generate ' + formData.duration + ' video on topic : ' + formData.topic + ' c ' + formData.imageStyle + ' format for each scene and give me result in JSON format with imagePrompt and ContentText as field, No Plain text'
    const prompt = 'Write a script to generate max 30 sec video on given topic about' + formData.heroStyle + ' time travelled to' + formData.eraStyle + "era or period"
    console.log(prompt)

    const resp = await axios.post('/api/get-video-script', {
      prompt: prompt
    });
    console.log(resp)
    if (resp.data.result) {
      setVideoData(prev=>({
        ...prev,
        'videoScript':resp.data.result
      }))
      setVideoScript(resp.data.result);
       await GenerateAudioFile(resp.data.result)
    }else{
      toast('Server Side Error: Refresh screena and Try again')
    }
  }

  /**
   * Generate Audio File and Save to Firebase Storage
   * @param {*} videoScriptData 
   */
  const GenerateAudioFile = async (videoScriptData) => {
    setLoading(true)
    let script = '';
    const id = uuidv4();
    videoScriptData.forEach(item => {
      script = script + item.ContentText + ' ';
    })

    const resp = await axios.post('/api/generate-audio', {
      text: script,
      id: id
    });
    setVideoData(prev=>({
      ...prev,
      'audioFileUrl':resp.data.result
    }))
    setAudioFileUrl(resp.data.result);//Get File URL
    resp.data.result && await GenerateAudioCaption(resp.data.result,videoScriptData)
  }

  /**
   * used to generate caption from audio file
   * @param {*} fileUrl 
   */
  const GenerateAudioCaption = async (fileUrl,videoScriptData) => {
    setLoading(true);
    console.log(fileUrl)
    const resp = await axios.post('/api/generate-caption', {
      audioFileUrl: fileUrl
    })
    setCaptions(resp?.data?.result);
    setVideoData(prev=>({
      ...prev,
      'captions':resp.data.result
    }))
    resp.data.result && await GenerateImage(videoScriptData);
  }


  /**
   * Used to generate AI Images
   */
  const GenerateImage = async(videoScriptData) => {
    let images = [];

    for(const element of videoScriptData)
    {
      try{
        const resp=await axios.post('/api/generate-image',{
          prompt:element.imagePrompt
        });
        console.log(resp.data.result);
        images.push(resp.data.result);
      }catch(e)
      {
          console.log('Error:'+e);
      }
    }
    setVideoData(prev=>({
      ...prev,
      'imageList':images
    }))
     setImageList(images)
     setLoading(false);
  }


  useEffect(()=>{

    if(videoData&&Object?.keys(videoData)?.length==4)
    {
      SaveVideoData(videoData);
    }
  },[videoData])

  const router = useRouter()


  const SaveVideoData=async(videoData)=>{
    setLoading(true)
    console.log(videoData)
    const result=await db.insert(VideoData).values({
      script:videoData?.videoScript,
      audioFileUrl:videoData?.audioFileUrl??'',
      captions:videoData?.captions??'',
      imageList:videoData?.imageList??[],
      createdBy:user?.primaryEmailAddress?.emailAddress
    }).returning({id:VideoData?.id})

   await UpdateUserCredits();
    setVideoid(result[0].id);
    setPlayVideo(true);
    setLoading(false);
    router.replace('/dashboard/video/' + result[0].id)
    console.log(result);
 
  }

  /**
   * Used to update user credits
   */
  const UpdateUserCredits=async()=>{
    const result=await db.update(Users).set({
      credits:userDetail?.credits-10
    }).where(eq(Users?.email,user?.primaryEmailAddress?.emailAddress));
    console.log(result);
    setUserDetail(prev=>({
      ...prev,
      "credits":userDetail?.credits-10
    }))

   
  }

  return (
    <div className=''>
      <h2 className='font-bold text-4xl text-center'>Take your favourite heros back in time</h2>

      <div className='mt-10 p-10'>
        <SelectHero onUserSelect={onHandleInputChange} />
        {formData?.heroStyle && <SelectEra onUserSelect={onHandleInputChange} />}
          {formData?.eraStyle && <div className='flex justify-center items-center'>
        <Button className="mt-16 bg-orange-500" onClick={onCreateClickHandler}>Initiate Time Vault</Button>
        </div>}
      </div>
      <CustomLoading loading={loading} />
    </div>
  )
}

export default CreateNew