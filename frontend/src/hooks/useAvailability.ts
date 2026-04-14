import { useState, useCallback } from 'react';
import { getBarberAvailability } from '../api/client';
import { Slot } from '../api/types';

export function useAvailability() {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAvailability = useCallback(async (barberId: number, date: string, serviceId: number) => {
    try {
      setLoading(true);
      setError(null);
      const response = await getBarberAvailability(barberId, date, serviceId);
      setSlots(response.data.available_slots || []);
    } catch (err) {
      setError('Error al cargar la disponibilidad.');
      setSlots([]);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearSlots = useCallback(() => {
    setSlots([]);
    setError(null);
  }, []);

  return { slots, loading, error, fetchAvailability, clearSlots };
}
