import type { ITEMS_CATEGORY } from '@/constants/api';

export type CategoryEnum = 'REFRESH' | 'EMPLOYMENT' | 'DAILY';

export type EmotionEnum = 'EXCELLENT' | 'GOOD' | 'SOSO' | 'BAD' | 'TERRIBLE' | 'NONE';

export type Emotion = {
  key: EmotionEnum;
  label: string;
  emoji: string;
};

export type ItemCategoryEnum = (typeof ITEMS_CATEGORY)[keyof typeof ITEMS_CATEGORY];

export type Mission = {
  id: number;
  content: string;
  category: CategoryEnum;
};

export type Plan = {
  id: number;
  content: string;
  category: CategoryEnum;
};

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

export type StoreItem = {
  id: number;
  category: ItemCategoryEnum;
  name: string;
  price: number;
  imageUrl: string;
  isOwned: boolean;
};

export type OwnedItem = {
  id: number;
  category: ItemCategoryEnum;
  name: string;
  imageUrl: string;
  offsetX: number;
  offsetY: number;
  isUsed: boolean;
};

export type Cat = {
  name: string;
  equipped: {
    imageUrl: string;
    offsetX: number;
    offsetY: number;
  };
};

export type OnboardingTest = {
  id: number;
  question: string;
  answers: string[];
  imageUrl: string;
};

export type AnswerType = {
  questionId: number;
  choiceIndex: number;
};

export type LoginRes = { accessToken: string; refreshToken: string };
