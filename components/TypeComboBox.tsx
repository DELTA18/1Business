"use client";

import { useEffect, useState } from "react";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

const businessTypes = [
  "Restaurant", "Cafe", "E-commerce", "Grocery", "Tech Startup", 
  "Clothing Store", "Fitness", "Salon", "Freelancing", "Education", 
  "Event Planning", "Real Estate"
];

interface ComboboxDemoProps {
  value?: string;
  onChange: (value: string) => void;
}

export function ComboboxDemo({ value, onChange }: ComboboxDemoProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          {value || "Select business type"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search business type..." />
          <CommandList>
            {businessTypes.map((type) => (
              <CommandItem
                key={type}
                onSelect={() => {
                  onChange(type); // pass value up
                  setOpen(false); // close popover
                }}
              >
                {type}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
