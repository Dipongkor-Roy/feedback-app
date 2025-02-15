import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";

const UsernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(request: Request) {
  await dbConnect();
  try {
    const { searchParams } = new URL(request.url); //getting whole url
    const queryParam = {
      username: searchParams.get("username"), //extract only username part
    };
    //validate with zod
    const result = UsernameQuerySchema.safeParse(queryParam);
    console.log(result); //todo:check and remove
    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors || [];
      return Response.json(
        {
          success: false,
          message:
            usernameErrors.length > 0
              ? usernameErrors.join(",")
              : "Invalid Query Parameters",
        },
        { status: 400 }
      );
    }
    const { username } = result.data;
    const existingVerifiedUser = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingVerifiedUser) {
      return Response.json(
        {
          success: false,
          message: "Username Is Already Taken",
        },
        { status: 400 }
      );
    }
    return Response.json(
      {
        success: true,
        message: "Username Is Unique",
      },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error Checking Username", error);
    return Response.json(
      {
        success: false,
        message: "Error Checking Username",
      },
      {
        status: 500,
      }
    );
  }
}
