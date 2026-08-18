"use client";

import { Button } from "@/app/_components/ui/button";
import { toast } from "@/app/_components/ui/toast";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldError,
} from "@/app/_components/ui/field";
import { Input } from "@/app/_components/ui/input";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { useTransition } from "react";
import { Loader2Icon } from "lucide-react";
import { cadastrarFornecedor } from "../_services/suppliers.service";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { estados } from "../_constants/estados";

const formSchema = z.object({
  nome: z.string().trim().min(5, "Digite mais elementos."),
  cnpj: z.string().trim().min(14, "Digite mais elementos."),
  ie: z.string().trim().min(5, "Digite mais elementos."),
  email: z.string().email("Digite um e-mail válido."),
  telefone: z.string().trim().min(10, "Digite mais elementos."),
  rua: z.string().trim().min(5, "Digite mais elementos."),
  cidade: z.string().trim().min(5, "Digite mais elementos."),
  estado: z.string().trim().min(2, "Digite mais elementos."),
  bairro: z.string().trim().min(5, "Digite mais elementos."),
  cep: z.string().trim().min(8, "Digite mais elementos."),
});

function NewSupplierForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  function onHandleCancelar() {
    router.back();
  }

  function onHandleCadastrar(fornecedor: z.infer<typeof formSchema>) {
    startTransition(() => {
      cadastrarFornecedor(fornecedor)
        .then((resultado) => {
          if (resultado.success) {
            form.reset();
            toast.add({
              type: "success",
              description: resultado.message,
            });

            router.push("/dashboard/suppliers");
          } else {
            toast.add({
              type: "error",
              description: resultado.message,
            });
          }
        })
        .catch((error) => {
          console.error(error);
          toast.add({
            type: "error",
            description: error.message,
          });
        });
    });
  }

  return (
    <form onSubmit={form.handleSubmit(onHandleCadastrar)}>
      <FieldSet>
        <div className="flex gap-10">
          <FieldGroup className="border p-5 rounded-2xl">
            <FieldLegend className="text-center">
              Informações do fornecedor
            </FieldLegend>
            <Field>
              <div>
                <FieldLabel htmlFor="nome" className="mb-2">
                  Nome
                </FieldLabel>
                <Controller
                  name="nome"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <Input
                        {...field}
                        aria-invalid={fieldState.invalid}
                        placeholder="Nome do fornecedor"
                        className="bg-white p-2 rounded-md border border-sidebar-border "
                        autoComplete="off"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
              <div className="flex items-center justify-between gap-1">
                <div>
                  <FieldLabel htmlFor="cnpj" className="mb-2">
                    CNPJ
                  </FieldLabel>
                  <Controller
                    name="cnpj"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <Input
                          {...field}
                          aria-invalid={fieldState.invalid}
                          placeholder="CNPJ do fornecedor"
                          className="bg-white p-2 rounded-md border border-sidebar-border "
                          autoComplete="off"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </div>
                <div>
                  <FieldLabel htmlFor="ie" className="mb-2">
                    IE
                  </FieldLabel>
                  <Controller
                    name="ie"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <Input
                          {...field}
                          aria-invalid={fieldState.invalid}
                          placeholder="IE do fornecedor"
                          className="bg-white p-2 rounded-md border border-sidebar-border "
                          autoComplete="off"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </div>
              </div>
            </Field>
          </FieldGroup>

          <FieldGroup className="border p-5 rounded-2xl">
            <FieldLegend className="text-center">Contato</FieldLegend>
            <Field>
              <div>
                <FieldLabel htmlFor="telefone" className="mb-2">
                  Telefone
                </FieldLabel>
                <Controller
                  name="telefone"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <Input
                        {...field}
                        aria-invalid={fieldState.invalid}
                        placeholder="Telefone"
                        className="bg-white p-2 rounded-md border border-sidebar-border"
                        autoComplete="off"
                        type="text"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
              <div>
                <FieldLabel htmlFor="email" className="mb-2">
                  Email
                </FieldLabel>
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <Input
                        {...field}
                        aria-invalid={fieldState.invalid}
                        placeholder="Email"
                        className="bg-white p-2 rounded-md border border-sidebar-border"
                        autoComplete="off"
                        type="text"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
            </Field>
          </FieldGroup>
        </div>
        <FieldGroup className="border p-5 rounded-2xl">
          <FieldLegend className="text-center">Endereço</FieldLegend>
          <Field>
            <div className="flex items-center justify-evenly gap-1 ">
              <div className="w-full">
                <FieldLabel htmlFor="rua" className="mb-2">
                  Rua
                </FieldLabel>
                <Controller
                  name="rua"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <Input
                        {...field}
                        aria-invalid={fieldState.invalid}
                        placeholder="Rua"
                        className="bg-white p-2 rounded-md border border-sidebar-border"
                        autoComplete="off"
                        type="text"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
              <div className="w-full">
                <div className="flex items-center gap-1">
                  <div className="w-full">
                    <FieldLabel htmlFor="cidade" className="mb-2">
                      Cidade
                    </FieldLabel>
                    <Controller
                      name="cidade"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <Input
                            {...field}
                            aria-invalid={fieldState.invalid}
                            placeholder="Cidade"
                            className="bg-white p-2 rounded-md border border-sidebar-border"
                            autoComplete="off"
                            type="text"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </div>
                  <div className="w-full">
                    <FieldLabel htmlFor="estado" className="mb-2">
                      Estado
                    </FieldLabel>
                    <Controller
                      control={form.control}
                      name="estado"
                      render={({ field, fieldState }) => {
                        const estadoSelecionado = estados.find(
                          (estado) => estado.sigla === field.value,
                        );

                        return (
                          <>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger className="w-50">
                                <SelectValue placeholder="Escolha um estado">
                                  {estadoSelecionado?.nome}
                                </SelectValue>
                              </SelectTrigger>

                              <SelectContent>
                                <SelectGroup>
                                  {estados.map((estado) => (
                                    <SelectItem
                                      key={estado.sigla}
                                      value={estado.sigla}
                                    >
                                      {estado.nome}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>

                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </>
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Field>

          <Field>
            <div className="flex items-center gap-1">
              <div className="w-full">
              <FieldLabel htmlFor="bairro" className="mb-2">
                Bairro
              </FieldLabel>
              <Controller
                name="bairro"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      placeholder="Bairro"
                      className="bg-white p-2 rounded-md border border-sidebar-border"
                      autoComplete="off"
                      type="text"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
            <div className="w-full">
              <FieldLabel htmlFor="cep" className="mb-2">
                CEP
              </FieldLabel>
              <Controller
                name="cep"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      placeholder="CEP"
                      className="bg-white p-2 rounded-md border border-sidebar-border"
                      autoComplete="off"
                      type="text"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
            </div>
          </Field>
        </FieldGroup>
      </FieldSet>
      {/* botões */}
      <div className="mt-10 flex items-center justify-center gap-10">
        <Button
          size={"lg"}
          className="font-semibold cursor-pointer bg-controla-medium h-12 uppercase hover:bg-controla-medium hover:opacity-80"
          type="submit"
          disabled={isPending}
        >
          {isPending ? (
            <Loader2Icon className="animate-spin stroke-3" />
          ) : (
            <p>cadastrar</p>
          )}
        </Button>
        <Button
          size={"lg"}
          className="font-semibold cursor-pointer text-controla-medium h-12 uppercase bg-white  hover:border hover:border-controla-medium hover:bg-white "
          onClick={onHandleCancelar}
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
}

export default NewSupplierForm;
