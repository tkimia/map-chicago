import z from "zod";

export const UserChoice = z.object({
  boundaryLayer: z.string().optional(),
  userAddress: z
    .object({
      lat: z.number(),
      lng: z.number(),
      tooltip: z.string().optional(),
    })
    .optional(),
});

export type UserChoice = z.infer<typeof UserChoice>;
