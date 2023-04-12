import Axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";

import {
  Form,
  ClearSpan,
  InputContainer,
  IconContainer,
  SearchInput,
  SearchBtn,
} from "./SearchFormElement";
const SearchForm = ({ values, setLoading }) => {
  const history = useHistory();
  const [buttonType, setbuttonType] = useState("button");
  const [inputVal, setInputVal] = useState(values);
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    setInputVal(values);
  }, [values]);

  useEffect(() => {
    if (isSubmit) {
      setLoading(true);
    }
    return () => {
      setIsSubmit(false);
    };
  }, [isSubmit]);

  const onClickClear = () => {
    setInputVal("");
  };
  const onClickBtn = () => {
    if (inputVal !== "") {
      setbuttonType("submit");
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (inputVal !== "") {
      // Axios 호출 시 loading 화면을 보여줌.
      setIsSubmit(true);
      //setLoading(true);
      Axios.post("//" + window.location.hostname + ":4000/api/search", {
        inputVal: inputVal,
      }).then((res) => {
        if (res.data) {
          setLoading(false);
          //setSearchKey(inputVal);
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
      <Form onSubmit={onSubmit}>
        <ClearSpan onClick={onClickClear}></ClearSpan>
        <InputContainer>
          <SearchInput
            onChange={(e) => setInputVal(e.target.value)}
            onKeyPress={onKeyPress}
            value={inputVal}
          />
        </InputContainer>
        <IconContainer>
          <SearchBtn type={buttonType} onClick={onClickBtn} />
        </IconContainer>
      </Form>
    </>
  );
};

export default SearchForm;
