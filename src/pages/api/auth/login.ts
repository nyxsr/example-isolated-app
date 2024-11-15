import type { NextApiRequest, NextApiResponse } from "next";
import { faker } from "@faker-js/faker";

interface RandomUser {
  email: string;
  name: string;
  createdAt: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // Simulate random user login
    const randomUser: RandomUser = {
      email: faker.internet.email(),
      name: faker.person.fullName(),
      createdAt: new Date().toISOString(),
    };

    // Return success response with random user
    return res.status(200).json({
      success: true,
      user: randomUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}
