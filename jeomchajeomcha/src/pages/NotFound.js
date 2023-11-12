import React from "react";
import styled from "styled-components";
import NotFoundImg from "../assets/img/404.png";
import Logo from "../assets/img/점차점차로고.svg";

function NotFound() {
  return (
    <NotFoundContainer>
      <MainLogo src={Logo} alt="점차점차 로고" />
      <Header>404 Not Found</Header>
      <Description>
        요청하신 페이지를 찾을 수 없습니다.
        <br />
        입력하신 주소가 정확한지 다시 한번 확인해주세요.
      </Description>
      <NotFoundImage src={NotFoundImg} alt="404 Not Found" />
    </NotFoundContainer>
  );
}

export default NotFound;

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw; // 100% of the viewport width
  height: 100vh; // 100% of the viewport height
  text-align: center;
  background-color: ${({ theme }) => theme.colors.black};
`;

const Header = styled.h1`
  font-family: ${({ theme }) => theme.typography.header1.fontFamily};
  font-weight: ${({ theme }) => theme.typography.header1.fontWeight};
  font-size: ${({ theme }) => theme.typography.header1.fontSize};
  color: ${({ theme }) => theme.colors.backgroundWhite};
`;

const Description = styled.body`
  margin-top: 10px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.backgroundWhite};
`;

const NotFoundImage = styled.img`
  width: auto;
  height: auto;
  border-radius: 200px;
`;

const MainLogo = styled.img`
    width: 300px;
    height: auto;
    `;