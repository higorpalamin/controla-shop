"use client";

import { FilterIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

function Filtrar() {
  const [menuOptions, setMenuOptions] = useState(false);

  function toggleMenu() {
    setMenuOptions(!menuOptions);
  }
  return (
    <div className="relative">
      <Button
        className="cursor-pointer text-md font-semibold bg-controla-medium hover:opacity-80 hover:bg-controla-medium"
        // onClick={toggleMenu}
      >
        <FilterIcon className="stroke-3" />
        Filtrar
      </Button>
      {menuOptions && (
        <div className="absolute right-0 top-full z-50 mt-2 w-64 rounded-md border bg-white p-4 shadow-lg">
          <p className="font-semibold">Filtros</p>

          <div className="mt-4">
            <label>Categoria</label>

            <select className="mt-1 w-full rounded-md border p-2">
              <option value="">Todas</option>
              <option value="1">Processadores</option>
              <option value="2">Memórias</option>
              <option value="3">Placas de vídeo</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}

export default Filtrar;
