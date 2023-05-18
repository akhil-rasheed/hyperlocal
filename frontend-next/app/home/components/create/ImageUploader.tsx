import React, { useState } from "react";
import Image from "next/image";

interface ImageUploaderProps {
  setFile: (file: File) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ setFile }) => {
  const [selectedImage, setSelectedImage] = useState<string>();

  const handleImageUpload = (event: Event) => {
    const file = event!.target!.files[0];
    setFile(file);
    setSelectedImage(URL.createObjectURL(file));
  };

  return (
    <div>
      {!selectedImage && (
        <label className="flex justify-center rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-green-500 w-1/3 hover:cursor-pointer ">
          <input
            className="hidden"
            type="file"
            accept="image/*"
            onChange={() => handleImageUpload}
          />
          Upload Image
        </label>
      )}

      {selectedImage && (
        <label>
          <Image
            height={200}
            width={200}
            src={selectedImage}
            alt="Selected Image"
            className="hover:cursor-pointer"
          />
          <input
            className="hidden"
            type="file"
            accept="image/*"
            onChange={() => handleImageUpload}
          />
        </label>
      )}
    </div>
  );
};

export default ImageUploader;
