import { NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function POST(req) {
  try {
    const {prompt}=await req.json()
    const client = new Groq({
      apiKey: process.env.GROQ_API_KEY, // This is the default and can be omitted
    });
    const chatCompletion = await client.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "Your task is to write one story script to generate max 30 seconds video on the given topic about a given person and style in that given era or period along with AI image prompt in given format for the scene, divide the story into scenes with different images and give me result in JSON format with imagePrompt and ContentText as field. example format {data: [{imagePrompt : '', ContentText : ''}]}, No Plain text.",
        },
        { role: "user", content: prompt  },
      ],
      model: "llama3-8b-8192",
      response_format: { "type": "json_object" },
    });

    console.log(chatCompletion.choices[0].message.content);

    return NextResponse.json({ result: JSON.parse(chatCompletion.choices[0].message.content).data });
  } catch (e) {
    return NextResponse.json({ "Error:": e });
  }
}

