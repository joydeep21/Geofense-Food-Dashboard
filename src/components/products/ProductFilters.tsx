import React from 'react';
import { Search } from 'lucide-react';
import { ProductFilters } from '../../types/product';

interface ProductFiltersProps {
  filters: ProductFilters;
  onFilterChange: (filters: ProductFilters) => void;
}

const ProductFilters = ({ filters, onFilterChange }: ProductFiltersProps) => {
  const categories = ['All', 'Pizza', 'Burger', 'Sushi', 'Dessert'];
  const statuses = ['All', 'active', 'inactive'];
  const sortOptions = [
    { value: 'name-asc', label: 'Name (A-Z)' },
    { value: 'name-desc', label: 'Name (Z-A)' },
    { value: 'price-asc', label: 'Price (Low to High)' },
    { value: 'price-desc', label: 'Price (High to Low)' },
  ];

  const handleChange = (key: keyof ProductFilters, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search products..."
            value={filters.search}
            onChange={(e) => handleChange('search', e.target.value)}
            className="pl-10 w-full rounded-md border-gray-200 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          />
        </div>

        <select
          value={filters.category}
          onChange={(e) => handleChange('category', e.target.value)}
          className="rounded-md border-gray-200 shadow-sm focus:border-orange-500 focus:ring-orange-500"
        >
          {categories.map((category) => (
            <option key={category} value={category.toLowerCase()}>
              {category}
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