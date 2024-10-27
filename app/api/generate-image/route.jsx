import { storage } from "@/configs/FirebaseConfig";
import axios from "axios";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { NextResponse } from "next/server";
import Replicate from "replicate";
export async function POST(req){
    try{
        const {prompt}=await req.json();
        const replicate = new Replicate({
            auth:process.env.REPLICATE_API_TOKEN
        });
        
        const input = {
           prompt: prompt,
           height:1280,
           width:1024,
           num_outputs:1
        };
        
        const output = await replicate.run("", { input });
        console.log(output, "Image generation is it working?????")
        //Save to Firebase
        const base64Image="data:image/png;base64,"+await ConvertImage(output[0])
        const fileName='ai-vid-gen-files/'+Date.now()+".png"
        const storageRef=ref(storage,fileName);

        await uploadString(storageRef,base64Image,'data_url');
        
        const downloadUrl=await getDownloadURL(storageRef);
        console.log(downloadUrl);

        return NextResponse.json({'result':downloadUrl})
        //=> ["https://replicate.delivery/yhqm/VyD24fDyzM2nQSg0nQc58W2...
    }catch(e)
    {
        console.log(e, "image error")
        return NextResponse.json({'error':e})

    }
}

const ConvertImage=async(imageUrl)=>{
    try{
        const resp=await axios.get(imageUrl,{responseType:'arraybuffer'});

        const base64Image=Buffer.from(resp.data).toString('base64');
        return base64Image;

    }catch(e){
        console.log('Error:',e)
    }
}