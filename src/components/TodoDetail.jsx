import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import EditTodoModal from "./EditTodoModal";

const TodoDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [modal, setModal] = useState(false);
  const [detailTodo, setDetailTodo] = useState({});

  // 오늘 날짜 밀리세컨으로 변환
  let date = new Date().toISOString().split("T")[0];
  const today = Date.parse(date);

  // 선택된 날짜 밀리세컨으로 변환
  const selectedDate = Date.parse(detailTodo?.deadLine);

  // 1일
  const milliSeconds = 24 * 60 * 60 * 1000;

  // 몇일 남았는지 계산
  const daysLeft = Math.ceil((selectedDate - today) / milliSeconds);

  useEffect(() => {
    getTodos(id);
    if (detailTodo?.deadLine !== undefined) {
      setTimeout(() => {
        if (0 < daysLeft && daysLeft < 4) {
          alert(`D-day 까지 ${daysLeft}일 남았습니다`);
        } else if (daysLeft === 0) {
          alert("D-day입니다");
        } else if (daysLeft < -1) {
          alert("기한이 지난 To Do 입니다!");
        }
      }, 300);
    }
  }, [detailTodo?.deadLine]);

  // 로컬스토리지의 투두들을 리스트로 변환
  const todosFromLocalStorage = localStorage.getItem("allTodos");
  const localTodos = JSON.parse(todosFromLocalStorage);

  // filter로 param과 투두 id와 일치하는 투두 찾기

  const localTodosDetail = localTodos.filter((detail) => {
    console.log(detail.id);
    return detail.id === Number(id);
  });

  const getTodos = async () => {
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_HOST + `/todos/${id}`
      );
      setDetailTodo(data && data);
    } catch (error) {
      if (error) {
        return (
          <StDetailDiv>
            <StWrapperDiv>
              {modal ? (
                <EditTodoModal
                  localTodosDetail={localTodosDetail}
                  closeModal={closeModal}
                />
              ) : null}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <StIdDiv>No.{localTodosDetail.id}</StIdDiv>
                <StDeadLineDiv>
                  D-Day: {localTodosDetail.deadLine}
                </StDeadLineDiv>
              </div>
              <StTextDiv>{localTodosDetail.text}</StTextDiv>

              <StEditButton
                onClick={() => {
                  setModal(true);
                }}
              >
                수정
              </StEditButton>

              <StGoBackButton
                onClick={() => {
                  navigate(-1);
                }}
              >
                이전
              </StGoBackButton>
            </StWrapperDiv>
          </StDetailDiv>
        );
      }
    }
  };

  const closeModal = () => {
    setModal(false);
  };

  return (
    <StDetailDiv>
      <StWrapperDiv>
        {modal ? (
          <EditTodoModal detailTodo={detailTodo} closeModal={closeModal} />
        ) : null}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <StIdDiv>No.{detailTodo.id}</StIdDiv>
          <StDeadLineDiv>D-Day: {detailTodo.deadLine}</StDeadLineDiv>
        </div>
        <StTextDiv>{detailTodo.text}</StTextDiv>

        <StEditButton
          onClick={() => {
            setModal(true);
          }}
        >
          수정
        </StEditButton>

        <StGoBackButton
          onClick={() => {
            navigate(-1);
          }}
        >
          이전
        </StGoBackButton>
      </StWrapperDiv>
    </StDetailDiv>
  );
};

export default TodoDetail;

const StDetailDiv = styled.div`
  width: 500px;
  height: 300px;
  margin: 300px auto;
  display: flex;
  border-radius: 10px;
  background-color: #cee0f1;
  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
`;
const StWrapperDiv = styled.div`
  width: 400px;
  height: 200px;
  margin: auto;
  word-break: break-all;
  justify-content: space-between;
  align-content: center;
`;
const StIdDiv = styled.div`
  margin-top: 20px;
`;
const StTextDiv = styled.div`
  width: 400px;
  margin-top: 60px;
`;
const StDeadLineDiv = styled.div`
  margin-top: 20px;
  font-weight: 600;
`;

const StEditButton = styled.button`
  width: 100px;
  height: 30px;
  border: none;
  border-radius: 5px;
  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
  margin: 50px 0 0 100px;
`;

const StGoBackButton = styled.button`
  width: 100px;
  height: 30px;
  border: none;
  border-radius: 5px;
  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
  margin-left: 20px;
`;
