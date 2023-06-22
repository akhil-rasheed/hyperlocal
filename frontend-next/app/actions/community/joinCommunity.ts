import prisma from "@/app/libs/prismadb";
import axios from "axios";
import getCurrentUser from "../auth/getCurrentUser";

const joinCommunity = async (joinCode: String, userId: String) => {
  try {
    // const user = await getCurrentUser();
    console.log(joinCode, userId);
    const response = await axios.post(
      "http://localhost:8080/api/community/join",
      {
        joinCode,
        userId,
      }
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

export default joinCommunity;
