import styled from '@emotion/styled';
export default function Header() {
  return (
    <WrapperHeader>
      <h1>헤더입니다</h1>
    </WrapperHeader>
  );
}

export const WrapperHeader = styled.div`
  width: 100%;
  border: 1px solid green;
  @media (max-width: 768px) {
    background-color: red;
    color: #fff;
  }
`;
