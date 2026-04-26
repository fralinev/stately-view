import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState, useRef } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import type { Country } from "../Dashboard/Dashboard";


type ToolTipType = {
  x: number;
  y: number;
  text: React.ReactNode | null;
  visible: boolean;
}
type ToolTipContent = {
  x: number;
  y: number;
  text: React.ReactNode | null;
}


export default function SortableCountryCard({ id, country, setSelected }: any) {
  const [tooltip, setTooltip] = useState<ToolTipType>({ x: 0, y: 0, text: null, visible: false });

  const hoverTimerRef = useRef<number | null>(null);
  const lastMouseRef = useRef<ToolTipContent>({ x: 0, y: 0, text: null });

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  function clearHoverTimer() {
    if (hoverTimerRef.current !== null) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  }

  function handleMouseMove(e: React.MouseEvent, countryDetails: React.ReactNode) {
    lastMouseRef.current = {
      x: e.clientX,
      y: e.clientY,
      text: (
        <div className="flex flex-col gap-1">
          <div className="font-semibold">{country.name.official}</div>
          <div>Capital: {country.capital[0]}</div>
          <div>Population: {country.population.toLocaleString()}</div>
          <div>
            Languages: {Object.values(country.languages || {}).join(", ")}
          </div>
        </div>
      ),
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
    }, 200);
  }

  function handleMouseLeave() {
    clearHoverTimer();
    setTooltip((prev) =>
      prev.visible ? { ...prev, visible: false } : prev
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="group relative border border-blue-500/30 bg-blue-900/30 p-6 text-blue-100"
    >
      <div
        onMouseMove={(e) => handleMouseMove(e, country.name.official)}
        onMouseLeave={handleMouseLeave}
        className="">
        <img
          src={country?.flags.svg}
          {...listeners}
          className="w-24 object-cover cursor-grab"
        />

        <IoMdCloseCircle
          onClick={() => {
            clearHoverTimer();
            setTooltip((prev: ToolTipType) => ({ ...prev, visible: false }));
            setSelected((prev: Country[]) => {
              return prev.filter((el: Country) => el.cca3 !== country.cca3)
            })
          }}
          className="absolute top-0 right-0 w-6 h-6 opacity-0 group-hover:opacity-100 transition cursor-pointer"/>
      </div>
      {tooltip.visible && (
        <div
          className="fixed z-10 px-2 py-1 text-xs rounded bg-black text-white pointer-events-none whitespace-nowrap"
          style={{
            top: tooltip.y,
            left: tooltip.x,
            transform: "translate(-100%, 0px)",
          }}
        >
          {tooltip.text}
        </div>
      )}
    </div>
  );
}