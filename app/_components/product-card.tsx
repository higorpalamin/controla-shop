"use client";

import { Loader2Icon } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Decimal } from "../generated/prisma/internal/prismaNamespace";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "./ui/field";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTransition } from "react";
import { atualizarProduto } from "../_services/products.service";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { toast } from "./ui/toast";

type Produto =
  | ({
      categoria: {
        id: string;
        nome: string;
      };
    } & {
      id: string;
      sku: string | null;
      codigoBarras: string | null;
      nome: string;
      descricao: string | null;
      precoCompra: Decimal;
      precoVenda: Decimal;
      estoqueMinimo: number;
      quantidade: number;
      categoriaId: string;
      fornecedorId: string;
      createdAt: Date;
    })
  | null;

type ProductCardProps = {
  produto: Produto;
  categories: { nome: string; id: string }[];
  suppliers: { nome: string; id: string }[];
};

const formSchema = z.object({
  nome: z.string().trim().min(5, "Digite mais elementos."),
  sku_produto: z.string().trim().min(5, "Digite mais elementos."),
  cod_barra_produto: z
    .string()
    .length(13, "O código deve ter 13 dígitos")
    .regex(/^\d+$/, "Digite apenas números"),
  categoria_Id: z.string().min(1, "Selecione uma categoria"),
  fornecedor_Id: z.string().min(1, "Selecione um fornecedor"),
  desc_produto: z.string(),
  preco_compra: z.coerce
    .number()
    .positive("O valor de compra deve ser maior que zero"),
  preco_venda: z.coerce
    .number()
    .positive("O valor de venda deve ser maior que zero"),
  qtd_produto: z.coerce
    .number()
    .int("A quantidade deve ser um número inteiro")
    .min(0, "A quantidade não pode ser negativa"),
  estoque_minimo: z.coerce
    .number()
    .int("O estoque mínimo deve ser um número inteiro")
    .min(0, "O estoque mínimo não pode ser negativo"),
});

type ProductFormInput = z.input<typeof formSchema>;
type ProductFormOutput = z.output<typeof formSchema>;

