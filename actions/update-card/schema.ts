import { z } from "zod";

export const UpdateCard = z.object({
  id: z.string(),
  boardId: z.string(),
  title: z.optional(
    z
      .string({
        required_error: "Title is required",
        invalid_type_error: "Title is required",
      })
      .min(3, {
        message: "Title is too short.",
      })
  ),
  description: z.optional(
    z
      .string({
        required_error: "Description is required",
        invalid_type_error: "Description is required",
      })
      .min(3, { message: "Description is too short" })
  ),
  backgroundColor: z.optional(
    z.string({
      required_error: "backgroundColor is required",
      invalid_type_error: "backgroundColor must be a hex",
    })
  ),
});
