import { PropsWithChildren } from "react";
import { UserChoice } from "@/lib/user-choices";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";

type Props = PropsWithChildren & {
  className?: string;
};

export default function LayerForm({ children, className }: Props) {
  const form = useForm<UserChoice>({
    resolver: zodResolver(UserChoice),
  });

  return (
    <Form {...form}>
      <form
        className={cn("h-screen", className)}
        onSubmit={(e) => e.preventDefault()}
      >
        {children}
      </form>
    </Form>
  );
}
