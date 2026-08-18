import NewSupplierForm from "@/app/_components/new-supplier-form";

export default function NewSupplier() {
  return (
    <div className="p-4">
      <div>
        <h1 className="mb-4 text-2xl font-bold text-controla-primary">
          Cadastrar fornecedor
        </h1>

        <p className="text-controla-medium">Preencha todos os campos abaixo.</p>
      </div>
      <div className="w-250 m-auto mt-10">
        <NewSupplierForm />
      </div>
    </div>
  );
}
