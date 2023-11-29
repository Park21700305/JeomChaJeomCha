import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NavBar from "../../common/NavBar";
import { Button } from "./components/Button";
import Search from "./components/Search";
import TtsTest from "../ttsTest";
import { Link } from "react-router-dom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

function Home() {
  const keyWords = ["초등저학", "초등고학", "중등", "고등"];
  const [isListening, setIsListening] = useState(false);
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === " " && !isListening) {
        setIsListening(true);
        SpeechRecognition.startListening();
      }
    };

    const handleKeyUp = (event) => {
      if (event.key === " " && isListening) {
        setIsListening(false);
        SpeechRecognition.stopListening();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isListening]);

  if (!browserSupportsSpeechRecognition) {
    return (
      <span>
        죄송합니다. 음성인식을 지원하지 않는 브라우저입니다.
        <br /> 크롬브라우저를 사용해주세요.
      </span>
    );
  }

  return (
    <>
      <NavBar />
      <Line />
      <Div>
        <Header>학습자료 검색</Header>
        <Body>
          스페이스바를 2초간 누른 후 벨소리가 나면 음성 검색이 활성화됩니다.
        </Body>
        <div>
          <p>Microphone: {isListening ? "on" : "off"}</p>
          <button onClick={resetTranscript}>Reset</button>
          <p>{transcript}</p>
        </div>
        <Search transcript={transcript} />
        <Space />
        <Header>키워드 검색</Header>
        <ButtonContainer>
          {keyWords.map((keyWordText, index) => (
            <Link
              to={`/search/${keyWords[index]}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Button key={index}>
                <span>{index + 1}</span>
                <span>{keyWordText}</span>
              </Button>
            </Link>
          ))}
        </ButtonContainer>
        <TtsTest />
      </Div>
    </>
  );
}

export default Home;
// 여기에 나머지 스타일 컴포넌트들을 포함시킵니다.

const Div = styled.div`
  display: flex;
  flex-direction: column;
  width: 1200px;
  flex-shrink: 0;
  align-items: start;
  margin: 0 auto;
`;

const SubDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: fit-content;
  gap: 5px;
`;

const Header = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.header1};
  color: ${({ theme }) => theme.colors.black};
  font-weight: ${({ theme }) => theme.fontWeights.header1};
`;

const Body = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.subtitle1};
  color: ${({ theme }) => theme.colors.black};
  font-weight: ${({ theme }) => theme.fontWeights.subtitle1};
  padding-bottom: 36px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: fit-content;
  height: fit-content;
  margin-bottom: 80px;
  margin-top: 36px;
`;

const Line = styled.div`
  width: 100%;
  margin-top: 19px;
  margin-bottom: 50px;
  height: 2px;
  background-color: ${({ theme }) => theme.colors.black};
`;

const Space = styled.div`
  width: 100%;
  height: 70px;
`;
