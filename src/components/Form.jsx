import List from "./List";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { createTodos } from "../redux/modules/todos";
import { deleteTodos } from "../redux/modules/todos";
const Form = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [date, setDate] = useState("");
  const [deadLine, setDeadLine] = useState("");
  const [checkedItems, setCheckedItems] = useState([]);

  // 오늘 날짜 밀리세컨으로 변환
  const timeStamp = new Date();
  const year = timeStamp.getFullYear();
  const month = ("0" + (1 + timeStamp.getMonth())).slice(-2);
  const day = ("0" + timeStamp.getDate()).slice(-2);
  const today = year + "-" + month + "-" + day;
  const todayMil = Date.parse(today);
  // 선택된 날짜 밀리세컨으로 변환
  const selectedDate = Date.parse(deadLine);

  useEffect(() => {
    if (selectedDate < todayMil) {
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
  };
  console.log(checkedItems);
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
  return (
    <>
      <StForm onSubmit={onSubmitHandler}>
        <StElementsDiv>
          <input
            type="text"
            value={text}
            required
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="date"
            value={deadLine}
            required
            onChange={(e) => setDeadLine(e.target.value)}
          />
          <button type="submit">등록</button>
          <button type="button" onClick={onDeleteHandler}>
            삭제
          </button>
        </StElementsDiv>
      </StForm>
      <List checkedItems={checkedItems} setCheckedItems={setCheckedItems} />
    </>
  );
};

export default Form;

const StForm = styled.form``;
const StElementsDiv = styled.div`
  align-items: center;
  display: flex;
  gap: 10px;
`;
