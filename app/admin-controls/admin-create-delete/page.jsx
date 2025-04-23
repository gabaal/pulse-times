"use client";

import {
  createAdminAction,
  deleteAdminAction,
  fetchAdminAction,
} from "@/actions/adminActions";
import Input from "@/components/Input";
import Loader from "@/components/Loader";
import MsgShower from "@/components/MsgShower";
import Select from "@/components/Select";
import SubmitButton from "@/components/SubmitButton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";

export default function page() {
  const router = useRouter();
  const { status, data: session } = useSession();
  const [adminData, setAdminData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedAdminData = await fetchAdminAction();
        setAdminData(fetchedAdminData);
      } catch (error) {
        throw new Error(error);
      }
    };
    fetchData();
  }, []);

  if (status === "loading") {
    return <Loader />;
  }
  if (session?.user?.role !== "superAdmin") {
    return <MsgShower msg={"You are not super admin!"} />;
  }
  return (
    <div className="grid place-items-center min-h-screen">
      <form
        action={async (formData) => {
          await createAdminAction(formData);
          router.push("/admin-controls");
        }}
        className="shadow-xl w-[90%] sm:w-[580px] p-8 mt-4 rounded-md flex flex-col gap-3 bg-base-100"
      >
        <h2 className="text-white font-bold text-2xl mb-4 self-center">
          Create Admin
        </h2>
        <Input
          typeAttr={"email"}
          nameAttr={"email"}
          placeholderAttr={"User Email"}
          classAttr={"w-full"}
          requiredAttr={true}
        />
        <Select
          nameAttr={"role"}
          requiredAttr={true}
          classAttr={"w-full"}
          placeholderAttr={"Select Role"}
          optionsAttr={["admin", "superAdmin"]}
        />
        <div className="self-center mt-4">
          <SubmitButton />
        </div>
      </form>
      <div className="mt-4 w-[90%] sm:w-[580]">
        {adminData.length > 0 &&
          adminData.map((item) => {
            return (
              <div
                key={item?._id}
                className="my-4 flex flex-col bg-base-100 p-4 rounded-lg"
              >
                <MdDelete
                  className="self-end text-red-400 cursor-pointer h-6 w-6"
                  onClick={() => {
                    deleteAdminAction(item.email);
                    router.replace("/admin-controls");
                  }}
                />
                <h2>Name: {item?.name}</h2>
                <h2>Email: {item?.email}</h2>
                <h2>Role: {item?.role}</h2>
              </div>
            );
          })}
      </div>
    </div>
  );
}
