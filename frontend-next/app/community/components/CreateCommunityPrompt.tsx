import React from "react";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/app/components/inputs/Input";
import { Button } from "@/app/components/Button";
import OtpInput from "react-otp-input";

function CreateCommunityPrompt({ setShowPopup }) {
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
  return (
    <div className="popup fixed  w-80 bg-ultra-violet text-black rounded-xl z-20 p-4 font-bold text-xl text-center flex flex-col ">
      {/* Popup content */}

      <div className="w-full flex  flex-col items-center gap-4">
        <p className="text-2xl font-bold">Create a community</p>
        <form className="space-y-6 text-black font-bold">
          <Input
            dark
            id="title"
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
