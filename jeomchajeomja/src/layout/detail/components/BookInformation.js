import React from "react";
import styled from "styled-components";

const BookInformation = ({ book }) => {
  return (
    <>
      <Row>
        <div
          style={{
            borderLeft: "4px solid black",
            height: "240px",
            width: "44px",
          }}
        />
        <Column>
          <Row>
            <SubTitle>제작 제단</SubTitle>
            <SubTitleReg>&nbsp; | &nbsp;{book?.publisher}</SubTitleReg>
          </Row>
          <div style={{ height: "20px" }} />
          <Row>
            <SubTitle>저자</SubTitle>
            <SubTitleReg>&nbsp; | &nbsp;{book?.author}</SubTitleReg>
          </Row>
          <div style={{ height: "20px" }} />
          <Row>
            <SubTitle>작성년도</SubTitle>
            <SubTitleReg>&nbsp; | &nbsp;{book?.publicationYear}</SubTitleReg>
          </Row>
          <div style={{ height: "20px" }} />
          <Row>
            <SubTitle>번역년도</SubTitle>
            <SubTitleReg>&nbsp; | &nbsp;{book?.translationYear}</SubTitleReg>
          </Row>
        </Column>
        <div
          style={{
            borderLeft: "4px solid black",
            height: "240px",
            width: "44px",
          }}
        />
        <Column>
          <Row>
            <SubTitle>발행일</SubTitle>
            <SubTitleReg>&nbsp; | &nbsp;{book?.publishDate}</SubTitleReg>
          </Row>
          <div style={{ height: "20px" }} />
          <Row>
            <SubTitle>쪽수</SubTitle>
            <SubTitleReg>&nbsp; | &nbsp;{book?.pages}</SubTitleReg>
          </Row>
          <div style={{ height: "20px" }} />
          <Row>
            <SubTitle>참고서 사용 학년</SubTitle>
            <SubTitleReg>&nbsp; | &nbsp;{book?.referenceGrade}</SubTitleReg>
          </Row>
          <div style={{ height: "20px" }} />
          <Row>
            <SubTitle>참고서 사용 학기</SubTitle>
            <SubTitleReg>&nbsp; | &nbsp;{book?.referenceSemester}</SubTitleReg>
          </Row>
        </Column>
      </Row>
    </>
  );
};

export default BookInformation;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  flex-shrink: 0;
  margin: 0 auto;
`;

const SubTitleReg = styled.div`
  color: ${({ theme }) => theme.colors.black};
  font-weight: ${({ theme }) => theme.fontWeights.subtitle1_reg};
  font-size: ${({ theme }) => theme.fontSizes.subtitle1};
  white-space: nowrap;
`;

const SubTitle = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.subtitle1};
  font-weight: ${({ theme }) => theme.fontWeights.subtitle1};
  color: ${({ theme }) => theme.colors.black};
  white-space: nowrap;
`;