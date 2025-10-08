import { http } from '@/lib/http';
import type { Mission } from './types';

export const getMissions = async (): Promise<Mission[]> => {
  const res = await http.get<{ content: Mission[] }>('/api/missions');
  return res.data.content;
};

export const completeMission = async (missionId: number) => {
  const res = await http.patch(`/api/missions/${missionId}/complete`);
  return res.data;
};
