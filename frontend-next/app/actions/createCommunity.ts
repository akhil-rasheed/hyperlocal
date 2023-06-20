import prisma from "@/app/libs/prismadb";

import getCurrentUser from "./getCurrentUser";

const createCommunity = async ({ communityName, location }) => {
  try {
    const user = await getCurrentUser();
  } catch (error) {}
};

export default createCommunity;
