import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { storage } from "../utils/storage";
import { date } from "../utils/date";
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
  const { error, detail } = useSelector((state) => state?.todos);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [modal, setModal] = useState(false);
  const localTodosDetail = storage.selectById(id);

  useEffect(() => {
    dispatch(getTodos(id));
    return () => {
      dispatch(todos.actions.clearDetail());
    };
  }, []);

  useEffect(() => {
    date.alertfrom3DaysLeft(detail?.deadLine);
    if (error?.message === "Network Error") {
      date.alertfrom3DaysLeft(localTodosDetail[0]?.deadLine);
    }
  }, [(error && localTodosDetail[0]?.deadLine) || detail.deadLine]);

  const closeModal = () => {
    setModal(false);
  };

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
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <StIdDiv>{error ? localTodosDetail[0]?.id : detail.id}</StIdDiv>
            <StDeadLineDiv>
              D-Day: {error ? localTodosDetail[0]?.deadLine : detail.deadLine}
            </StDeadLineDiv>
          </div>
          <StTextDiv>
            {error ? localTodosDetail[0]?.text : detail.text}
          </StTextDiv>
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
