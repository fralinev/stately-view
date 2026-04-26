"use client"
import { useState, Dispatch, SetStateAction } from "react";
import type { Country } from "../Dashboard";
import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import SortableCountryCard from "@/app/components/SortableCountryCard";


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

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setSelected((items) => {
      const oldIndex = items.findIndex((country) => country.cca3 === active.id);
      const newIndex = items.findIndex((country) => country.cca3 === over.id);

      return arrayMove(items, oldIndex, newIndex);
    });
  }

  return (
    <>
      <div className="flex flex-wrap">
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={selected.map((country) => country.cca3)} strategy={rectSortingStrategy}>
            <div className="flex flex-wrap gap-2">
              {selected.map((country) => (
                <SortableCountryCard key={country.cca3} id={country.cca3} country={country} setSelected={setSelected} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
      
    </>
  )
}