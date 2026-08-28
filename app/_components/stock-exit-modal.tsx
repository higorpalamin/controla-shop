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
import { darSaidaEstoque } from "@/app/_services/stock.service";
import { AlertTriangle, Loader2Icon, Minus, PackageMinus } from "lucide-react";
import { useRouter } from "next/navigation";
import { StockProduct } from "./stock-entry-modal";

interface StockExitModalProps {
  product: StockProduct | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function StockExitModal({
  product,
  isOpen,
  onClose,
}: StockExitModalProps) {
  const router = useRouter();
  const [quantidade, setQuantidade] = useState<number>(1);
  const [observacao, setObservacao] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  if (!product) return null;

  const currentStock = product.quantidade || 0;
  const quantityNumber = Number(quantidade) || 0;
  const remainingStock = Math.max(0, currentStock - quantityNumber);
  const isBelowMin = remainingStock < product.estoqueMinimo;
  const isOutOfStock = currentStock <= 0;

  const handleQuickAdd = (amount: number) => {
    setQuantidade((prev) => {
      const next = (Number(prev) || 0) + amount;
      return Math.min(currentStock, Math.max(1, next));
    });
  };

  const handleSetAll = () => {
    setQuantidade(currentStock);
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

    if (quantidade > currentStock) {
      toast.add({
        type: "error",
        description: `Quantidade informada (${quantidade}) excede o saldo disponível (${currentStock} un).`,
      });
      return;
    }

    startTransition(async () => {
      try {
        const res = await darSaidaEstoque({
          produtoId: product.id,
          quantidade: Number(quantidade),
          observacao: observacao.trim() || undefined,
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
            description: res.message || "Erro ao dar saída no produto.",
          });
        }
      } catch (err) {
        console.error(err);
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Erro inesperado ao processar saída.";
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
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-50 text-rose-600 border border-rose-200">
              <PackageMinus className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle className="text-lg font-bold text-controla-primary">
                Dar Baixa / Saída de Estoque
              </DialogTitle>
              <DialogDescription className="text-xs text-controla-medium">
                Registre a saída ou baixa de unidades deste produto.
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
            {product.sku && (
              <span>
                SKU: <strong className="text-gray-700">{product.sku}</strong>
              </span>
            )}
            {product.categoria?.nome && (
              <span>
                Categoria:{" "}
                <strong className="text-gray-700">
                  {product.categoria.nome}
                </strong>
              </span>
            )}
            <span>
              Preço Venda:{" "}
              <strong className="text-gray-700">
                R$ {product.precoVenda.toFixed(2)}
              </strong>
            </span>
          </div>
        </div>

        {isOutOfStock ? (
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs text-rose-800 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 shrink-0 text-rose-600" />
            <span>
              Este produto já está com o <strong>estoque zerado (0 unidades)</strong>. Não é possível realizar saídas.
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Campo Quantidade */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-semibold text-gray-700">
                  Quantidade a Retirar *
                </Label>
                <span className="text-[11px] text-gray-500">
                  Disponível:{" "}
                  <strong className="text-emerald-700">
                    {currentStock} un
                  </strong>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  min={1}
                  max={currentStock}
                  step={1}
                  value={quantidade}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 0;
                    setQuantidade(Math.min(currentStock, Math.max(1, val)));
                  }}
                  className="h-10 text-base font-semibold text-gray-900"
                  required
                  autoFocus
                />
              </div>

              {/* Botões de atalho rápido */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] text-gray-400 font-medium mr-1">
                  Atalhos:
                </span>
                {[1, 5, 10, 25, 50].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    disabled={amt > currentStock}
                    onClick={() => handleQuickAdd(amt)}
                    className="rounded-md border border-gray-200 bg-white px-2 py-0.5 text-xs font-medium text-gray-600 transition hover:border-controla-medium hover:text-controla-primary disabled:opacity-30 disabled:pointer-events-none active:scale-95"
                  >
                    +{amt}
                  </button>
                ))}
                {currentStock > 1 && (
                  <button
                    type="button"
                    onClick={handleSetAll}
                    className="rounded-md border border-rose-200 bg-rose-50 px-2 py-0.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-100 active:scale-95"
                  >
                    Tudo ({currentStock})
                  </button>
                )}
              </div>
            </div>

            {/* Previsão do Estoque Restante */}
            <div
              className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-xs border ${
                isBelowMin
                  ? "bg-amber-50/70 border-amber-200 text-amber-900"
                  : "bg-gray-50 border-gray-200 text-gray-800"
              }`}
            >
              <div className="flex items-center gap-1.5">
                {isBelowMin ? (
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                ) : (
                  <Minus className="h-4 w-4 text-gray-500" />
                )}
                <span>Saldo após esta saída:</span>
              </div>
              <span
                className={`font-bold text-sm ${
                  isBelowMin ? "text-amber-700" : "text-gray-900"
                }`}
              >
                {remainingStock} unidades
                {isBelowMin && (
                  <span className="ml-1 text-[10px] font-normal text-amber-600">
                    (Abaixo do mínimo: {product.estoqueMinimo} un)
                  </span>
                )}
              </span>
            </div>

            {/* Observação / Motivo */}
            <div className="space-y-1">
              <Label className="text-xs font-semibold text-gray-700">
                Motivo / Observação / Pedido (opcional)
              </Label>
              <Input
                placeholder="Ex: Venda balcão, Pedido #890, Avaria, Uso interno..."
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
                disabled={isPending || quantityNumber > currentStock}
                className="cursor-pointer bg-controla-medium text-white hover:opacity-90 hover:bg-controla-medium font-semibold"
              >
                {isPending ? (
                  <>
                    <Loader2Icon className="h-4 w-4 animate-spin" />
                    Processando...
                  </>
                ) : (
                  <>
                    <Minus className="h-4 w-4" />
                    Confirmar Saída
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
