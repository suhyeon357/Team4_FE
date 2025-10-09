import { useQuery } from '@tanstack/react-query';
import { DiariesAPI } from '@/api/diaries';

export const useDiaryDetail = (id: number) => {
  return useQuery({
    queryKey: ['diary', id],
    queryFn: () => DiariesAPI.getDiary(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
