import axios from "axios";
import { useState } from "react";
import { TbLoader2, TbPhotoPlus } from "react-icons/tb";
import axiosI from "../lib/axiosInstance";

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const AddImageButton = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // upload image to database
  const handleUpload = async () => {
    try {
      await axiosI.post("/", { imageUrl });
      setImageUrl("");
      window.location.reload();
    } catch (error) {
      console.log("something went wrong");
    }
  };

  // handling files
  // upload image to cloudinary
  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length === 0) {
      return;
    }
    const file = event.target.files && event?.target?.files[0];

    const formData = new FormData();

    formData.append("file", file!);
    formData.append("upload_preset", uploadPreset);
    setIsLoading(true);
    axios
      .post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      )
      .then((res) => {
        setImageUrl(res.data.secure_url);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // decide what to render
  let content;

  if (imageUrl) {
    content = (
      <div className="bg-gray-300/20 min-h-[100px] rounded flex justify-center items-center gap-2 border border-dashed border-gray-500 cursor-pointer relative">
        {isLoading && <TbLoader2 className={"animate-spin"} />}
        {!isLoading && (
          <>
            <img src={imageUrl} alt={imageUrl} className="h-32 w-32" />
            <button
              onClick={handleUpload}
              className="absolute bg-purple-600 bottom-1 z-50 rounded text-white/80 px-4 py-1"
            >
              upload
            </button>
          </>
        )}
      </div>
    );
  } else {
    content = (
      <>
        <input
          type="file"
          id="image"
          className="h-full w-full hidden"
          onChange={handleFile}
        />
        <label
          htmlFor="image"
          className="bg-gray-300/20 min-h-[100px] rounded flex justify-center items-center gap-2 border border-dashed border-gray-500 cursor-pointer"
        >
          <TbPhotoPlus size={32} />
          <div className="font-semibold">Add Images</div>
        </label>
      </>
    );
  }
  return content;
};

export default AddImageButton;
