import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '../ui/Input';

export function EmployeeSearch({ searchQuery, setSearchQuery }) {
  return (
    <div className="w-full max-w-md">
      <Input
        icon={Search}
        placeholder="Search by name, position, email, location..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        clearable
        onClear={() => setSearchQuery('')}
      />
    </div>
  );
}
