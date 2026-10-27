const databaseAnimal = [
  {
    id: "leche",
    nombre: "Leche",
    animal: "Vaca",
    maquina: "Recolector Automatico",
    herramienta: "Balde",
    produccion: "1 día",
    nota: "Se obtiene usando el Balde en la Vaca o en la maquina",
    precioBase: 125,
    precios: { normal: 125, plata: 156, oro: 187, iridio: 250 },
    svg: "../svg/Animal/leche.svg"
  },
  {
    id: "leche-cabra",
    nombre: "Leche de Cabra",
    animal: "Cabra",
    maquina: "Recolector Automatico",
    herramienta: "Balde",
    produccion: "1 día",
    nota: "Se obtiene usando el Balde en la Cabra o en la maquina",
    precioBase: 225,
    precios: { normal: 225, plata: 281, oro: 337, iridio: 450 },
    svg: "../svg/Animal/leche-cabra.svg"
  },
  {
    id: "queso",
    nombre: "Queso",
    animal: "Vaca",
    maquina: "Prensa de Queso",
    herramienta: "Balde",
    produccion: "1 día",
    nota: "Se obtiene usando el Balde en la Vaca. Luego se procesa en la Máquina.",
    precioBase: 230,
    precios: { normal: 230, plata: 287, oro: 345, iridio: 460 },
    svg: "../svg/Animal/Queso.svg"
  },
  {
    id: "huevo-gallina-blanca",
    nombre: "Huevo de Gallina Blanca",
    animal: "Gallina Blanca",
    maquina: "Recolector Automatico",
    herramienta: "Ninguna",
    produccion: "1 día",
    nota: "Se obtiene agarrando el huevo de una gallina blanca o usando la Máquina.",
    precioBase: 50,
    precios: { normal: 50, plata: 62, oro: 75, iridio: 100 },
    svg: "../svg/Animal/Huevo-gallina-blanca.svg"
  },
  {
    id: "huevo-gallina-marron",
    nombre: "Huevo de Gallina Marrón",
    animal: "Gallina Marrón",
    maquina: "Recolector Automatico",
    herramienta: "Ninguna",
    produccion: "1 día",
    nota: "Se obtiene agarrando el huevo de una gallina marrón o usando la Máquina.",
    precioBase: 50,
    precios: { normal: 50, plata: 62, oro: 75, iridio: 100 },
    svg: "../svg/Animal/Huevo-de-Gallina-Marron.svg"
  },
  {
    id: "huevo-dinosaurio",
    nombre: "Huevo de Dinosaurio",
    animal: "Dinosaurio",
    maquina: "Recolector Automatico",
    herramienta: "Ninguna",
    produccion: "1 día",
    nota: "Se obtiene agarrando el huevo de un dinosaurio o usando la Máquina.",
    precioBase: 350,
    precios: { normal: 350, plata: 437, oro: 525, iridio: 700 },
    svg: "../svg/Animal/Huevo-de-Dinosaurio.svg"
  }
];