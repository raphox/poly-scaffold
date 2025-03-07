import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import MDEditor from "@uiw/react-md-editor";

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
  content: z.string(),
});

type FormData = z.infer<typeof schema>;

export const resolver = zodResolver(schema);

export default function PageForm() {
  const { control } = useFormContext<FormData>();

  return (
    <>
      <FormField
        control={control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title:</FormLabel>
            <FormControl>
              <Input type="string" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description:</FormLabel>
            <FormControl>
              <Input type="string" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Controller
        name="content"
        control={control}
        render={({ field }) => (
          <MDEditor
            className="not-prose"
            height={500}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
    </>
  );
}
