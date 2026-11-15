"use client";
import { useEffect, useState } from "react";
import { business } from "../business";
import { Arrow } from "./Arrow";
export function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => { const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); }; window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey); }, []);
  const close = () => setOpen(false);
  return <><div className="demo-banner">NEZVANICNI DEMONSTRACIJSKI KONCEPT <span>- PODACI I USLUGE CEKAJU POTVRDU RADNJE</span></div><header className="header shell"><a className="brand" href="#pocetna" onClick={close} aria-label="Svjetlost Graf, pocetna"><span className="brand-symbol">S<span>G</span></span><span>SVJETLOST<br/>GRAF<small> DIGITALNA STAMPARIJA</small></span></a><nav id="primary-nav" className={open ? "nav open" : "nav"} aria-label="Glavna navigacija"><a href="#usluge" onClick={close}>Usluge</a><a href="#uvez" onClick={close}>Uvez radova</a><a href="#kontakt" onClick={close}>Kontakt</a><a className="nav-call" href={business.phoneHref} onClick={close}>Pozovi <Arrow diagonal/></a></nav><button className="menu-toggle" type="button" aria-expanded={open} aria-controls="primary-nav" aria-label={open ? "Zatvori meni" : "Otvori meni"} onClick={() => setOpen(!open)}><span/><span/></button></header></>;
}

