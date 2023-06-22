import prisma from "@/app/libs/prismadb";
import axios from "axios";
import getCurrentUser from "../auth/getCurrentUser";

const createCommunity = async (communityId: string) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/community/getOne/${communityId}`
    );

    const community = response.data.community;
    return community;
  } catch (error) {
    console.log(error);
  }
};

export default createCommunity;
