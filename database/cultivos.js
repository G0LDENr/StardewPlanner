const databaseCultivos = [
  {
    id: "fresa",
    nombre: "Fresa",
    estacion: "Primavera",
    diasCrecimiento: 8,
    regeneracion: "Cada 4 días",
    precioBase: 20.83,
    precios: { normal: 120, plata: 150, oro: 180, iridio: 240 },
    svg: "../svg/Cultivos/Fresa.svg"
  },
  {
    id: "coliflor",
    nombre: "Coliflor",
    estacion: "Primavera",
    diasCrecimiento: 12,
    regeneracion: "1 x cosecha",
    precioBase: 7.92,
    precios: { normal: 175, plata: 215, oro: 262, iridio: 350 },
    svg: "../svg/Cultivos/Coliflor.svg"
  },
  {
    id: "papa",
    nombre: "Papa",
    estacion: "Primavera",
    diasCrecimiento: 6,
    regeneracion: "1 x cosecha",
    precioBase: 8.33,
    precios: { normal: 80, plata: 100, oro: 120, iridio: 160 },
    svg: "../svg/Cultivos/Papa.svg"
  },
  {
    id: "chirivia",
    nombre: "Chirivía",
    estacion: "Primavera",
    diasCrecimiento: 4,
    regeneracion: "1 x cosecha",
    precioBase: 3.75,
    precios: { normal: 35, plata: 43, oro: 52, iridio: 70 },
    svg: "../svg/Cultivos/Chirivia.svg"
  },
  {
    id: "maiz",
    nombre: "Maíz",
    estacion: "Verano",
    diasCrecimiento: 14,
    regeneracion: "Cada 4 días",
    precioBase: 7.41,
    precios: { normal: 50, plata: 62, oro: 75, iridio: 100 },
    svg: "../svg/Cultivos/Maiz.svg"
  },
  {
    id: "melon",
    nombre: "Melón",
    estacion: "Verano",
    diasCrecimiento: 12,
    regeneracion: "1 x cosecha",
    precioBase: 14.17,
    precios: { normal: 250, plata: 312, oro: 375, iridio: 500 },
    svg: "../svg/Cultivos/Melon.svg"
  },
  {
    id: "zanahoria",
    nombre: "Zanahoria",
    estacion: "Primavera",
    diasCrecimiento: 3,
    regeneracion: "1 x cosecha",
    precioBase: 11.67,
    precios: { normal: 35, plata: 43, oro: 52, iridio: 70 },
    svg: "../svg/Cultivos/Zanahoria.svg"
  },
  {
    id: "berenjena",
    nombre: "Berenjena",
    estacion: "Otoño",
    diasCrecimiento: 5,
    regeneracion: "Cada 5 días",
    precioBase: 11.2,
    precios: { normal: 60, plata: 75, oro: 90, iridio: 120 },
    svg: "../svg/Cultivos/Berenjena.svg"
  },
  {
    id: "chile",
    nombre: "Chile",
    estacion: "Verano",
    diasCrecimiento: 5,
    regeneracion: "Cada 3 días",
    precioBase: 10.77,
    precios: { normal: 40, plata: 50, oro: 60, iridio: 80 },
    svg: "../svg/Cultivos/Chile.svg"
  },
  {
    id: "calabaza",
    nombre: "Calabaza",
    estacion: "Otoño",
    diasCrecimiento: 13,
    regeneracion: "1 x cosecha",
    precioBase: 16.92,
    precios: { normal: 320, plata: 400, oro: 480, iridio: 640 },
    svg: "../svg/Cultivos/Calabaza.svg"
  },
  {
    id: "arandano",
    nombre: "Arándano",
    estacion: "Verano",
    diasCrecimiento: 13,
    regeneracion: "Cada 4 días",
    precioBase: 20.8,
    precios: { normal: 50, plata: 62, oro: 75, iridio: 100 },
    svg: "../svg/Cultivos/Arandano.svg"
  },
  {
    id: "grano_cafe",
    nombre: "Grano de Café",
    estacion: "Verano",
    diasCrecimiento: 10,
    regeneracion: "cada 2 dias",
    precioBase: 20.77,
    precios: { normal: 15, plata: 18, oro: 22, iridio: 30 },
    svg: "../svg/Cultivos/Grano-de-Cafe.svg"
  }
];