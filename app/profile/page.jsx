"use client";
import Bookmark from "@/components/Bookmark";
import History from "@/components/History";
import Loader from "@/components/Loader";
import SigninBtn from "@/components/SigninBtn";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";

export default function Profile() {
  const { status, data: session } = useSession();
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };
  const tabs = [
    { title: "History", component: <History /> },
    { title: "Bookmark", component: <Bookmark /> },
  ];

  if (status === "loading") {
    return <Loader />;
  } else if (status === "authenticated") {
    return (
      <div className="mx-auto px-8">
        <div className="py-4 rounded-md flex flex-col gap-3 items-center">
          <button
            className="self-end text-center rounded-md w-20 h-10 bg-primary text-white"
            onClick={() => signOut()}
          >
            Sign out
          </button>
          <Image
            src={session?.user?.image}
            alt="user image"
            height={600}
            width={600}
            className="rounded-full w-[100px] h-[100px] shadow-2xl"
          />
          <div>
            Name: <span className="font-bold">{session?.user?.name}</span>
          </div>
          <div>
            Email:{" "}
            <span className="font-bold text-sm">{session?.user?.email}</span>
          </div>
          <hr className="w-full border-slate-700" />
        </div>
        <div>
          <div className="flex flex-col">
            <div className="flex mt-2 justify-center">
              <div className="bg-base-200 shadow-md rounded-3xl text-center flex justify-center">
                {tabs.map((tab, index) => (
                  <button
                    key={index}
                    className={`rounded-3xl w-32 py-2 ${
                      activeTab === index && "bg-primary text-white"
                    }`}
                    onClick={() => handleTabClick(index)}
                  >
                    {tab.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div>{tabs[activeTab].component}</div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center h-screen pb-24">
      <SigninBtn />
    </div>
  );
}
