import { http } from '@/lib/http';
import type { CreateDiaryRequest, DiaryResponse } from '@/api/types';

export const DiariesAPI = {
  createDiary: async (data: CreateDiaryRequest): Promise<DiaryResponse> => {
    const res = await http.post('/api/diaries', data);
    return res.data;
  },

  getDiary: async (id: number): Promise<DiaryResponse> => {
    const res = await http.get(`/api/diaries/${id}`);
    return res.data;
  },

  getAllDiaries: async (): Promise<DiaryResponse[]> => {
    const res = await http.get('/api/diaries');
    return res.data;
  },
};
