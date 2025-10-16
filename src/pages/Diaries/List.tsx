// 주간표정
import { useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { FiChevronDown } from 'react-icons/fi';
import formatKRDate from '../../utils/formatKRDate';
import theme from '@/styles/theme';
import { useDiaryEmotions } from './hooks/useDiaryEmotion';
import { useDiariesList } from './hooks/useDiariesList';

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

const WeekRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Day = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1]};
`;

const ToggleButton = styled.button`
  margin-top: ${({ theme }) => theme.spacing[3]};
  width: 100%;
  padding: ${({ theme }) => theme.spacing[1]};
  border: none;
  background: none;
  font-size: ${({ theme }) => theme.spacing[5]};
  cursor: pointer;
`;

const FeedbackDate = styled.p`
  margin-bottom: ${({ theme }) => theme.spacing[3]};
`;

const Message = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius.xs};
  background-color: ${({ theme }) => theme.colors.colorScale.brown400};
`;

const DayCircle = styled.div<{ hasEmotion?: boolean; isSelected?: boolean }>`
  width: ${({ theme }) => theme.spacing[7]};
  height: ${({ theme }) => theme.spacing[7]};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 4px;
  cursor: pointer;
  background-color: ${({ hasEmotion, theme }) =>
    hasEmotion ? 'transparent' : theme.colors.colorScale.brown200};
  ${({ hasEmotion, theme }) =>
    hasEmotion &&
    `
      border: 2px solid ${theme.colors.colorScale.brown400};
      background-color: ${theme.colors.colorScale.brown100};
    `}
  ${({ isSelected, theme }) =>
    isSelected &&
    `
      border: 3px solid ${theme.colors.colorScale.red400};
      background-color: ${theme.colors.colorScale.brown300};
    `}
`;

function DiariesList() {
  const navigate = useNavigate();
  const todayKR = useMemo(() => formatKRDate(new Date()), []);
  const today = useMemo(() => new Date(), []);

  const { data: diaries } = useDiariesList();
  const { records, loading } = useDiaryEmotions();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const selectedDiary = diaries?.find((d) => d.createdAt.split('T')[0] === selectedDate);

  const year = today.getFullYear();
  const month = today.getMonth() + 1; // 0부터 시작하므로 +1
  const date = today.getDate();

  const weekDates = useMemo(() => {
    const current = new Date(year, month - 1, date);
    const dayOfWeek = current.getDay();
    const sunday = new Date(current);
    sunday.setDate(current.getDate() - dayOfWeek);
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(sunday);
      d.setDate(sunday.getDate() + i);
      const y = d.getFullYear();
      const m = `${d.getMonth() + 1}`.padStart(2, '0');
      const day = `${d.getDate()}`.padStart(2, '0');
      return `${y}-${m}-${day}`;
    });
  }, [year, month, date]);

  const days = ['일', '월', '화', '수', '목', '금', '토'];

  const handleSelectDate = (date: string) => {
    setSelectedDate(date);
  };

  const gotoMonthly = () => {
    navigate(`/diaries/:id`);
  };

  if (loading) return <p>로딩 중...</p>;

  return (
    <>
      <DateText>{todayKR}</DateText>
      <Container>
        <Title>주간 표정</Title>
        <WeekRow>
          {days.map((day, idx) => {
            const dateStr = weekDates[idx];
            const emotion = records[dateStr];
            const hasEmotion = !!emotion;
            const isSelected = selectedDate === dateStr;

            return (
              <Day key={day}>
                <div>{day}</div>
                <DayCircle
                  hasEmotion={hasEmotion}
                  isSelected={isSelected}
                  onClick={() => handleSelectDate(dateStr)}
                >
                  {emotion ? emotion : ''}
                </DayCircle>
                <small>{dateStr.slice(-2)}</small>
              </Day>
            );
          })}
        </WeekRow>
        <ToggleButton onClick={gotoMonthly}>
          <FiChevronDown size={parseInt(theme.spacing[6])} />
        </ToggleButton>
      </Container>
      <br />
      {/* 피드백 메시지 */}
      {selectedDiary ? (
        <Container>
          <FeedbackDate>{formatKRDate(new Date(selectedDiary.createdAt))}</FeedbackDate>
          <Message>{selectedDiary.feedback || '피드백이 없습니다.'}</Message>
        </Container>
      ) : (
        selectedDate && <p style={{ textAlign: 'center' }}>이 날의 일기가 없습니다.</p>
      )}
    </>
  );
}

export default DiariesList;
