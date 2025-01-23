import { useToast } from '@/hooks/use-toast';
import axios from 'axios';

const { createContext, useState, useEffect } = require('react');

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [favItems, setFavItems] = useState([]);
  const [itemProps, setItemProps] = useState({}); // Manage properties (color, size) per item
  const [selectedSizes, setSelectedSizes] = useState({});
  const [clength, setCLength] = useState(0);
  const { toast } = useToast();
  // Load cart and item properties from localStorage when component mounts
  const handleSizeChange = (itemId, newSize) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, size: newSize } : item,
      ),
    );
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage) {
      const savedCartItems = localStorage.getItem('cartItems');
      const savedItemProps = localStorage.getItem('itemProps');

      if (savedCartItems) {
        setCartItems(JSON.parse(savedCartItems));
        setCLength(cartItems.length);
      }
      if (savedItemProps) setItemProps(JSON.parse(savedItemProps));
    }
  }, []);

  // Persist cart items in localStorage whenever cartItems change
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      setCLength(cartItems.length);
    }
  }, [cartItems]);

  // Persist item properties in localStorage whenever itemProps change
  useEffect(() => {
    if (Object.keys(itemProps).length > 0) {
      localStorage.setItem('itemProps', JSON.stringify(itemProps));
    }
  }, [itemProps]);

  // Add item to the cart and associate color and size if provided
  function addItem(itemId, color = null, size = null) {
    const uniqueItemId = `${itemId}-${color || 'noColor'}-${size || 'noSize'}`;
    // Add the unique item ID to the cart
    setCartItems((prev) => [...prev, uniqueItemId]);

    if (color || size) {
      setItemProps((prevProps) => ({
        ...prevProps,
        [uniqueItemId]: {
          ...prevProps[uniqueItemId], // Retain any existing properties (like quantity)
          color: color || prevProps[uniqueItemId]?.color || 'noColor',
          size: size || prevProps[uniqueItemId]?.size || 'noSize',
          quantity: (prevProps[uniqueItemId]?.quantity || 0) + 1,
        },
      }));
      setCLength(cartItems.length + 1);
    }
  }

  async function addFavourite(itemId, color = null, size = null) {
    const uniqueItemId = `${itemId}-${color || 'noColor'}-${size || 'noSize'}`;
    const baseId = itemId;

    try {
      // Make API call to update the favorites on the server
      const response = await axios.post('/api/frontend/favourites', {
        baseId,
        color,
        size,
      });

      if (response.status === 200) {
        toast({
          title: 'Item added to Favorites',
        });
        console.log('Favorite updated successfully:', response.data);
      } else {
        console.error('Failed to update favorite:', response.data);
      }
    } catch (error) {
      toast({
        title: 'Log in to keep your "Precious" 😊 ',
      });
      console.error('Error updating favorite:', error.message);
    }
  }

  // Remove an item based on its unique identifier
  function removeItem(uniqueItemId, itemQuant, itemProp) {
    setCartItems((prev) => {
      const index = prev.indexOf(uniqueItemId); // Find the first occurrence of the uniqueItemId
      if (itemQuant < 2 && index > -1) {
        const updatedCart = [...prev];
        updatedCart.splice(index, 1); // Remove only one occurrence of the uniqueItemId
        localStorage.setItem('cartItems', JSON.stringify(updatedCart));
        return updatedCart;
      }
      return prev;
    });

    setItemProps((prevProps) => {
      // const remainingItems = cartItems.filter((item) => item === uniqueItemId).length;

      // If there are no more items with this uniqueItemId, remove its associated props
      if (itemQuant <= 1) {
        const updatedProps = { ...prevProps };
        delete updatedProps[uniqueItemId];

        // Update localStorage with the new itemProps state
        localStorage.setItem('itemProps', JSON.stringify(updatedProps));

        return updatedProps;
      }

      return prevProps;
    });
  }

  // Remove all instances of an item and its associated properties
  function removeWholeItem(itemId) {
    const updatedCart = cartItems.filter((item) => item !== itemId);

    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));

    setItemProps((prevProps) => {
      const updatedProps = { ...prevProps };
      delete updatedProps[itemId];
      return updatedProps;
    });
    setCLength(
      cartItems.length - cartItems.filter((item) => item === itemId).length,
    );
  }

  // Clear the entire cart and associated item properties
  function clearCart() {
    setCartItems([]);
    setItemProps({});
    localStorage.removeItem('cartItems');
    localStorage.removeItem('itemProps');
  }
  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addItem,
        removeItem,
        clearCart,
        removeWholeItem,
        itemProps,
        setItemProps,
        clength,
        setCLength,
        addFavourite,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
