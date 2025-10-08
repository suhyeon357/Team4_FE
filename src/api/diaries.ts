import { http } from '@/lib/http';
import type { EmotionEnum } from '@/api/types';

// 요청 타입 (일기 생성 시 보낼 데이터)
export type CreateDiaryRequest = {
  emotion: EmotionEnum;
  content: string;
};

// 응답 타입 (서버가 반환하는 데이터)
export type DiaryResponse = {
  id: number;
  emotion: EmotionEnum;
  content: string;
  feedback: string;
  createdAt: string;
};

export const DiariesAPI = {
  createDiary: async (data: CreateDiaryRequest): Promise<DiaryResponse> => {
    const res = await http.post('/api/diaries', data);
    return res.data;
  },

  getDiary: async (id: number): Promise<DiaryResponse> => {
    const res = await http.get(`/api/diaries/${id}`);
    return res.data;
  },
};
