"use client"

import { Button } from "@/app/_components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/app/_components/ui/field";
import { Input } from "@/app/_components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { useRouter } from "next/navigation";

type NewProductFormProps = {
  categories: { nome: string }[];
  suppliers: { nome: string }[];
};

function NewProductForm({ categories, suppliers }: NewProductFormProps) {
    const router = useRouter()

    function onHandleCancelar(){
        router.back()
    }

  return (
    <form>
      <FieldSet>
        <div className="flex gap-10">
          <FieldGroup className="border p-5 rounded-2xl">
            <FieldLegend className="text-center">
              Informações do produto
            </FieldLegend>
            <Field>
              <div>
                <FieldLabel htmlFor="nome_produto" className="mb-2">
                  Nome
                </FieldLabel>
                <Input
                  id="nome_produto"
                  autoComplete="off"
                  placeholder="Nome do produto"
                  type="text"
                />
              </div>
              <div className="flex items-center justify-between gap-1">
                <div>
                  <FieldLabel htmlFor="sku_produto" className="mb-2">
                    SKU
                  </FieldLabel>
                  <Input
                    id="sku_produto"
                    autoComplete="off"
                    placeholder="SKU do produto"
                    type="text"
                  />
                </div>
                <div>
                  <FieldLabel htmlFor="cod_barra_produto" className="mb-2">
                    Código de barras
                  </FieldLabel>
                  <Input
                    id="cod_barra_produto"
                    autoComplete="off"
                    placeholder="Código de barras do produto"
                    type="text"
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
                  <Select>
                    <SelectTrigger className="w-50">
                      <SelectValue placeholder="Escolha uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {categories.map((categoria) => (
                          <SelectItem
                            key={categoria.nome}
                            value={categoria.nome}
                          >
                            {categoria.nome}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <FieldLabel htmlFor="fornecedor" className="mb-2">
                    Fornecedor
                  </FieldLabel>
                  <Select>
                    <SelectTrigger className="w-50">
                      <SelectValue placeholder="Escolha uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {suppliers.map((fornecedor) => (
                          <SelectItem
                            key={fornecedor.nome}
                            value={fornecedor.nome}
                          >
                            {fornecedor.nome}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <FieldLabel htmlFor="desc_produto" className="mb-2">
                  Descrição
                </FieldLabel>
                <Input
                  id="desc_produto"
                  autoComplete="off"
                  placeholder="Descrição do produto"
                  type="text"
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
                  <FieldLabel htmlFor="compra_produto" className="mb-2">
                    Preço de compra
                  </FieldLabel>
                  <div className="flex items-center gap-1">
                    <span>R$: </span>
                    <Input
                      id="compra_produto"
                      autoComplete="off"
                      placeholder="0"
                      type="number"
                      className="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none w-30"
                    />
                  </div>
                </div>
                <div>
                  <FieldLabel htmlFor="venda_produto" className="mb-2">
                    Preço de venda
                  </FieldLabel>
                  <div className="flex items-center gap-1">
                    <span>R$: </span>
                    <Input
                      id="venda_produtp"
                      autoComplete="off"
                      placeholder="0"
                      type="number"
                      className="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none w-30"
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
                  <Input
                    id="qtd_produto"
                    autoComplete="off"
                    placeholder="0"
                    type="number"
                    className="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none w-30"
                  />
                </div>
                <div>
                  <FieldLabel htmlFor="qtd_min_produto" className="mb-2">
                    Estoque mínimo
                  </FieldLabel>
                  <Input
                    id="qtd_min_produto"
                    autoComplete="off"
                    placeholder="0"
                    type="number"
                    className="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none w-30"
                  />
                </div>
              </div>
            </Field>
          </FieldGroup>
        </div>
      </FieldSet>
      {/* botões */}
      <div className="mt-10 flex items-center justify-center gap-10">
        <Button
          size={"lg"}
          className="font-semibold cursor-pointer bg-controla-medium h-12 uppercase hover:bg-controla-medium hover:opacity-80"
          type="submit"
        >
          Salvar
        </Button>
        <Button
          size={"lg"}
          className="font-semibold cursor-pointer text-controla-medium h-12 uppercase bg-white  hover:border hover:border-controla-medium hover:bg-white "
          type="reset"
          onClick={onHandleCancelar}
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
}

export default NewProductForm;
