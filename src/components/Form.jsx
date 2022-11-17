import List from "./List";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { createTodos } from "../redux/modules/todos";
import { deleteTodos } from "../redux/modules/todos";
const Form = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [deadLine, setDeadLine] = useState("");
  const [checkedItems, setCheckedItems] = useState([]);
  const [query, setQuery] = useState("");

  // 오늘 날짜 밀리세컨으로 변환
  let date = new Date().toISOString().split("T")[0];
  const today = Date.parse(date);

  // 선택된 날짜 밀리세컨으로 변환
  const selectedDate = Date.parse(deadLine);

  useEffect(() => {
    if (selectedDate < today) {
      alert("현재 보다 이전의 날짜는 설정할 수 없습니다.");
      setDeadLine("");
    }
  }, [deadLine]);

  const onSubmitHandler = async (e) => {
    let req = {
      text,
      deadLine,
    };
    e.preventDefault();
    dispatch(createTodos(req));
    setText("");
    setDeadLine("");
  };

  const onDeleteHandler = () => {
    if (checkedItems.length > 0) {
      if (window.confirm("삭제할까요?") == true) {
        dispatch(deleteTodos(checkedItems));
        setCheckedItems([]);
      } else {
        setCheckedItems([]);
        return false;
      }
    }
  };

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  return (
    <>
      <StForm onSubmit={onSubmitHandler}>
        <StElementsDiv>
          <StInput
            type="text"
            value={text}
            required
            placeholder="To do를 입력하세요"
            onChange={(e) => setText(e.target.value)}
          />
          <StInput
            type="date"
            value={deadLine}
            required
            onChange={(e) => setDeadLine(e.target.value)}
          />
          <StButton type="submit">등록</StButton>
          <StButton type="button" onClick={onDeleteHandler}>
            삭제
          </StButton>
          <StSearchInput
            type="search"
            value={query}
            onChange={handleSearch}
            placeholder="검색어를 입력하세요"
          />
        </StElementsDiv>
      </StForm>

      <List
        checkedItems={checkedItems}
        setCheckedItems={setCheckedItems}
        query={query}
      />
    </>
  );
};

export default Form;

const StForm = styled.form`
  background-color: #ececec;
`;
const StElementsDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin: 15px 0 0 10px;
  gap: 20px;
`;
const StInput = styled.input`
  margin: 20px 0 20px 0;
  width: 200px;
  height: 20px;
`;
const StButton = styled.button`
  margin-top: 20px;
  width: 50px;
  height: 20px;
`;
const StSearchInput = styled.input`
  margin-top: 20px;
  width: 200px;
  height: 20px;
`;
