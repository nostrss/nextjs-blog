import useLoginCheck from '@/hooks/useLoginCheck';
import styled from '@emotion/styled';

export const WrapperHeader = styled.div`
  width: 100%;
  border: 1px solid green;
  @media (max-width: 768px) {
    background-color: red;
    color: #fff;
  }
`;

export default function Header() {
  const userData = useLoginCheck();

  return (
    <WrapperHeader>
      <h1>헤더입니다</h1>
      {userData?.email}
    </WrapperHeader>
  );
}
