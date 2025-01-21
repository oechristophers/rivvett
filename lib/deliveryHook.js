import { useEffect } from 'react';

function useDeliveryUpdates() {
  useEffect(() => {
    const interval = setInterval(() => {
      fetch('/api/frontend/updateDelivery', { method: 'POST' })
        .then((res) => res.json())
        .then((data) => {
          console.log('Updated delivery statuses:', data.updatedOrders);
        })
        .catch((err) => console.error('Error updating delivery:', err));
    }, 60000); // Every 1 minute

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);
}

export default useDeliveryUpdates;
