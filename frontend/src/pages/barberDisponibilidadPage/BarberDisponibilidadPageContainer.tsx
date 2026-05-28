import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { getBarberSchedules, setBarberSchedules } from '../../api/client';
import { BarberSchedule } from '../../api/types';
import BarberDisponibilidadPageView from './BarberDisponibilidadPageView';
import { DaySchedule } from './types';

const DAY_NAMES: Record<number, string> = {
  1: 'Lunes',
  2: 'Martes',
  3: 'Miércoles',
  4: 'Jueves',
  5: 'Viernes',
  6: 'Sábado',
  7: 'Domingo',
};

const buildDays = (schedules: BarberSchedule[]): DaySchedule[] =>
  [1, 2, 3, 4, 5, 6, 7].map((dow) => {
    const existing = schedules.find((s) => s.day_of_week === dow);
    return {
      dayOfWeek: dow,
      dayName: DAY_NAMES[dow],
      enabled: !!existing,
      startTime: existing ? existing.start_time.slice(0, 5) : '08:00',
      endTime: existing ? existing.end_time.slice(0, 5) : '18:00',
    };
  });

const BarberDisponibilidadPageContainer: React.FC = () => {
  const authContext = useContext(AuthContext);
  const barberId = authContext?.user?.barber_id;

  const [days, setDays] = useState<DaySchedule[]>(buildDays([]));
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const load = useCallback(async () => {
    if (!barberId) return;
    try {
      setLoading(true);
      const response = await getBarberSchedules(barberId);
      setDays(buildDays(response.data));
    } catch {
      setError('No se pudo cargar el horario.');
    } finally {
      setLoading(false);
    }
  }, [barberId]);

  useEffect(() => {
    load();
  }, [load]);

  const handleToggleDay = (dayOfWeek: number) => {
    setDays((prev) =>
      prev.map((d) => (d.dayOfWeek === dayOfWeek ? { ...d, enabled: !d.enabled } : d)),
    );
  };

  const handleChangeTime = (
    dayOfWeek: number,
    field: 'startTime' | 'endTime',
    value: string,
  ) => {
    setDays((prev) =>
      prev.map((d) => (d.dayOfWeek === dayOfWeek ? { ...d, [field]: value } : d)),
    );
  };

  const handleSave = async () => {
    if (!barberId) return;
    setSaving(true);
    setError(null);
    setSuccess(false);
    try {
      const payload = days
        .filter((d) => d.enabled)
        .map((d) => ({
          day_of_week: d.dayOfWeek,
          start_time: `${d.startTime}:00`,
          end_time: `${d.endTime}:00`,
        }));
      await setBarberSchedules(barberId, payload);
      setSuccess(true);
    } catch {
      setError('No se pudo guardar el horario. Verifica los datos.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <BarberDisponibilidadPageView
      days={days}
      loading={loading}
      saving={saving}
      error={error}
      success={success}
      onToggleDay={handleToggleDay}
      onChangeTime={handleChangeTime}
      onSave={handleSave}
      onClearMessages={() => {
        setError(null);
        setSuccess(false);
      }}
    />
  );
};

export default BarberDisponibilidadPageContainer;
