import styled from '@emotion/styled';

export default function Footer() {
  return (
    <WrapperFooter>
      <h1>푸터입니다</h1>
    </WrapperFooter>
  );
}

export const WrapperFooter = styled.div`
  width: 100%;
  border: 1px solid green;
  @media (max-width: 768px) {
    background-color: red;
    color: #fff;
  }
`;
