import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import todos, { getTodos } from "../redux/modules/todos";
import EditTodoModal from "./EditTodoModal";

const TodoDetail = () => {
  const { error, detail, isLoading } = useSelector((state) => state?.todos);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [modal, setModal] = useState(false);
  const todaysDate = new Date().toISOString().split("T")[0];
  const today = Date.parse(todaysDate);
  const selectedDate = Date.parse(detail.deadLine) || "";
  const milliSeconds = 24 * 60 * 60 * 1000;
  const daysLeft = Math.ceil((selectedDate - today) / milliSeconds) || "";

  useEffect(() => {
    dispatch(getTodos(id));
    return () => {
      dispatch(todos.actions.clearDetail());
    };
  }, []);

  useEffect(() => {
    if (isLoading) return;
    if (detail?.deadLine !== undefined) {
      if (!daysLeft) return;
      if (daysLeft && 0 < daysLeft && daysLeft < 4) {
        alert(`D-day 까지 ${daysLeft}일 남았습니다`);
      } else if (daysLeft === 0) {
        alert("D-day입니다");
      }
    }
  }, [detail.deadLine]);

  const closeModal = () => {
    setModal(false);
  };
  /*--------------------- localStorage ---------------------*/
  const todosFromLocalStorage = localStorage.getItem("allTodos");
  const localTodos = JSON.parse(todosFromLocalStorage);
  const localTodosDetail =
    localTodos &&
    localTodos.filter((detail) => {
      return detail.id === id;
    });

  useEffect(() => {
    if (error) {
      const todaysDate = new Date().toISOString().split("T")[0];
      const today = Date.parse(todaysDate);
      const selectedDate = Date.parse(localTodosDetail[0].deadLine);
      const milliSeconds = 24 * 60 * 60 * 1000;
      const daysLeft = Math.ceil((selectedDate - today) / milliSeconds);
      setTimeout(() => {
        if (0 < daysLeft && daysLeft < 4) {
          alert(`D-day 까지 ${daysLeft}일 남았습니다`);
        } else if (daysLeft === 0) {
          alert("D-day입니다");
        }
      }, 500);
    }
  }, [localTodosDetail[0]?.deadLine]);

  return (
    <>
      <StDetailDiv>
        <StWrapperDiv>
          {modal ? (
            <EditTodoModal
              detail={detail}
              localTodosDetail={localTodosDetail}
              closeModal={closeModal}
              error={error}
            />
          ) : null}
          {(error && (
            <>
              {" "}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <StIdDiv>{localTodosDetail[0].id}</StIdDiv>
                <StDeadLineDiv>
                  D-Day: {localTodosDetail[0].deadLine}
                </StDeadLineDiv>
              </div>
              <StTextDiv>{localTodosDetail[0].text}</StTextDiv>
            </>
          )) || (
            <>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <StIdDiv>{detail.id}</StIdDiv>
                <StDeadLineDiv>D-Day: {detail.deadLine}</StDeadLineDiv>
              </div>
              <StTextDiv>{detail.text}</StTextDiv>
            </>
          )}
          <StEditButton
            onClick={() => {
              setModal(true);
            }}
          >
            수정
          </StEditButton>
          <StGoBackButton
            onClick={() => {
              navigate("/");
            }}
          >
            이전
          </StGoBackButton>
        </StWrapperDiv>
      </StDetailDiv>
    </>
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
