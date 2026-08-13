"use client";

import { Loader2Icon, SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useTransition } from "react";

import * as z from "zod";
import { Field, FieldError } from "./ui/field";

const formSchema = z.object({
  produto: z.string().trim(),
});

function Search() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      produto: "",
    },
  });
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const onHandleSubmit = (data: z.infer<typeof formSchema>) => {
    const search = data.produto.trim();

    startTransition(() => {
      if (!search) {
        router.push("/dashboard/products");
        return;
      }

      router.push(`/dashboard/products?search=${encodeURIComponent(search)}`);
    });
  };

  return (
    <div className="flex items-center gap-2 ">
      <form
        className="flex items-center justify-between gap-3 w-100"
        onSubmit={form.handleSubmit(onHandleSubmit)}
      >
        <Controller
          name="produto"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Input
                {...field}
                aria-invalid={fieldState.invalid}
                placeholder="Faça sua busca..."
                className="bg-white p-2 rounded-xl border border-sidebar-border "
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Button
          className="cursor-pointer bg-controla-primary hover:bg-controla-primary"
          type="submit"
          disabled={isPending}
        >
          {isPending ? (
            <Loader2Icon className="animate-spin stroke-3" />
          ) : (
            <SearchIcon className="stroke-3" />
          )}
        </Button>
      </form>
    </div>
  );
}

export default Search;
