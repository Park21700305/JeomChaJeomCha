import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import NavBar from "../../common/NavBar";
import { Button } from "./components/Button";
import Search from "./components/Search";
import { Link, useNavigate } from "react-router-dom";
import { SearchContext } from "../../model/SearchProvider";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

function Home() {
  const keyWords = ["초등", "중등", "고등", "수능"];
  const [keyword, setKeyword] = useContext(SearchContext);
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  const handleButtonClick = (event, keyWordText) => {
    event.preventDefault();
    setKeyword(keyWordText);
    navigate("/search");
  };

  const handleFocus = (event) => {
    const text = event.target.innerText;
    const speech = new SpeechSynthesisUtterance();
    speech.lang = "ko-KR";
    speech.text = text;
    window.speechSynthesis.speak(speech);
  };

  const handleBlur = () => {
    window.speechSynthesis.cancel();
  };

  useEffect(() => {
    let startTimer;

    const handleKeyDown = (event) => {
      if (event.key === " " && !isListening && !startTimer) {
        // 스페이스바 누른 상태로 0.2초를 누르면 딱 작동
        startTimer = setTimeout(() => {
          playBeep();
          setIsListening(true);
          SpeechRecognition.startListening();
          startTimer = null; // 타이머 초기화
        }, 200);
      }
    };

    const handleKeyUp = (event) => {
      if (event.key === " ") {
        // 스페이스바를 뗄 때 타이머 취소 => 입력 정상작동
        if (startTimer) {
          clearTimeout(startTimer);
          startTimer = null;
        }
        if (isListening) {
          setIsListening(false);
          SpeechRecognition.stopListening();
        }
      }
    };

    const playBeep = () => {
      const audioContext = new window.AudioContext();

      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime); // 볼륨을 0.1로 설정

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(440, audioContext.currentTime);

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.6);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      if (startTimer) {
        clearTimeout(startTimer); // 컴포넌트 언마운트 시 타이머 취소
      }
    };
  }, [isListening]);

  useEffect(() => {
    if (transcript && !isListening) {
      const speech = new SpeechSynthesisUtterance();
      speech.lang = "ko-KR";
      speech.text = transcript;
      window.speechSynthesis.speak(speech);
    }
  }, [transcript, isListening]);

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
      <NavBar handleFocus={handleFocus} handleBlur={handleBlur} />
      <Line />
      <Div>
        <Row>
          <Header tabIndex={0} onFocus={handleFocus} onBlur={handleBlur}>
            학습자료 검색
          </Header>
          <Body tabIndex={0} onFocus={handleFocus} onBlur={handleBlur}>
            해당 학년 혹은 교재명과 같은 키워드를 입력해주세요.
          </Body>
        </Row>
        <Body2 tabIndex={0} onFocus={handleFocus} onBlur={handleBlur}>
          스페이스바를 누르는 동안 음성 검색이 활성화됩니다.
        </Body2>
        <Search
          transcript={transcript}
          isListening={isListening}
          handleFocus={handleFocus}
          handleBlur={handleBlur}
        />
        <Space />
        <Header tabIndex={0} onFocus={handleFocus} onBlur={handleBlur}>
          키워드 검색
        </Header>
        <ButtonContainer>
          {keyWords.map((keyWordText, index) => (
            <Link
              to="/search"
              onClick={(event) => handleButtonClick(event, keyWordText)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Button key={index} tabIndex={-1}>
                <span>{index + 1}</span>
                <span>{keyWordText}</span>
              </Button>
            </Link>
          ))}
        </ButtonContainer>
        <Body3>해당 키워드의 번호를 입력하여 검색할 수 있습니다. </Body3>
      </Div>
    </>
  );
}

export default Home;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  width: 1200px;
  flex-shrink: 0;
  align-items: start;
  margin: 0 auto;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: baseline;
  width: fit-content;
  gap: 20px;
`;

const Header = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.header1};
  color: ${({ theme }) => theme.colors.black};
  font-weight: ${({ theme }) => theme.fontWeights.header1};
  line-height: 150%;
`;

const Body = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.subtitle1};
  color: ${({ theme }) => theme.colors.black};
  font-weight: ${({ theme }) => theme.fontWeights.subtitle1};
  /* padding-bottom: 36px; */
  line-height: 150%;
`;

const Body2 = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.subtitle1};
  color: ${({ theme }) => theme.colors.black};
  font-weight: ${({ theme }) => theme.fontWeights.subtitle1};
  padding-bottom: 36px;
  padding-top: 4px;
  line-height: 150%;
`;

const Body3 = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.subtitle1};
  color: ${({ theme }) => theme.colors.black};
  font-weight: ${({ theme }) => theme.fontWeights.subtitle1};
  line-height: 150%;
  padding-bottom: 65px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 1200px;
  height: fit-content;
  margin-bottom: 15px;
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
