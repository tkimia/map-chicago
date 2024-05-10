import { UserChoice } from "@/lib/user-choices";
import { useFormContext } from "react-hook-form";

export default function useUserChoices() {
  return useFormContext<UserChoice>();
}
