const databasePeces = [
  {
    id: "pez_gota",
    nombre: "Pez gota",
    estaciones: ["Invierno"],
    lugar: "Playa",
    climas: ["Soleado", "Lluvioso"], // 👈 Arreglo
    evento: "Mercado Nocturno",
    dificultad: "75%",
    precioBase: 500,
    precios: { normal: 500, plata: 625, oro: 750, iridio: 1000 },
    svg: "../svg/pesca/Pez-gota.svg"
  },
  {
    id: "pulpo",
    nombre: "Pulpo",
    estaciones: ["Verano"],
    lugar: "Playa",
    climas: ["Soleado"],
    evento: "Ninguno",
    dificultad: "95%",
    precioBase: 150,
    precios: { normal: 150, plata: 187, oro: 225, iridio: 300 },
    svg: "../svg/Pesca/Pulpo.svg"
  },
  {
    id: "rape",
    nombre: "Rape",
    estaciones: ["Otoño"],
    lugar: "Alcantarilla",
    climas: ["Soleado"],
    evento: "Ninguno",
    dificultad: "85%",
    precioBase: 900,
    precios: { normal: 900, plata: 1125, oro: 1350, iridio: 1800 },
    svg: "../svg/Pesca/Rape.svg"
  },
  {
    id: "pez-sol",
    nombre: "Pez Sol",
    estaciones: ["Primavera", "Verano"], // 👈 Ejemplo de dos estaciones
    lugar: "Bosque Tizón",
    climas: ["Soleado"],
    evento: "Ninguno",
    dificultad: "30%",
    precioBase: 30,
    precios: { normal: 30, plata: 37, oro: 45, iridio: 60 },
    svg: "../svg/Pesca/Pez-sol.svg"
  },
  {
    id: "salmon",
    nombre: "Salmón",
    estaciones: ["Otoño"],
    lugar: "Bosque Tizón",
    climas: ["Soleado"],
    evento: "Ninguno",
    dificultad: "50%",
    precioBase: 75,
    precios: { normal: 75, plata: 93, oro: 112, iridio: 150 },
    svg: "../svg/Pesca/Salmon.svg"
  },
  {
    id: "leyenda",
    nombre: "Leyenda",
    estaciones: ["Primavera"],
    lugar: "Bosque Tizón",
    climas: ["Lluvioso"], // Corregido "LLuvioso"
    evento: "Ninguno",
    dificultad: "110%",
    precioBase: 5000,
    precios: { normal: 5000, plata: 6250, oro: 7500, iridio: 10000 },
    svg: "../svg/Pesca/Leyenda.svg"
  },
  {
    id: "pez_carmesi",
    nombre: "Pez Carmesí",
    estaciones: ["Verano"],
    lugar: "Playa",
    climas: ["Soleado"],
    evento: "Ninguno",
    dificultad: "95%",
    precioBase: 1500,
    precios: { normal: 1500, plata: 1875, oro: 2250, iridio: 3000 },
    svg: "../svg/Pesca/Pez-Carmesi.svg"
  },
  {
    id: "anchoa",
    nombre: "Anchoa",
    estaciones: ["Primavera", "Otoño"], // 👈 Ejemplo
    lugar: "Playa",
    climas: ["Soleado"],
    evento: "Ninguno",
    dificultad: "30%",
    precioBase: 30,
    precios: { normal: 30, plata: 37, oro: 45, iridio: 60 },
    svg: "../svg/Pesca/Anchoa.svg"
  },
  {
    id: "atun",
    nombre: "Atún",
    estaciones: ["Verano", "Invierno"], // 👈 Ejemplo
    lugar: "Playa",
    climas: ["Soleado", "Lluvioso"],
    evento: "Ninguno",
    dificultad: "70%",
    precioBase: 100,
    precios: { normal: 100, plata: 125, oro: 150, iridio: 200 },
    svg: "../svg/Pesca/Atun.svg"
  },
  {
    id: "besugo",
    nombre: "Besugo",
    estaciones: ["Primavera"],
    lugar: "Bosque Tizón",
    climas: ["Soleado"],
    evento: "Ninguno",
    dificultad: "35%",
    precioBase: 45,
    precios: { normal: 45, plata: 56, oro: 67, iridio: 90 },
    svg: "../svg/Pesca/Besugo.svg"
  },
  {
    id: "pez_globo",
    nombre: "Pez Globo",
    estaciones: ["Verano"],
    lugar: "Playa",
    climas: ["Soleado"],
    evento: "Ninguno",
    dificultad: "80%",
    precioBase: 200,
    precios: { normal: 200, plata: 250, oro: 300, iridio: 400 },
    svg: "../svg/Pesca/Pez-Globo.svg"
  },
  {
    id: "sardina",
    nombre: "Sardina",
    estaciones: ["Primavera"],
    lugar: "Playa",
    climas: ["Soleado"],
    evento: "Ninguno",
    dificultad: "30%",
    precioBase: 40,
    precios: { normal: 40, plata: 50, oro: 60, iridio: 80 },
    svg: "../svg/Pesca/Sardina.svg"
  }
];