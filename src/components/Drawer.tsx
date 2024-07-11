import { Drawer } from "vaul";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  description?: string;
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
} & Pick<React.ComponentProps<typeof Drawer.Root>, "onOpenChange" | "open">;
export default function MainDrawer(props: Props) {
  return (
    <Drawer.Root
      direction="right"
      modal={false}
      onOpenChange={props.onOpenChange}
      open={props.open}
    >
      <Drawer.Trigger
        className={cn(
          "bg-white border-slate-300 border rounded p-1 shadow",
          props.className
        )}
        disabled={props.disabled}
      >
        <ChevronsLeft />
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Content className="bg-white flex flex-col h-full w-full md:w-[450px] mt-24 fixed bottom-0 right-0 p-4 shadow-xl z-50">
          <div className="flex justify-between items-center mb-4">
            <div className="flex flex-col">
              <Drawer.Title className="font-medium text-xl">
                {props.title}
              </Drawer.Title>
              {props.description && (
                <p className="text-sm text-muted-foreground">
                  {props.description}
                </p>
              )}
            </div>
            <Drawer.Close className="bg-white border-slate-300 border rounded p-1">
              <ChevronsRight />
            </Drawer.Close>
          </div>
          <Drawer.Handle />
          {props.children}
        </Drawer.Content>
        <Drawer.Overlay />
      </Drawer.Portal>
    </Drawer.Root>
  );
}
