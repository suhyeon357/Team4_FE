import {
  AddPill,
  MissionItem,
  MissionList,
  Section,
  SectionHeader,
  SectionTitle,
} from '../Missions.styles';
import { useQuery } from '@tanstack/react-query';
import { getMissions } from '@/api/missions';

type MissionListSectionProps = {
  onClickAdd: () => void;
};

const MissionListSection = ({ onClickAdd }: MissionListSectionProps) => {
  const {
    data: missions = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['missions'],
    queryFn: getMissions,
  });

  if (isLoading) return <Section>로딩중...</Section>;
  if (isError) return <Section>에러: {(error as Error).message}</Section>;

  return (
    <Section>
      <SectionHeader>
        <SectionTitle>미션 리스트</SectionTitle>
        <AddPill onClick={onClickAdd}>미션 추가</AddPill>
      </SectionHeader>
      <MissionList>
        {missions.map((m) => (
          <MissionItem key={m.id}>{m.content}</MissionItem>
        ))}
      </MissionList>
    </Section>
  );
};

export default MissionListSection;
