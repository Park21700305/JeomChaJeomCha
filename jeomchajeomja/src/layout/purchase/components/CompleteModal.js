import Modal from "@mui/material/Modal";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

const CompleteModal = ({ isModalOpen, setIsModalOpen, handleCancelClick }) => {
  const navigate = useNavigate();

  const handleCompleteClick = () => {
    setIsModalOpen(false);
    handleCancelClick();
    navigate("./complete");
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

  return (
    <ModalComponent open={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <Column>
        <Div>
          <Header
            tabIndex={0}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={{ color: "white" }}
          >
            결제하기
          </Header>
        </Div>
        <ModalBody>
          <Header tabIndex={0} onFocus={handleFocus} onBlur={handleBlur}>
            앱으로 이동하여
            <br />
            결제를 진행해 주세요.
          </Header>
          <Row>
            <ModalButton
              onFocus={handleFocus}
              onBlur={handleBlur}
              onClick={handleCompleteClick}
            >
              결제 완료
            </ModalButton>
          </Row>
        </ModalBody>
      </Column>
    </ModalComponent>
  );
};

export default CompleteModal;

const ModalComponent = styled(Modal)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Column = styled.div`
  border-radius: 20px;
  width: 810px;
  height: 670px;
  background-color: ${({ theme }) => theme.colors.white};
  overflow: hidden;
`;

const ModalBody = styled.div`
  padding: 40px 40px 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  height: 540px;
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const ModalButton = styled.button`
  border: 2px solid ${({ theme }) => theme.colors.black};
  padding: 9px 20px;
  border-radius: 15px;
  font-size: 35px;
  font-weight: ${({ theme }) => theme.fontWeights.subtitle1};
  background-color: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  height: 71px;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.colors.black};
  width: 100%;
  padding: 34px 40px 20px;
`;

const Header = styled.button`
  border: none;
  background-color: transparent;
  line-height: 150%;
  font-family: "Nanum Gothic";
  text-align: start;
  padding: 0;
  color: ${({ theme }) => theme.colors.black};
  font-weight: ${({ theme }) => theme.fontWeights.header1};
  font-size: ${({ theme }) => theme.fontSizes.header1};
  white-space: nowrap;
`;
