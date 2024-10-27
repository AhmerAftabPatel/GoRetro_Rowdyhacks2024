'use client'
import { Button } from "@/components/ui/button";
import { SignIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter()
  // useEffect(() => {
  //   router.replace('/sign-in')
  // }, [])
  return (
    <div>
      
            {/* <UserButton /> */}
          

    </div>

  );
}
