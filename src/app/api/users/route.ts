import { createSubsFirstRegister, extractObjectIdString } from "@/app/models/subscription";
import { registerUser } from "@/app/models/user";

import { z } from "zod";

const profileSchema = z.object({
  address: z.string(),
  birth: z.string(),
});
const userInput = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(5),
  role: z.string(),
  profile: profileSchema,
});

export const POST = async (request: Request) => {
  try {
    // console.log(request);

    const data = await request.json();

    const parse = userInput.parse(data);

    // console.log(`hehe`);
    const user = await registerUser(parse);

    const check = await extractObjectIdString(user.insertedId);

    const subsRegister = {
      userId: check,
      type: "free",
    };
    await createSubsFirstRegister(subsRegister); //pada setiap kali akun register maka akan membuat subs
    return Response.json(
      {
        statusCode: 201,
        message: `Success Register`,
        // check,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json(
        {
          statusCode: 400,
          message: "Validation failed",
          errors: error.errors,
        },
        {
          status: 400,
        }
      );
    }

    return Response.json(
      {
        statusCode: 500,
        message: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
};
