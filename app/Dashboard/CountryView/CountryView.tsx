"use client"
import { useState, useRef, Dispatch, SetStateAction } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import type { Country } from "../Dashboard";

type CountryViewProps = {
  selected: Country[]
  setSelected: Dispatch<SetStateAction<Country[]>>;
}
type ToolTipType = {
  x: number;
  y: number;
  text: string;
  visible: boolean;
}

export default function CountryView({ selected, setSelected }: CountryViewProps) {
  const [tooltip, setTooltip] = useState<ToolTipType>({ x: 0, y: 0, text: "", visible: false });

  const hoverTimerRef = useRef<number | null>(null);
  const lastMouseRef = useRef({ x: 0, y: 0, text: "" });

  function clearHoverTimer() {
    if (hoverTimerRef.current !== null) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  }

  function handleMouseMove(e: React.MouseEvent, countryName: string) {
    lastMouseRef.current = {
      x: e.clientX,
      y: e.clientY,
      text: countryName,
    };

    clearHoverTimer();

    setTooltip((prev) =>
      prev.visible ? { ...prev, visible: false } : prev
    );

    hoverTimerRef.current = window.setTimeout(() => {
      const { x, y, text } = lastMouseRef.current;

      setTooltip({
        visible: true,
        text,
        x,
        y,
      });
    }, 400);
  }

  function handleMouseLeave() {
    clearHoverTimer();
    setTooltip((prev) =>
      prev.visible ? { ...prev, visible: false } : prev
    );
  }

  return (
    <>
      <div className="flex flex-col gap-10">
        <div className="px-10 py-3 bg-blue-900/30 text-blue-200 font-semibold">
            Country List
          </div>
        {selected?.map((country: Country) => {
          return (
            <div
              key={country.cca3}
              className="group flex gap-5"
              onMouseMove={(e) => handleMouseMove(e, country.name.common)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="relative">
                <img
                  src={country?.flags.svg}
                  className="w-60 h-40 object-cover"
                />

                <IoMdCloseCircle
                  onClick={() => {
                    clearHoverTimer();
                    setTooltip((prev: ToolTipType) => ({ ...prev, visible: false }));
                    setSelected((prev: Country[]) => {
                      return prev.filter((el: Country) => el.cca3 !== country.cca3)
                    })
                  }}
                  className="absolute top-1 right-1
                rounded-full w-7 h-7 flex items-center justify-center text-black
                opacity-0 group-hover:opacity-100 transition cursor-pointer"/>
              </div>
              <div className="flex flex-col gap-2 py-5">
                <div>{country.name.official}</div>
                <div>Capital: {country.capital[0]}</div>
                <div>Population: {country.population.toLocaleString()}</div>
                <div>Languages: {Object.values(country.languages || {}).join(", ")}</div>
              </div>
            </div>
          )
        })}


      </div>
      {tooltip.visible && (
        <div
          className="fixed px-2 py-1 text-xs rounded bg-black text-white pointer-events-none whitespace-nowrap"
          style={{
            top: tooltip.y,
            left: tooltip.x,
            transform: "translate(-100%, 0px)", // adjust below
          }}
        >
          {tooltip.text}
        </div>
      )}
    </>
  )
}