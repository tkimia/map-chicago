import z from "zod";

export const UserChoice = z.object({
  boundaryLayer: z.string().optional(),
});

export type UserChoice = z.infer<typeof UserChoice>;
