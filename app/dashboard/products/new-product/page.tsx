import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/app/_components/ui/field";
import { Input } from "@/app/_components/ui/input";

export default function NewProduct() {
  return (
    <div className="p-4">
      <div>
        <h1 className="mb-4 text-2xl font-bold text-controla-primary">
          Cadastrar produto
        </h1>

        <p className="text-controla-medium">Preencha todos os campos abaixo.</p>
      </div>
      <div className="w-120 m-auto">
        <form>
          <FieldSet>
            <FieldGroup className="border p-2">
              <FieldLegend>Informações do produto</FieldLegend>
              <Field>
                <div>
                  <FieldLabel htmlFor="nome_produto">Nome</FieldLabel>
                  <Input
                    id="nome_produto"
                    autoComplete="off"
                    placeholder="Nome do produto"
                    type="text"
                  />
                </div>
                <div className="flex items-center justify-between gap-1">
                  <div>
                    <FieldLabel htmlFor="sku_produto">SKU</FieldLabel>
                    <Input
                      id="sku_produto"
                      autoComplete="off"
                      placeholder="SKU do produto"
                      type="text"
                    />
                  </div>
                  <div>
                    <FieldLabel htmlFor="cod_barra_produto">
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
                <div>
                  <FieldLabel htmlFor="desc_produto">Descrição</FieldLabel>
                  <Input
                    id="desc_produto"
                    autoComplete="off"
                    placeholder="Descrição do produto"
                    type="text"
                  />
                </div>
              </Field>
            </FieldGroup>

            <FieldGroup className="border p-2">
              <FieldLegend>Classificação</FieldLegend>
              <Field>
                <div className="flex items-center justify-between gap-1">
                  <div>
                    <FieldLabel htmlFor="cat_produto">Categoria</FieldLabel>
                    <Input
                      id="cat_produto"
                      autoComplete="off"
                      placeholder="Categoria do produto"
                      type="text"
                    />
                  </div>
                  <div>
                    <FieldLabel htmlFor="fornecedor">Fornecedor</FieldLabel>
                    <Input
                      id="fornecedor"
                      autoComplete="off"
                      placeholder="Fornecedor"
                      type="text"
                    />
                  </div>
                </div>
              </Field>
            </FieldGroup>

            <FieldGroup className="border p-2">
              <FieldLegend>Valores</FieldLegend>
              <Field>
                <div className="flex items-center justify-between gap-1">
                  <div>
                    <FieldLabel htmlFor="cat_produto">Preço de compra</FieldLabel>
                    <Input
                      id="cat_produto"
                      autoComplete="off"
                      placeholder="Preço de compra"
                      type="text"
                    />
                  </div>
                  <div>
                    <FieldLabel htmlFor="fornecedor">Preço de venda</FieldLabel>
                    <Input
                      id="fornecedor"
                      autoComplete="off"
                      placeholder="Fornecedor"
                      type="text"
                    />
                  </div>
                </div>
              </Field>
            </FieldGroup>

                <FieldGroup className="border p-2">
              <FieldLegend>Estoque</FieldLegend>
              <Field>
                <div className="flex items-center justify-between gap-1">
                  <div>
                    <FieldLabel htmlFor="cat_produto">Quantidade</FieldLabel>
                    <Input
                      id="cat_produto"
                      autoComplete="off"
                      placeholder="Preço de compra"
                      type="text"
                    />
                  </div>
                  <div>
                    <FieldLabel htmlFor="fornecedor">Estoque mínimo</FieldLabel>
                    <Input
                      id="fornecedor"
                      autoComplete="off"
                      placeholder="Fornecedor"
                      type="text"
                    />
                  </div>
                </div>
              </Field>
            </FieldGroup>
          </FieldSet>

        </form>
      </div>
    </div>
  );
}
