export const business = {
  name: "Svjetlost Graf",
  descriptor: "Digitalna štamparija",
  phone: "+387 60 321 0343",
  phoneHref: "tel:+387603210343",
  address: "Mustafe Kamerića bb, Dobrinja II, 71000 Sarajevo",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Svjetlost%20Graf%20Mustafe%20Kameri%C4%87a%20bb%20Dobrinja%20II%20Sarajevo",
  mapsEmbedUrl: "https://www.google.com/maps?q=Svjetlost%20Graf%20Mustafe%20Kameri%C4%87a%20bb%20Dobrinja%20II%20Sarajevo&output=embed",
  services: [
    { number: "01", title: "Digitalna štampa", subtitle: "Papir, format, tiraž", detail: "Kopiranje, printanje dokumenata i štampa grafičkih materijala.", kind: "print" },
    { number: "02", title: "Uvez i dokumenti", subtitle: "Od lista do korica", detail: "Tvrdi i meki uvez te štampa maturskih, seminarskih i diplomskih radova.", kind: "bind" },
    { number: "03", title: "Poslovni materijali", subtitle: "Vizuelni identitet u ruci", detail: "Vizitkarte, pečati, naljepnice, etikete i promotivni materijali.", kind: "brand" },
    { number: "04", title: "Graviranje i dorada", subtitle: "Detalj koji ostaje", detail: "Lasersko graviranje pločica i privjesaka, prema starijim javnim opisima.", kind: "engrave" },
  ],
} as const;
