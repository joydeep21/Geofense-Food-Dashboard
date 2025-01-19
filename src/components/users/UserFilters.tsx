import React from 'react';
import { Search } from 'lucide-react';
import { UserFilters } from '../../types/user';

interface UserFiltersProps {
  filters: UserFilters;
  onFilterChange: (filters: UserFilters) => void;
}

const UserFilters = ({ filters, onFilterChange }: UserFiltersProps) => {
  const roles = ['All', 'admin', 'seller'];
  const statuses = ['All', 'active', 'inactive'];
  const sortOptions = [
    { value: 'name-asc', label: 'Name (A-Z)' },
    { value: 'name-desc', label: 'Name (Z-A)' },
    { value: 'recent', label: 'Most Recent' },
    { value: 'oldest', label: 'Oldest' },
  ];

  const handleChange = (key: keyof UserFilters, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search users..."
            value={filters.search}
            onChange={(e) => handleChange('search', e.target.value)}
            className="pl-10 w-full rounded-md border-gray-200 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          />
        </div>

        <select
          value={filters.role}
          onChange={(e) => handleChange('role', e.target.value)}
          className="rounded-md border-gray-200 shadow-sm focus:border-orange-500 focus:ring-orange-500"
        >
          {roles.map((role) => (
            <option key={role} value={role.toLowerCase()}>
              {role}
            </option>
          ))}
        </select>

        <select
          value={filters.status}
          onChange={(e) => handleChange('status', e.target.value)}
          className="rounded-md border-gray-200 shadow-sm focus:border-orange-500 focus:ring-orange-500"
        >
          {statuses.map((status) => (
            <option key={status} value={status.toLowerCase()}>
              {status}
            </option>
          ))}
        </select>

        <select
          value={filters.sortBy}
          onChange={(e) => handleChange('sortBy', e.target.value)}
          className="rounded-md border-gray-200 shadow-sm focus:border-orange-500 focus:ring-orange-500"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};