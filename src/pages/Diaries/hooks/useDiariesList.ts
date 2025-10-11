import { useQuery } from '@tanstack/react-query';
import { DiariesAPI } from '@/api/diaries';
import type { DiaryResponse } from '@/api/types';

export const useDiariesList = () => {
  return useQuery<DiaryResponse[]>({
    queryKey: ['diaries'],
    queryFn: () => DiariesAPI.getAllDiaries(),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
