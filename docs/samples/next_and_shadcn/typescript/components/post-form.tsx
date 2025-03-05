import React from "react";
import { useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const schema = z.object({
  title: z.string(),
  description: z.string(),
});

type FormData = z.infer<typeof schema>;

export const resolver = zodResolver(schema);

export default function PostForm() {
  const { control } = useFormContext<FormData>();

  return (
    <>
      <FormField
        control={control}
        type="string"
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title:</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        type="text"
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description:</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
