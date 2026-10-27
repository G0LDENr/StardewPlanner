const databaseCultivos = [
  {
    id: "fresa",
    nombre: "Fresa",
    estacion: "Primavera",
    diasCrecimiento: 8,
    regeneracion: "Cada 4 días",
    precioBase: 100,
    precios: { normal: 120, plata: 150, oro: 180, iridio: 240 },
    svg: "../svg/Cultivos/Fresa.svg"
  },
  {
    id: "coliflor",
    nombre: "Coliflor",
    estacion: "Primavera",
    diasCrecimiento: 12,
    regeneracion: "1 x cosecha",
    precioBase: 80,
    precios: { normal: 175, plata: 215, oro: 262, iridio: 350 },
    svg: "../svg/Cultivos/Coliflor.svg"
  },
  {
    id: "papa",
    nombre: "Papa",
    estacion: "Primavera",
    diasCrecimiento: 6,
    regeneracion: "1 x cosecha",
    precioBase: 50,
    precios: { normal: 80, plata: 100, oro: 120, iridio: 160 },
    svg: "../svg/Cultivos/Papa.svg"
  },
  {
    id: "chirivia",
    nombre: "Chirivía",
    estacion: "Primavera",
    diasCrecimiento: 4,
    regeneracion: "1 x cosecha",
    precioBase: 40,
    precios: { normal: 35, plata: 43, oro: 52, iridio: 70 },
    svg: "../svg/Cultivos/Chirivia.svg"
  },
  {
    id: "maiz",
    nombre: "Maíz",
    estacion: "Verano",
    diasCrecimiento: 14,
    regeneracion: "Cada 4 días",
    precioBase: 150,
    precios: { normal: 50, plata: 62, oro: 75, iridio: 100 },
    svg: "../svg/Cultivos/Maiz.svg"
  },
  {
    id: "melon",
    nombre: "Melón",
    estacion: "Verano",
    diasCrecimiento: 12,
    regeneracion: "1 x cosecha",
    precioBase: 80,
    precios: { normal: 250, plata: 312, oro: 375, iridio: 500 },
    svg: "../svg/Cultivos/Melon.svg"
  },
  {
    id: "zanahoria",
    nombre: "Zanahoria",
    estacion: "Primavera",
    diasCrecimiento: 3,
    regeneracion: "1 x cosecha",
    precioBase: 0,
    precios: { normal: 35, plata: 43, oro: 52, iridio: 70 },
    svg: "../svg/Cultivos/Zanahoria.svg"
  },
  {
    id: "berenjena",
    nombre: "Berenjena",
    estacion: "Otoño",
    diasCrecimiento: 5,
    regeneracion: "Cada 5 días",
    precioBase: 20,
    precios: { normal: 60, plata: 75, oro: 90, iridio: 120 },
    svg: "../svg/Cultivos/Berenjena.svg"
  },
  {
    id: "chile",
    nombre: "Chile",
    estacion: "Verano",
    diasCrecimiento: 5,
    regeneracion: "Cada 3 días",
    precioBase: 40,
    precios: { normal: 40, plata: 50, oro: 60, iridio: 80 },
    svg: "../svg/Cultivos/Chile.svg"
  },
  {
    id: "calabaza",
    nombre: "Calabaza",
    estacion: "Otoño",
    diasCrecimiento: 13,
    regeneracion: "1 x cosecha",
    precioBase: 100,
    precios: { normal: 320, plata: 400, oro: 480, iridio: 640 },
    svg: "../svg/Cultivos/Calabaza.svg"
  },
  {
    id: "arandano",
    nombre: "Arándano",
    estacion: "Verano",
    diasCrecimiento: 13,
    regeneracion: "Cada 4 días",
    precioBase: 80,
    precios: { normal: 50, plata: 62, oro: 75, iridio: 100 },
    svg: "../svg/Cultivos/Arandano.svg"
  },
  {
    id: "grano_cafe",
    nombre: "Grano de Café",
    estacion: "Verano",
    diasCrecimiento: 10,
    regeneracion: "cada 2 dias",
    precioBase: 30,
    precios: { normal: 15, plata: 18, oro: 22, iridio: 30 },
    svg: "../svg/Cultivos/Grano-de-Cafe.svg"
  },
  {
    id: "ajo",
    nombre: "Ajo",
    estacion: "Primavera",
    diasCrecimiento: 4,
    regeneracion: "1 x cosecha",
    precioBase: 40,
    precios: { normal: 60, plata: 75, oro: 90, iridio: 120 },
    svg: "../svg/Cultivos/Ajo.svg"
  },
  {
    id: "calabaza_amarilla",
    nombre: "Calabaza Amarilla",
    estacion: "Verano",
    diasCrecimiento: 6,
    regeneracion: "cada 3 dias",
    precioBase: 0,
    precios: { normal: 45, plata: 56, oro: 67, iridio: 90 },
    svg: "../svg/Cultivos/Calabaza-Amarilla.svg"
  },
  {
    id: "col_rizada",
    nombre: "Col Rizada",
    estacion: "Primavera",
    diasCrecimiento: 6,
    regeneracion: "1 x cosecha",
    precioBase: 70,
    precios: { normal: 110, plata: 137, oro: 165, iridio: 220 },
    svg: "../svg/Cultivos/Col-Rizada.svg"
  },
  {
    id: "judia_verde",
    nombre: "Judía Verde",
    estacion: "Primavera",
    diasCrecimiento: 10,
    regeneracion: "cada 3 dias",
    precioBase: 60,
    precios: { normal: 40, plata: 50, oro: 60, iridio: 80 },
    svg: "../svg/Cultivos/Judia-Verde.svg"
  },
  {
    id: "lupulo",
    nombre: "Lúpulo",
    estacion: "Verano",
    diasCrecimiento: 11,
    regeneracion: "cada dia",
    precioBase: 60,
    precios: { normal: 25, plata: 31, oro: 37, iridio: 50 },
    svg: "../svg/Cultivos/Lupulo.svg"
  },
  {
    id: "ruibarbo",
    nombre: "Ruibarbo",
    estacion: "Primavera",
    diasCrecimiento: 13,
    regeneracion: "1 x cosecha",
    precioBase: 100,
    precios: { normal: 220, plata: 275, oro: 330, iridio: 440 },
    svg: "../svg/Cultivos/Ruibarbo.svg"
  }
];