"use client";

import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/app/components/inputs/Input";
import { Button } from "@/app/components/Button";
import { User } from "@prisma/client";
import Image from "next/image";

interface PostActionProps {
  user: User;
}

const PostAction: React.FC<PostActionProps> = ({ user }) => {
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
  const [isLoading, setIsLoading] = useState(false);

  console.log(user);
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    console.log(data);

    setIsLoading(false);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center w-full p-8">
      <p className="text-white text-4xl font-bold ">
        Welcome to hyperlocal,{" "}
        <span className="text-green-500 whitespace-nowrap">{user?.name}</span>{" "}
        start by making a post
      </p>
      <div className="w-1/2 m-10  rounded-md p-10 bg-white">
        <form
          className="space-y-6  text-white"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            id="title"
            label="Give your post a title!"
            type="text"
            register={register}
            errors={errors}
          />
          <Input
            id="desc"
            label="Contents of your post"
            type="text"
            area
            register={register}
            errors={errors}
          />
          <div>
            <Button fullWidth type="submit">
              Post
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostAction;
