"use client";

import { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/app/_components/ui/dialog";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { toast } from "@/app/_components/ui/toast";
import { darEntradaEstoque } from "@/app/_services/stock.service";
import { Loader2Icon, PackagePlus, Plus, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

export type StockProduct = {
  id: string;
  nome: string;
  sku: string;
  codigoBarras: string;
  quantidade: number;
  estoqueMinimo: number;
  precoCompra: number;
  precoVenda: number;
  categoria: {
    nome: string;
  };
  fornecedor?: {
    nome: string;
  } | null;
};

interface StockEntryModalProps {
  product: StockProduct | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function StockEntryModal({
  product,
  isOpen,
  onClose,
}: StockEntryModalProps) {
  const router = useRouter();
  const [quantidade, setQuantidade] = useState<number>(1);
  const [observacao, setObservacao] = useState<string>("");
  const [novoPrecoCompra, setNovoPrecoCompra] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  if (!product) return null;

  const currentStock = product.quantidade || 0;
  const quantityNumber = Number(quantidade) || 0;
  const newStockTotal = currentStock + (quantityNumber > 0 ? quantityNumber : 0);

  const handleQuickAdd = (amount: number) => {
    setQuantidade((prev) => Math.max(1, (Number(prev) || 0) + amount));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!quantidade || quantidade <= 0) {
      toast.add({
        type: "error",
        description: "Informe uma quantidade válida maior que 0.",
      });
      return;
    }

    startTransition(async () => {
      try {
        const res = await darEntradaEstoque({
          produtoId: product.id,
          quantidade: Number(quantidade),
          observacao: observacao.trim() || undefined,
          novoPrecoCompra: novoPrecoCompra
            ? Number(parseFloat(novoPrecoCompra.replace(",", ".")))
            : undefined,
        });

        if (res.success) {
          toast.add({
            type: "success",
            description: res.message,
          });
          onClose();
          router.refresh();
        } else {
          toast.add({
            type: "error",
            description: res.message || "Erro ao dar entrada no produto.",
          });
        }
      } catch (err) {
        console.error(err);
        const errorMessage =
          err instanceof Error ? err.message : "Erro inesperado ao processar entrada.";
        toast.add({
          type: "error",
          description: errorMessage,
        });
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md sm:max-w-lg bg-white p-6 rounded-2xl shadow-xl">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-controla-primary/10 text-controla-primary">
              <PackagePlus className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle className="text-lg font-bold text-controla-primary">
                Dar Entrada no Estoque
              </DialogTitle>
              <DialogDescription className="text-xs text-controla-medium">
                Adicione unidades para este produto no inventário.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Informações do Produto */}
        <div className="rounded-xl border border-gray-100 bg-gray-50/80 p-3.5 text-xs text-gray-700">
          <div className="font-bold text-sm text-gray-900 uppercase">
            {product.nome}
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-gray-500">
            {product.sku && <span>SKU: <strong className="text-gray-700">{product.sku}</strong></span>}
            {product.categoria?.nome && <span>Categoria: <strong className="text-gray-700">{product.categoria.nome}</strong></span>}
            <span>Preço Custo Atual: <strong className="text-gray-700">R$ {product.precoCompra.toFixed(2)}</strong></span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo Quantidade */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-semibold text-gray-700">
                Quantidade a Adicionar *
              </Label>
              <span className="text-[11px] text-gray-500">
                Estoque atual: <strong className="text-gray-800">{currentStock} un</strong>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Input
                type="number"
                min={1}
                step={1}
                value={quantidade}
                onChange={(e) => setQuantidade(Math.max(1, parseInt(e.target.value) || 0))}
                className="h-10 text-base font-semibold text-gray-900"
                required
                autoFocus
              />
            </div>

            {/* Botões de atalho rápido */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] text-gray-400 font-medium mr-1">Atalhos:</span>
              {[1, 5, 10, 25, 50, 100].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => handleQuickAdd(amt)}
                  className="rounded-md border border-gray-200 bg-white px-2 py-0.5 text-xs font-medium text-gray-600 transition hover:border-controla-medium hover:text-controla-primary active:scale-95"
                >
                  +{amt}
                </button>
              ))}
            </div>
          </div>

          {/* Previsão do Novo Estoque */}
          <div className="flex items-center justify-between rounded-xl bg-emerald-50/60 border border-emerald-200/80 px-4 py-2.5 text-xs text-emerald-900">
            <div className="flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-emerald-600" />
              <span>Novo estoque após a entrada:</span>
            </div>
            <span className="font-bold text-sm text-emerald-700">
              {newStockTotal} unidades
            </span>
          </div>

          {/* Preço de Custo Opcional */}
          <div className="space-y-1">
            <Label className="text-xs font-semibold text-gray-700">
              Atualizar Preço de Compra Unitário (opcional)
            </Label>
            <Input
              type="number"
              step="0.01"
              min="0"
              placeholder={`Atual: R$ ${product.precoCompra.toFixed(2)}`}
              value={novoPrecoCompra}
              onChange={(e) => setNovoPrecoCompra(e.target.value)}
              className="h-9 text-xs"
            />
          </div>

          {/* Observação / Motivo */}
          <div className="space-y-1">
            <Label className="text-xs font-semibold text-gray-700">
              Observação / Lote / Nota Fiscal (opcional)
            </Label>
            <Input
              placeholder="Ex: Compra NF 12345, Reposição semanal..."
              value={observacao}
              onChange={(e) => setObservacao(e.target.value)}
              className="h-9 text-xs"
            />
          </div>

          <DialogFooter className="pt-2 gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isPending}
              className="cursor-pointer"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="cursor-pointer bg-controla-medium text-white hover:opacity-90 hover:bg-controla-medium font-semibold"
            >
              {isPending ? (
                <>
                  <Loader2Icon className="h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  Confirmar Entrada
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
