import Axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import {
  SearchForm,
  IconContainer,
  SearchBtn,
  InputContainer,
  Input,
  ClearSpan,
} from "./SearchElements";

const Search = ({ setLoading }) => {
  const history = useHistory();
  const [inputVal, setInputVal] = useState("");
  const [buttonType, setbuttonType] = useState("button");

  const [isSubmit, setIsSubmit] = useState(false);
  useEffect(() => {
    if (isSubmit) {
      setLoading(true);
    }
    return () => {
      setIsSubmit(false);
    };
  }, [isSubmit]);

  const onChange = (e) => {
    setInputVal(e.target.value);
  };
  const onClickClear = () => {
    setInputVal("");
  };
  const onClickBtn = () => {
    if (inputVal !== "") {
      setbuttonType("submit");
    }
  };
  // 입력 값을 서버로 전달
  const onSubmit = (e) => {
    e.preventDefault();
    if (inputVal !== "") {
      // Axios 호출 시 loading 화면을 보여줌.
      setIsSubmit(true);
      Axios.post("//" + window.location.hostname + ":4000/api/search", {
        inputVal: inputVal,
      }).then((res) => {
        if (res.data) {
          setLoading(false);
          history.push({
            pathname: "/dashboard",
            state: { isValue: res.data },
          });
        }
      });
    }
  };

  const onKeyPress = (e) => {
    if (e.target.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <>
      <SearchForm id="search" onSubmit={onSubmit}>
        <ClearSpan onClick={onClickClear}></ClearSpan>
        <InputContainer>
          <Input
            type="text"
            placeholder="도메인, URL 중 한 가지 형식으로 검색하세요."
            id="mysearch"
            value={inputVal}
            onChange={onChange}
            onKeyPress={onKeyPress}
          />
        </InputContainer>
        <IconContainer>
          <SearchBtn type={buttonType} onClick={onClickBtn} />
        </IconContainer>
      </SearchForm>
    </>
  );
};

export default Search;
