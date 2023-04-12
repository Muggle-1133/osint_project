import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  height: auto;
  min-height: 100%;
  background: #000100;
`;

export const ModalContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const Background = styled.div`
  position: relative;
  top: 0%;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 0;
  animation: modal-bg-show 0.5s;
  @keyframes modal-bg-show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const ModalBox = styled.div`
  position: absolute;
  left: ${(props) => props.left};
  top: ${(props) => props.top};
  transform: translate(-50%, -50%);
  max-height: 20%;
  //width: 415px;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: 8px;
  background: rgb(241 241 241);
  border-radius: 7px;
  text-align: center;

  animation: modal-show 0.5s;
  @keyframes modal-show {
    from {
      opacity: 0;
      margin-top: -50px;
    }
    to {
      opacity: 1;
      margin-top: 0;
    }
  }
`;
