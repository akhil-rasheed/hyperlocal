"use client";

import { User } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/app/components/inputs/Input";
import { Button } from "@/app/components/Button";
import { useRouter } from "next/navigation";
import getCommunity from "@/app/actions/community/getCommunity";
import axios from "axios";
import ImageUploader from "./ImageUploader";

interface CreatePostProps {
  user: User;
}

const CreatePost: React.FC<CreatePostProps> = ({ user }) => {
  const router = useRouter();
  console.log(user);
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
    postSubmitData.append("community", "6491bf42b4e6b5d079cef111");
    console.log(postSubmitData);

    axios
      .post(`http://localhost:8080/api/post-news`, postSubmitData)
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
        <label className="block mb-2 text-sm font-medium text-rich-black/50">
          Select a commmunity to post to
        </label>
        <select
          id="community"
          className="bg-gray-50 border border-gray-300 font-bold text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option selected>Nearby</option>
          <option>Footballers Vijaynagar</option>
        </select>
        <p className="text-black font-bold text-3xl  ">Create a post...</p>

        <ImageUploader setFile={setFile} />
        <Input
          dark
          id="title"
          label="Give your post a title!"
          type="text"
          register={register}
          errors={errors}
        />
        <Input
          dark
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