function ProductCard({ produto, categories, suppliers }: ProductCardProps) {
  const form = useForm<ProductFormInput, unknown, ProductFormOutput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: produto?.nome ?? "",
      sku_produto: produto?.sku ?? "",
      cod_barra_produto: produto?.codigoBarras ?? "",
      categoria_Id: produto?.categoriaId ?? "",
      fornecedor_Id: produto?.fornecedorId ?? "",
      desc_produto: produto?.descricao ?? "",
      preco_compra: produto?.precoCompra ? Number(produto.precoCompra) : 0,
      preco_venda: produto?.precoVenda ? Number(produto.precoVenda) : 0,
      qtd_produto: produto?.quantidade ?? 0,
      estoque_minimo: produto?.estoqueMinimo ?? 0,
    },
  });

  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function onHandleCancelar() {
    router.back();
  }

  function onHandleSalvarEdicao(data: ProductFormOutput) {
    startTransition(() => {
      atualizarProduto({
        id: produto?.id ?? "",
        params: data,
      })
        .then((resultado) => {
          if (resultado?.success) {
            toast.add({
              type: "success",
              description:
                resultado?.message ?? "Não foi possível atualizar o produto.",
            });

            router.push("/dashboard/products");
          } else {
            toast.add({
              type: "error",
              description:
                resultado?.message ?? "Não foi possível atualizar o produto.",
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
    <div className="p-4">
      <form onSubmit={form.handleSubmit(onHandleSalvarEdicao)}>
        <FieldSet>
          <div className="flex gap-10">
            <FieldGroup className="border p-5 rounded-2xl">
              <FieldLegend className="text-center">
                Informações do produto
              </FieldLegend>
              <Field>
                <div>
                  <FieldLabel htmlFor="nome_produto" className="mb-2">
                    Nome do produto
                  </FieldLabel>
                  <Controller
                    name="nome"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <Input
                          {...field}
                          aria-invalid={fieldState.invalid}
                          placeholder="Nome do produto"
                          className="bg-white p-2 rounded-md border border-sidebar-border "
                          autoComplete="off"
                          value={field.value == null ? "" : field.value}
                          onChange={(e) => {
                            const value = e.target.value;
                            field.onChange(value);
                          }}
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
                    <FieldLabel htmlFor="sku_produto" className="mb-2">
                      SKU
                    </FieldLabel>
                    <Controller
                      name="sku_produto"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <Input
                            {...field}
                            aria-invalid={fieldState.invalid}
                            placeholder="SKU do produto"
                            className="bg-white p-2 rounded-md border border-sidebar-border "
                            autoComplete="off"
                            value={field.value == null ? "" : field.value}
                            onChange={(e) => {
                              const value = e.target.value;
                              field.onChange(value);
                            }}
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </div>
                  <div>
                    <FieldLabel htmlFor="cod_barra_produto" className="mb-2">
                      Código de barras
                    </FieldLabel>

                    <Controller
                      name="cod_barra_produto"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <Input
                            {...field}
                            aria-invalid={fieldState.invalid}
                            placeholder="Cód de barras"
                            className="bg-white p-2 rounded-md border border-sidebar-border"
                            autoComplete="off"
                            type="text"
                            inputMode="numeric"
                            maxLength={13}
                            value={field.value == null ? "" : field.value}
                            onChange={(e) => {
                              const value = e.target.value;
                              field.onChange(value);
                            }}
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
              <FieldLegend className="text-center">Classificação</FieldLegend>
              <Field>
                <div className="flex items-center justify-between gap-1">
                  <div>
                    <FieldLabel htmlFor="cat_produto" className="mb-2">
                      Categoria
                    </FieldLabel>
                    <Controller
                      control={form.control}
                      name="categoria_Id"
                      render={({ field, fieldState }) => {
                        const categoriaSelecionada = categories.find(
                          (categoria) => categoria.id === field.value,
                        );

                        return (
                          <>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger className="w-50">
                                <SelectValue placeholder="Escolha uma categoria">
                                  {categoriaSelecionada?.nome}
                                </SelectValue>
                              </SelectTrigger>

                              <SelectContent>
                                <SelectGroup>
                                  {categories.map((categoria) => (
                                    <SelectItem
                                      key={categoria.id}
                                      value={categoria.id}
                                    >
                                      {categoria.nome}
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
                  <div>
                    <FieldLabel htmlFor="fornecedor" className="mb-2">
                      Fornecedor
                    </FieldLabel>
                    <Controller
                      control={form.control}
                      name="fornecedor_Id"
                      render={({ field, fieldState }) => {
                        const fornecedorSelecionado = suppliers.find(
                          (fornecedor) => fornecedor.id === field.value,
                        );

                        return (
                          <>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger className="w-50">
                                <SelectValue placeholder="Escolha um fornecedor">
                                  {fornecedorSelecionado?.nome}
                                </SelectValue>
                              </SelectTrigger>

                              <SelectContent>
                                <SelectGroup>
                                  {suppliers.map((fornecedor) => (
                                    <SelectItem
                                      key={fornecedor.id}
                                      value={fornecedor.id}
                                    >
                                      {fornecedor.nome}
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
                <div>
                  <FieldLabel htmlFor="desc_produto" className="mb-2">
                    Descrição
                  </FieldLabel>
                  <Controller
                    name="desc_produto"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <Input
                          {...field}
                          aria-invalid={fieldState.invalid}
                          placeholder="Descrição do produto"
                          className="bg-white p-2 rounded-md border border-sidebar-border "
                          autoComplete="off"
                          value={field.value == null ? "" : field.value}
                          onChange={(e) => {
                            const value = e.target.value;
                            field.onChange(value);
                          }}
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

          <div className="flex gap-10">
            <FieldGroup className="border p-5 rounded-2xl">
              <FieldLegend className="text-center">Valores</FieldLegend>
              <Field>
                <div className="flex items-center justify-evenly gap-15">
                  <div>
                    <FieldLabel htmlFor="preco_compra" className="mb-2">
                      Preço de compra
                    </FieldLabel>
                    <div className="flex items-center gap-1">
                      <span>R$: </span>
                      <Controller
                        control={form.control}
                        name="preco_compra"
                        render={({ field, fieldState }) => (
                          <>
                            <Input
                              id="preco_compra"
                              autoComplete="off"
                              placeholder="0.00"
                              type="number"
                              step="0.01"
                              min="0"
                              className="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none w-30"
                              value={
                                field.value == null ? "" : String(field.value)
                              }
                              onChange={(e) => {
                                const value = e.target.value;
                                field.onChange(
                                  value === "" ? "" : Number(value),
                                );
                              }}
                            />

                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </>
                        )}
                      />
                    </div>
                  </div>
                  <div>
                    <FieldLabel htmlFor="preco_venda" className="mb-2">
                      Preço de venda
                    </FieldLabel>
                    <div className="flex items-center gap-1">
                      <span>R$: </span>
                      <Controller
                        control={form.control}
                        name="preco_venda"
                        render={({ field, fieldState }) => (
                          <>
                            <Input
                              id="preco_venda"
                              autoComplete="off"
                              placeholder="0.00"
                              type="number"
                              step="0.01"
                              min="0"
                              className="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none w-30"
                              {...field}
                              value={
                                field.value == null ? "" : String(field.value)
                              }
                              onChange={(e) => {
                                const value = e.target.value;
                                field.onChange(
                                  value === "" ? "" : Number(value),
                                );
                              }}
                            />

                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </Field>
            </FieldGroup>

            <FieldGroup className="border p-5 rounded-2xl">
              <FieldLegend className="text-center">Estoque</FieldLegend>

              <Field>
                <div className="flex items-center justify-evenly gap-15">
                  <div>
                    <FieldLabel htmlFor="qtd_produto" className="mb-2">
                      Quantidade
                    </FieldLabel>
                    <Controller
                      control={form.control}
                      name="qtd_produto"
                      render={({ field, fieldState }) => (
                        <>
                          <Input
                            disabled={true}
                            id="qtd_produto"
                            autoComplete="off"
                            placeholder="0"
                            type="number"
                            min="0"
                            className={
                              produto?.quantidade != null &&
                              produto.quantidade < produto.estoqueMinimo
                                ? "border-red-500 border-2 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none w-30"
                                : "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none w-30"
                            }
                            {...field}
                            value={
                              produto?.quantidade != null
                                ? produto.quantidade.toString()
                                : ""
                            }
                          />

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </>
                      )}
                    />
                  </div>
                  <div>
                    <FieldLabel htmlFor="estoque_minimo" className="mb-2">
                      Estoque mínimo
                    </FieldLabel>
                    <Controller
                      control={form.control}
                      name="estoque_minimo"
                      render={({ field, fieldState }) => (
                        <>
                          <Input
                            disabled={true}
                            id="estoque_minimo"
                            autoComplete="off"
                            placeholder="0"
                            type="number"
                            min="0"
                            className="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none w-30"
                            {...field}
                            value={
                              produto?.estoqueMinimo != null
                                ? produto.estoqueMinimo.toString()
                                : ""
                            }
                          />

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </>
                      )}
                    />
                  </div>
                </div>
              </Field>
              <Tooltip>
                <TooltipTrigger
                  render={
                    <p className="text-sm text-red-500 opacity-90 text-center">
                      Movimentações não permitidas.
                    </p>
                  }
                />
                <TooltipContent>
                  <p>Movimente no menu Estoque!</p>
                </TooltipContent>
              </Tooltip>
            </FieldGroup>
          </div>
        </FieldSet>
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
              <p>salvar edição</p>
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
    </div>
  );
}

export default ProductCard;
