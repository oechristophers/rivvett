import SelectFilter from './SelectFilter';
import SidebarContainer from './SidebarContainer';

const FiltersSidebar = ({ query, handleFilterChange, categories, genders, properties, clearFilters,isSidebarOpen }) => (
  <SidebarContainer isOpen={isSidebarOpen}>
    <div className="flex justify-between items-center p-4 border-b">
      <h2 className="text-lg font-bold">Filters</h2>
      <button
        onClick={clearFilters}
        className="text-gray-500 hover:text-gray-700"
      >
        Clear
      </button>
    </div>
    <div className="p-4">
      <SelectFilter
        name="category"
        value={query.category || ''}
        onValueChange={(value) => handleFilterChange(value, 'category')}
        options={categories.map(category => ({ value: category._id, label: category.name }))}
        placeholder="Category"
      />
      <SelectFilter
        name="gender"
        value={query.gender || ''}
        onValueChange={(value) => handleFilterChange(value, 'gender')}
        options={genders.map(gender => ({ value: gender._id, label: gender.name }))}
        placeholder="Gender"
      />
      <SelectFilter
        name="color"
        value={query.color || ''}
        onValueChange={(value) => handleFilterChange(value, 'color')}
        options={properties.color.map(color => ({ value: color, label: color }))}
        placeholder="Color"
      />
      <SelectFilter
        name="size"
        value={query.size || ''}
        onValueChange={(value) => handleFilterChange(value, 'size')}
        options={properties.size.map(size => ({ value: size, label: `US Size ${size}` }))}
        placeholder="Size"
      />
      <button className="h-12 text-center bg-black text-white w-full">
        Apply
      </button>
    </div>
  </SidebarContainer>
);

export default FiltersSidebar;
