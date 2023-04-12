import React, { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import AlertMessage from "./AlertMessage";
import Axios from "axios";
import { useHistory } from "react-router-dom";
const PasswordTab = ({ userData }) => {
  const userId = userData.idx;
  const history = useHistory();

  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    newPasswordConfirm: "",
  });
  const [buttonType, setButtonType] = useState("button");
  const [message, setMessage] = useState({
    oldPassword: "",
    newPassword: "",
    newPasswordConfirm: "",
  });
  const [isTrue, setIsTrue] = useState({
    oldPassword: false,
    newPassword: false,
    newPasswordConfirm: false,
  });
  const [display, setDisplay] = useState({
    oldPassword: "none",
    newPassword: "none",
    newPasswordConfirm: "none",
  });

  // old password 검시
  const CheckOldPW = () => {
    if (password.oldPassword.length === 0 || password.oldPassword === "") {
      setMessage({ ...message, oldPassword: "기존 비밀번호를 입력해 주세요." });
      setDisplay({ ...display, oldPassword: "flex" });
      setIsTrue({ ...isTrue, oldPassword: false });
    } else if (userData.password !== password.oldPassword) {
      setMessage({
        ...message,
        oldPassword: "기존 비밀번호와 일치하지 않습니다.",
      });
      setDisplay({ ...display, oldPassword: "flex" });
      setIsTrue({ ...isTrue, oldPassword: false });
    } else {
      setDisplay({ ...display, oldPassword: "none" });
      setMessage({ ...message, oldPassword: "" });
      setIsTrue({ ...isTrue, oldPassword: true });
    }
  };
  // new password 유효성 검사
  const CheckPw = () => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    // password란이 공백인 경우
    if (password.newPassword === "") {
      setMessage({
        ...message,
        newPassword: "새로운 비밀번호를 입력해 주세요.",
      });
      setDisplay({ ...display, newPassword: "flex" });
      setIsTrue({ ...isTrue, newPassword: false });
    }
    // password란이 공백이 아닌 경우
    else {
      // password 형식이 잘못된 경우
      if (!passwordRegex.test(password.newPassword)) {
        setMessage({
          ...message,
          newPassword:
            "비밀번호는 영문자, 숫자, 특수문자 모두 포함한 8자리 이상이어야 합니다.",
        });
        setDisplay({ ...display, newPassword: "flex" });
        setIsTrue({ ...isTrue, newPassword: false });
      } else if (userData.password === password.newPassword) {
        setMessage({
          ...message,
          newPassword: "기존 비밀번호와 다른 비밀번호로 입력해 주세요.",
        });
        setDisplay({ ...display, newPassword: "flex" });
        setIsTrue({ ...isTrue, newPassword: false });
      }
      // password 형식에 맞게 입력된 경우
      else {
        setDisplay({ ...display, newPassword: "none" });
        setMessage({ ...message, newPassword: "" });
        setIsTrue({ ...isTrue, newPassword: true });
      }
    }
  };
  // 패스워드, 패스워드 확인 값이 동일한지 확인
  const CheckConfirmPw = () => {
    // password 확인란이 공백인 경우
    if (password.newPasswordConfirm === "") {
      setMessage({
        ...message,
        newPasswordConfirm: "새로운 비밀번호 확인을 입력해주세요.",
      });
      setDisplay({ ...display, newPasswordConfirm: "flex" });
      setIsTrue({ ...isTrue, newPasswordConfirm: false });
    }
    // password 확인란이 공백이 아닌 경우
    else {
      // password와 값이 동일하지 않은 경우
      if (password.newPassword !== password.newPasswordConfirm) {
        setMessage({
          ...message,
          newPasswordConfirm: "입력하신 새로운 비밀번호와 동일하지 않습니다.",
        });
        setDisplay({ ...display, newPasswordConfirm: "flex" });
        setIsTrue({ ...isTrue, newPasswordConfirm: false });
      }
      // password와 값이 동일한 경우
      else {
        setDisplay({ ...display, newPasswordConfirm: "none" });
        setMessage({ ...message, newPasswordConfirm: "" });
        setIsTrue({ ...isTrue, newPasswordConfirm: true });
      }
    }
  };
  const onHandleChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const onClickButton = () => {
    if (isTrue.oldPassword && isTrue.newPassword && isTrue.newPasswordConfirm) {
      setButtonType("submit");
    }
  };
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      CheckOldPW();
      CheckPw();
      CheckConfirmPw();
      onClickButton();
    }
  };

  // form 처리(onSubmit)
  const onSubmitForm = (e) => {
    e.preventDefault();
    Axios.post("//" + window.location.hostname + ":4000/api/userUpdate", {
      newPassword: password.newPassword,
      id: userId,
    }).then((res) => {
      // 패스워드 변경 성공한 경우
      if (res.data.message) {
        alert("성공적으로 비밀번호가 변경되었습니다.");
        history.push("/");
      }
      // 패스워드 변경 실패한 경우
      else {
        alert("비밀번호를 변경하는데 실패했습니다. 관리자에게 문의해 주세요.");
        console.log(res.data.error);
      }
    });
  };
  return (
    <form className="passwordTab" onSubmit={onSubmitForm}>
      <h1>비밀번호 변경</h1>
      <h2>기존 비밀번호</h2>
      <input
        name="oldPassword"
        type="password"
        className="infoInput"
        onKeyUp={CheckOldPW}
        onChange={onHandleChange}
        required
      />
      <AlertMessage
        display={display.oldPassword}
        style={{ marginTop: "2px", marginBottom: "0" }}
      >
        <FaInfoCircle />
        {message.oldPassword}
      </AlertMessage>
      <h2>새로운 비밀번호</h2>
      <input
        name="newPassword"
        type="password"
        className="infoInput"
        onChange={onHandleChange}
        onKeyUp={CheckPw}
        required
      />
      <AlertMessage
        display={display.newPassword}
        style={{ marginTop: "2px", marginBottom: "0" }}
      >
        <FaInfoCircle />
        {message.newPassword}
      </AlertMessage>
      <h2>새로운 비밀번호 확인</h2>
      <input
        name="newPasswordConfirm"
        type="password"
        className="infoInput"
        onChange={onHandleChange}
        onKeyUp={CheckConfirmPw}
        onKeyPress={onKeyPress}
        required
      />
      <AlertMessage
        display={display.newPasswordConfirm}
        style={{ marginTop: "2px", marginBottom: "0" }}
      >
        <FaInfoCircle />
        {message.newPasswordConfirm}
      </AlertMessage>
      <button className="changeBtn" type={buttonType} onClick={onClickButton}>
        <i className="fa-sharp fa-solid fa-key"></i>변경하기
      </button>
    </form>
  );
};

export default PasswordTab;
