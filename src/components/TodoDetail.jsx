import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { storage } from "../utils/storage";
import { today, date } from "../utils/date";
import todos, { getTodos } from "../redux/modules/todos";
import EditTodoModal from "./EditTodoModal";
import Button from "./Button";

const StDetailDiv = styled.div`
  width: 500px;
  height: 300px;
  margin: 150px auto;
  display: flex;
  border-radius: 10px;
  background-color: #a4ceee;
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
const StyledButtonsDiv = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
`;

const TodoDetail = () => {
  const { error, detail, isLoading } = useSelector((state) => state?.todos);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [modal, setModal] = useState(false);
  const selectedDate = date.parseByDate(detail.deadLine);
  const daysLeft = date.calculateDaysLeft(selectedDate, today);

  useEffect(() => {
    dispatch(getTodos(id));
    return () => {
      dispatch(todos.actions.clearDetail());
    };
  }, []);

  useEffect(() => {
    if (isLoading) return;
    date.alertfrom3DaysLeft(detail?.deadLine, daysLeft);
  }, [detail.deadLine]);

  const closeModal = () => {
    setModal(false);
  };
  /*--------------------- localStorage ---------------------*/
  const localTodos = storage.parseToArray("allTodos");
  const localTodosDetail =
    localTodos &&
    localTodos.filter((detail) => {
      return detail.id === id;
    });

  useEffect(() => {
    if (error?.message === "Network Error") {
      const selectedDate = date.parseByDate(localTodosDetail[0].deadLine);
      const daysLeft = date.calculateDaysLeft(selectedDate, today);
      date.alertfrom3DaysLeft(localTodosDetail[0]?.deadLine, daysLeft);
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
          <StyledButtonsDiv>
            <Button
              onClick={() => {
                setModal(true);
              }}
            >
              수정
            </Button>
            <Button
              onClick={() => {
                navigate("/");
              }}
            >
              이전
            </Button>
          </StyledButtonsDiv>
        </StWrapperDiv>
      </StDetailDiv>
    </>
  );
};

export default TodoDetail;
