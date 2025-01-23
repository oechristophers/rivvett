import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import React from 'react';

const SelectFilter = ({ value, onValueChange, options, placeholder, name }) => (
  <Select name={name} onValueChange={onValueChange} value={value}>
    <SelectTrigger className=" border-x-0 h-12 rounded-none shadow-none focus:outline-none outline-none focus:ring-0 w-[18%] border-y-2  ">
      <SelectValue placeholder={placeholder} />
    </SelectTrigger>
    <SelectContent>
      <SelectItem>{placeholder}</SelectItem>
      {options.map((option, index) => (
        <SelectItem key={index} value={option.value}>
          {option.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

export default SelectFilter;
