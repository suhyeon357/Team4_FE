// 월간표정
import { useMemo } from 'react';
import styled from '@emotion/styled';
import { FiChevronUp } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import formatKRDate from './constants/formatKRDate';
import { ROUTES } from '@/constants/routes';
import theme from '@/styles/theme';
import { useDiaryDetail } from './hooks/useDiaryDetail';

const DateText = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.colorScale.gray900};
  font-size: ${({ theme }) => theme.spacing[6]};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const Container = styled.div`
  background: ${({ theme }) => theme.colors.colorScale.brown100};
  padding: ${({ theme }) => theme.spacing[4]};
  border-radius: ${({ theme }) => theme.spacing[3]};
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
`;

const Title = styled.div`
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.spacing[3]};
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

const Cell = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const DayNumber = styled.small`
  margin-top: ${({ theme }) => theme.spacing[1]};
  font-size: ${({ theme }) => theme.spacing[3]};
`;

const ToggleButton = styled.button`
  margin-top: ${({ theme }) => theme.spacing[4]};
  width: 100%;
  padding: ${({ theme }) => theme.spacing[1]};
  border: none;
  background: none;
  font-size: ${({ theme }) => theme.spacing[5]};
  cursor: pointer;
`;

const DayCircle = styled.div<{ hasEmotion?: boolean }>`
  width: ${({ theme }) => theme.spacing[7]};
  height: ${({ theme }) => theme.spacing[7]};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 4px;
  cursor: pointer;

  /* 표정이 없는 경우 (빈 칸) */
  background-color: ${({ hasEmotion, theme }) =>
    hasEmotion ? 'transparent' : theme.colors.colorScale.brown200};

  /* 표정이 있는 경우 */
  ${({ hasEmotion, theme }) =>
    hasEmotion &&
    `
      border: 2px solid ${theme.colors.colorScale.brown400};
      background-color: ${theme.colors.colorScale.brown100};
    `}
`;

const WeekHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  color: ${({ theme }) => theme.colors.colorScale.gray1000};
`;

function DiariesDetail() {
  const navigate = useNavigate();
  const todayKR = useMemo(() => formatKRDate(new Date()), []);
  const today = useMemo(() => new Date(), []);

  const year = today.getFullYear();
  const month = today.getMonth() + 1; // 0부터 시작하므로 +1

  const { id } = useParams();
  const diaryId = Number(id);

  const { data: diary, isLoading, isError } = useDiaryDetail(diaryId);

  if (isLoading) return <div>로딩 중...</div>;
  if (isError || !diary) return <div>피드백메시지를 불러올 수 없습니다.</div>;

  const totalDays = useMemo(() => new Date(year, month, 0).getDate(), [year, month]);
  const days = ['일', '월', '화', '수', '목', '금', '토'];

  const firstDayOfMonth = useMemo(() => new Date(year, month - 1, 1).getDay(), [year, month]);

  const gotoWeekly = () => {
    navigate(`/${ROUTES.DIARIES}/${diaryId}`);
  };

  return (
    <>
      <DateText>{todayKR}</DateText>
      <Container>
        <Title>월간 표정</Title>
        <WeekHeader>
          {days.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </WeekHeader>
        <CalendarGrid>
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <Cell key={`empty-${i}`} />
          ))}
          {Array.from({ length: totalDays }, (_, i) => {
            const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(i + 1).padStart(2, '0')}`;
            const hasEmotion = !!diary.emotion;
            return (
              <Cell key={dateStr}>
                <DayCircle hasEmotion={hasEmotion}>{diary.emotion || ''}</DayCircle>
                <DayNumber>{i + 1}</DayNumber>
              </Cell>
            );
          })}
        </CalendarGrid>
        <ToggleButton onClick={gotoWeekly}>
          <FiChevronUp size={parseInt(theme.spacing[6])} />
        </ToggleButton>
      </Container>
    </>
  );
}

export default DiariesDetail;
