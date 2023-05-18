"use client";

import { User } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/app/components/inputs/Input";
import { Button } from "@/app/components/Button";
import axios from "axios";

interface CreatePostProps {
  user: User;
}

const CreatePost: React.FC<CreatePostProps> = ({ user }) => {
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
    const postSubmitData = {
      userId: user.id,
      name: user.name,
      ...data,
      longitude: center.lng,
      latitude: center.lat,
    };

    console.log(postSubmitData);

    axios
      .post(`http://localhost:8080/api/post-news`, postSubmitData)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    setIsLoading(false);
  };
  return (
    <div className="w-2/3 m-10  rounded-md p-10 bg-white">
      <form className="space-y-6  text-white" onSubmit={handleSubmit(onSubmit)}>
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
