"use client";

import { User } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/app/components/inputs/Input";
import { Button } from "@/app/components/Button";
import { useRouter } from "next/navigation";

import axios from "axios";
import ImageUploader from "./ImageUploader";

interface CreatePostProps {
  user: User;
}

const CreatePost: React.FC<CreatePostProps> = ({ user }) => {
  const router = useRouter();

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
  const [file, setFile] = useState<File>();
  const [center, setCenter] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    const postSubmitData = new FormData();
    postSubmitData.append("userId", user.id);
    postSubmitData.append("name", user.name!);
    postSubmitData.append("title", data.title);
    postSubmitData.append("desc", data.desc);
    postSubmitData.append("longitude", center.lng.toString());
    postSubmitData.append("latitude", center.lat.toString());
    postSubmitData.append("image", file!);
    console.log(postSubmitData);

    axios
      .post(`https://hyperlocal-backend.fly.dev/api/post-news`, postSubmitData)
      .then(function (response) {
        console.log(response);
        router.push("/home");
      })
      .catch(function (error) {
        console.log(error);
      });
    setIsLoading(false);
  };
  return (
    <div className=" w-full  lg:w-2/3 lg:m-10  rounded-md p-8 lg:p-10 bg-ultra-violet">
      <form className="space-y-6  text-white" onSubmit={handleSubmit(onSubmit)}>
        <p className="text-white/75 font-bold text-3xl  ">Create a post...</p>

        <ImageUploader setFile={setFile} />
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
  );
};

export default CreatePost;
