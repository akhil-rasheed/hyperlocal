import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/app/components/inputs/Input";
import { Button } from "@/app/components/Button";
import createCommunity from "@/app/actions/community/createCommunity";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useRouter } from "next/navigation";

function CreateCommunityPrompt(userId: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      desc: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { lat, lng } = useSelector((state: any) => state.location);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    const community = await createCommunity(
      data.communityName,
      data.desc,
      { lat, lng },
      userId.userId
    );
    setLoading(false);
    console.log(community);
    router.push(`/community/view/${community._id}`);
  };
  return (
    <div className="popup fixed  w-80 bg-ultra-violet text-black rounded-xl z-20 p-4 font-bold text-xl text-center flex flex-col ">
      {/* Popup content */}

      <div className="w-full flex  flex-col items-center gap-4">
        <p className="text-2xl font-bold">Create a community</p>
        <form
          className="space-y-6 text-black font-bold"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            dark
            id="communityName"
            label="What do you want to call your new community? (You can change this later)"
            type="text"
            register={register}
            errors={errors}
          />
          <Input
            dark
            id="desc"
            label="Describe your community for new users, or pick a catchy tagline!"
            type="text"
            area
            register={register}
            errors={errors}
          />
          <div>
            <Button fullWidth type="submit">
              Create
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateCommunityPrompt;
