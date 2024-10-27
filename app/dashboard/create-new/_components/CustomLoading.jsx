"use client";
import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Image from "next/image";

function CustomLoading({ loading }) {
  const messages = [
    "Calibrating the time machine...",
    "Traveling to the past...",
    "Collecting footage from the future...",
    "Synchronizing timeframes...",
    "Generating time loops...",
    "Ensuring no paradoxes...",
    "Polishing video memories...",
    "Finalizing your experience...",
  ];

  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 5000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, [messages.length]);
  return (
    <AlertDialog open={loading} vis>
      <AlertDialogContent className="bg-white">
        <div style={styles.loadingContainer}>
          <p style={styles.message}>{messages[messageIndex]}</p>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

const styles = {
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#282c34",
    color: "#fff",
    textAlign: "center",
  },
  message: {
    fontSize: "1.2rem",
    marginTop: "20px",
  },
};

export default CustomLoading;
