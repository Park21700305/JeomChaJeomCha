import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const PurchaseBlock = ({ book, id, handleFocus, handleBlur }) => {
  return (
    <div style={{ width: "100vw", padding: "0 240px" }}>
      <Link
        to={`/search/${book.id - 1}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <Block>
          <Row>
            <Circle>
              <Body
                style={{ color: "black" }}
                tabIndex={0}
                onFocus={handleFocus}
                onBlur={handleBlur}
              >
                {id}
              </Body>
            </Circle>
            <div style={{ width: "24px" }} />
            <Body
              style={{ fontSize: "30px" }}
              tabIndex={0}
              onFocus={handleFocus}
              onBlur={handleBlur}
            >
              {book.title}
            </Body>
          </Row>
          <div style={{ height: "8px" }} />
          <Row>
            <div style={{ width: "60px" }} />
            <BodyReg tabIndex={0} onFocus={handleFocus} onBlur={handleBlur}>
              과목 | {book.subject}&nbsp; &nbsp;발행일 | {book.publishDate}
              &nbsp; &nbsp;저자 | {book.author}
            </BodyReg>
          </Row>
          <div style={{ height: "25px" }} />
          <ButtonBar>
            <SubTitle tabIndex={0} onFocus={handleFocus} onBlur={handleBlur}>
              인쇄비 {book.price?.toLocaleString()}원
            </SubTitle>
          </ButtonBar>
        </Block>
      </Link>
    </div>
  );
};

export default PurchaseBlock;

const Block = styled.div`
  width: 100%;
  flex-shrink: 0;
  border-radius: 20px;
  background: ${({ theme }) => theme.colors.black};
  padding: 25px 30px;
  overflow: hidden;
  margin: 0 auto;
`;

const ButtonBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-shrink: 0;
`;

const Row = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-shrink: 0;
`;

const Circle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  border-radius: 25px;
  background: ${({ theme }) => theme.colors.white};
  flex-shrink: 0;
`;

const SubTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.subtitle1};
  color: ${({ theme }) => theme.colors.white};
  font-weight: ${({ theme }) => theme.fontWeights.subtitle1};
  white-space: nowrap;
`;

const Body = styled.div`
  font-size: 25px;
  color: ${({ theme }) => theme.colors.white};
  font-weight: ${({ theme }) => theme.fontWeights.body1};
  white-space: nowrap;
`;

const BodyReg = styled.div`
  font-size: 25px;
  color: ${({ theme }) => theme.colors.white};
  font-weight: ${({ theme }) => theme.fontWeights.body1_reg};
  white-space: nowrap;
`;
