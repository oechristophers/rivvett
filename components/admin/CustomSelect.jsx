import Select from 'react-select';

const customTheme = (theme) => ({
    ...theme,
    colors: {
      ...theme.colors,
      primary: '#8d3ee1be',  // Focus border color and selected option
      primary25: 'lightgray',  // Hover background color for options
      primary50: '#8d3ee1be',  // Selected option background color
      neutral0: 'white',  // Background color for select dropdown
      neutral80: '#8d3ee1be',  // Text color for dropdown
    },
  });
const CustomSelect = ({ setFeaturedProducts,items, featuredProducts }) => {
    const options = items.map(p => ({
        value: p._id,
        label: p.title
      }));
      
      const customStyles = {
        option: (provided,state) => ({
          ...provided,
          color: 'white', // White text color when not selected (default)
          backgroundColor: state.isSelected
          ? '#8d3ee1be' // Purple background when clicked (selected)
          : state.isFocused
          ? 'purple' // Light gray background when focused (hovered)
          : 'black', // White background when not selected or focused
        }),
        multiValue: (provided) => ({
            ...provided,
            backgroundColor: '#8d3ee1be',  // Purple background for selected pill
            color: 'white',  // White text color for selected pill
            borderRadius: '20px',  // Rounded pill shape
            padding: '5px',  // Padding for the pill
          }),
          multiValueLabel: (provided) => ({
            ...provided,
            color: 'white',  // Text color inside the pill
          }),
        control: (provided) => ({
          ...provided,
          backgroundColor: 'transparent', // Border color for the select box
          border:'1px solid #d8b4fe43',
          
        }),
      };

      const selectedOptions = options.filter(option => featuredProducts.includes(option.value));
      
  return (
    <Select
      isMulti
      options={items.length > 0 && options}
      value={selectedOptions}
      styles={customStyles}
      theme={customTheme}
      onChange={(selectedOptions) => {
        const selectedValues = selectedOptions ? selectedOptions.map(option => option.value) : [];
        setFeaturedProducts(selectedValues);  // Add new selections to existing products
      }}
    />
  );
};

export default CustomSelect;
