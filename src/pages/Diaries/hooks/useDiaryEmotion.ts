import type { EmotionEnum } from '@/api/types';
import { useDiariesList } from './useDiariesList';

const emotionMap: Record<EmotionEnum, string> = {
  EXCELLENT: '😊',
  GOOD: '😀',
  SOSO: '😐',
  BAD: '😢',
  TERRIBLE: '😡',
  NONE: '',
};

export type EmotionRecord = {
  [date: string]: string;
};

export const useDiaryEmotions = () => {
  const { data, isLoading, isError } = useDiariesList();

  const records: EmotionRecord =
    data?.reduce((acc: EmotionRecord, diary) => {
      const date = diary.createdAt.split('T')[0];
      acc[date] = emotionMap[diary.emotion];
      return acc;
    }, {}) || {};

  return {
    records,
    loading: isLoading,
    error: isError,
  };
};
