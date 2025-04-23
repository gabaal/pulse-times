"use client";
import { fetchAllCategoryAction } from "@/actions/categoryActions";
import CategoryCard from "@/components/CategoryCard";
import Loader from "@/components/Loader";
import MsgShower from "@/components/MsgShower";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Categories() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { status, data: session } = useSession();

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const fetchedCategoryData = await fetchAllCategoryAction();
        setCategories(fetchedCategoryData);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, []);

  if (loading || status === "loading") {
    return <Loader />;
  }
  if (categories.length < 1) {
    <MsgShower msg={"No categories available!"} />;
  }
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between pl-7 pr-5 py-4">
        <h2 className="font-bold text-lg">All Categories</h2>
        <div className="flex justify-between flex-wrap">
          <button
            className="bg-primary h-12 w-28 rounded-md"
            onClick={() => router.push("/admin-controls/categories/add-new")}
          >
            Add
          </button>
        </div>
      </div>
      <div className="flex px-6 py-2 gap-5 flex-wrap w-full justify-center md:justify-stretch">
        {categories?.map((item) => {
          return <CategoryCard category={item} key={item._id} />;
        })}
      </div>
    </div>
  );
}
