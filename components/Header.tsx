"use client";
import { useEffect, useRef, useState } from "react";
import { business } from "../business";
import { Arrow } from "./Arrow";

export function Header() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) { setOpen(false); toggle.current?.focus(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 651px)");
    const reset = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener("change", reset);
    return () => desktop.removeEventListener("change", reset);
  }, []);
  const close = () => setOpen(false);
  return <>
    <div className="demo-banner">NEZVANIČNI DEMONSTRACIJSKI KONCEPT <span>— PODACI I USLUGE ČEKAJU POTVRDU RADNJE</span></div>
    <header className="header shell">
      <a className="brand" href="#pocetna" onClick={close} aria-label="Svjetlost Graf, početna"><span className="brand-symbol">S<span>G</span></span><span>SVJETLOST<br/>GRAF<small> DIGITALNA ŠTAMPARIJA</small></span></a>
      <nav id="primary-nav" className={open ? "nav open" : "nav"} aria-label="Glavna navigacija"><a href="#usluge" onClick={close}>Usluge</a><a href="#uvez" onClick={close}>Uvez radova</a><a href="#kontakt" onClick={close}>Kontakt</a><a className="nav-call" href={business.phoneHref} onClick={close}>Pozovi <Arrow diagonal/></a></nav>
      <button ref={toggle} className="menu-toggle" type="button" aria-expanded={open} aria-controls="primary-nav" aria-label={open ? "Zatvori meni" : "Otvori meni"} onClick={() => setOpen(!open)}><span/><span/></button>
    </header>
  </>;
}
