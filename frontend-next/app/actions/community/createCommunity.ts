import prisma from "@/app/libs/prismadb";
import axios from "axios";
import getCurrentUser from "../auth/getCurrentUser";

const createCommunity = async (
  communityName: string,
  desc: string,
  location: { lat: number; lng: number },
  userId: string
) => {
  try {
    const locationObj = {
      lat: location.lat,
      long: location.lng,
    };

    const response = await axios.post(
      "http://localhost:8080/api/community/create",
      {
        communityName,
        locationObj,
        desc,
        userId,
      }
    );

    const community = response.data.community;
    return community;
  } catch (error) {
    console.log(error);
  }
};

export default createCommunity;
