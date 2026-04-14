import { useState, useEffect, useCallback } from 'react';
import { getBarbers } from '../api/client';
import { BarberListItem } from '../api/types';

export function useBarbers() {
  const [barbers, setBarbers] = useState<BarberListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBarbers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getBarbers();
      setBarbers(response.data);
    } catch (err) {
      setError('Error al cargar los barberos.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBarbers();
  }, [fetchBarbers]);

  return { barbers, loading, error, refetch: fetchBarbers };
}
