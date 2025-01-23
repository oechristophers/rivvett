import FiltersContainer from './FiltersContainer';
import SelectFilter from './SelectFilter';

const MobileFilters = ({ query, handleFilterChange, toggleSidebar }) => (
  <FiltersContainer className="grid grid-cols-2 md:hidden bg-[#cac8c8] divide-x-2 py-2 divide-[#0000001e] ">
    <div style={{ fontFamily: 'Futura Std Book', letterSpacing: 0.9 }}>
      <SelectFilter
        name="sort"
        value={query.sort || ''}
        onValueChange={(value) => handleFilterChange(value, 'sort')}
        options={[
          { value: 'price-asc', label: 'Price: Low to High' },
          { value: 'price-desc', label: 'Price: High to Low' }
        ]}
        placeholder="Sort"
      />
    </div>
    <button
      className="py-3"
      onClick={toggleSidebar} 
      style={{ fontFamily: 'Futura Std Book', letterSpacing: 0.9 }}
    >
      Filter
    </button>
  </FiltersContainer>
);

export default MobileFilters;
