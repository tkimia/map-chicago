import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useUserChoices from "@/hooks/useUserChoices";
import { FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { boundaries } from "@/lib/data-loader";

export default function UserChoiceOptions() {
  const { control } = useUserChoices();
  return (
    <FormField
      control={control}
      name="boundaryLayer"
      render={({ field }) => (
        <FormItem className="space-y-2 p-4">
          <FormLabel>Show Boundaries</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-col space-y-1"
            >
              {Object.keys(boundaries).map((key) => (
                <FormItem
                  key={key}
                  className="flex items-center space-x-3 space-y-0"
                >
                  <FormControl>
                    <RadioGroupItem value={key} />
                  </FormControl>
                  <FormLabel className="font-normal">{key}</FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
        </FormItem>
      )}
    />
  );
}
