## 컴포넌트 구조
![오픈소스컨설팅](https://user-images.githubusercontent.com/106578705/202835025-ab6963f3-2341-4a8d-bda3-5d32f26892e4.png)

## 기술스택
<div align=left>
<img src="https://camo.githubusercontent.com/d147c6135f0f61373ceeae9035902f4c70578cb7bebacbf9a629bbfa0c035b0c/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6a6176617363726970742d4637444631453f7374796c653d666f722d7468652d6261646765266c6f676f3d6a617661736372697074266c6f676f436f6c6f723d626c61636b">
<img src="https://camo.githubusercontent.com/5a7100155d1a7b75357a90e8810530b21c8723c59f2976d0dafc7950205336d7/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f68746d6c352d4533344632363f7374796c653d666f722d7468652d6261646765266c6f676f3d68746d6c35266c6f676f436f6c6f723d7768697465">
<img 
src="https://camo.githubusercontent.com/d7a20725f534274737c2e8ea95bd345a2f09c31f22910de188b3151aad65b45d/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f72656163742d3631444146423f7374796c653d666f722d7468652d6261646765266c6f676f3d7265616374266c6f676f436f6c6f723d626c61636b">
<img
src="https://camo.githubusercontent.com/9bf2b5cae981ed3da34b9ea0a22c42455a7944c8e5db92de7d24a56361ddb5bb/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f52656475782d546f6f6c6b69742d3736344142433f7374796c653d666f722d7468652d6261646765266c6f676f3d7265647578266c6f676f436f6c6f723d7768697465">
<img
src="https://camo.githubusercontent.com/6f26c892816d5da31bf8c94fe2a504e84108058caac25525f742f8cb5004dd7a/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6178696f732d3030374345323f7374796c653d666f722d7468652d6261646765266c6f676f3d6178696f73266c6f676f436f6c6f723d7768697465">
<img
src="https://camo.githubusercontent.com/cf845c8e26b768508a83f459bf45bd7c85c0646ffce27ea0b4f21699ea618b6b/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f7265616374726f75746572646f6d2d4341343234353f7374796c653d666f722d7468652d6261646765266c6f676f3d7265616374726f75746572646f6d266c6f676f436f6c6f723d7768697465">
  <img src="https://camo.githubusercontent.com/a9a95986631c3d4945a63d42d2864e3918a834d672d907e174a29f743a1bc3f1/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6769742d4630353033323f7374796c653d666f722d7468652d6261646765266c6f676f3d676974266c6f676f436f6c6f723d7768697465">
<img src="https://camo.githubusercontent.com/6edbc790a0f795a6a382f807b8e0dc2bf4a7892f8811ebb438825063c84e085c/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f437265617465205265616374204170702d3039443341433f7374796c653d666f722d7468652d6261646765266c6f676f3d63726561746520526561637420417070266c6f676f436f6c6f723d7768697465">
<img src="https://camo.githubusercontent.com/c5c274241aae043f6d571ae6e99fec613525144b1db4b72e977dc28c57f87f21/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f7374796c65642d636f6d706f6e656e74732d4442373039333f7374796c653d666f722d7468652d6261646765266c6f676f3d7374796c65642d636f6d706f6e656e7473266c6f676f436f6c6f723d7768697465">
    
  
  </div>

## 작업 환경 설정

Visual Studio Code </br>
Node.js </br>
npm</br>
yarn</br>
create-react-app</br>

## 시작

yarn start</br>
json-server db.json --routes routes.json --port 3001</br>
환경변수 설정</br>

## 기능 & 동작 원리 </br>

### 1. 신규 todo 입력해 추가

  #### Form.jsx 
  
  ```javaScript
  
  // 오늘 날짜
  const todaysDate = new Date().toISOString().split("T")[0];

  const onSubmitHandler = (e) => {
    e.preventDefault();
   
   // 전송할 데이터
    let req = {
      id, // nextId로 id생성
      text, // 내용
      deadLine, //날짜 
    };

    // 로컬스토리지에 저장 할 배열 생성
    let todoArr = [];

    // 로컬스토리지에 추가
    todoArr = JSON.parse(localStorage.getItem("allTodos")) || [];
    todoArr.push(req);
    localStorage.setItem("allTodos", JSON.stringify(todoArr));

    // API Post 요청 
    dispatch(createTodos(req));
    setText("");
    setDeadLine("");
  };
  ```
</br>

  ## 2. 기한 3일 이내 남은 경우 경고 
  
  #### TodoDetail.jsx
  ```javaScript
  
  // todo 상세페이지 조회 API 요청
  useEffect(() => {
    dispatch(getTodos(id));
    
    // 상세페이지에서 벗어날 때 리듀서 이용해서 데이터 초기화 해 줌
    return () => {
      dispatch(todos.actions.clearDetail());
    };
  }, []);

  // 데이터가 성공적으로 들어오고 deadLine(todo의 기한)이 있을 때, 3일 전 부터 몇일 남았는지 alert 띄우기
  useEffect(() => {
    if (isLoading) return;
    if (detail?.deadLine !== undefined) {
      setTimeout(() => {
        if (!daysLeft) return;
        if (daysLeft && 0 < daysLeft && daysLeft < 4) {
          alert(`D-day 까지 ${daysLeft}일 남았습니다`);
        } else if (daysLeft === 0) {
          alert("D-day입니다");
        }
      }, 500);
    }
  }, [detail.deadLine]);
  // data가 처음에 undefined 였다가 들어옴. 의존성 배열에 detail.deadLine 추가
  ```
  </br>
  
  ## 3. Row 단위로 수정 
  
  #### EditTodoModal.jsx
  ```javaScript
  // todo 상세조회에서 가져온 데이터를 initialState로 input에 띄워주기
  const initialState = {
    id: detail.id,
    text: detail.text,
    deadLine: detail.deadLine,
  };
  const [text, setText] = useState(initialState.text);
  const [deadLine, setDeadLine] = useState(initialState.deadLine);
  
  ```
  
  </br>
  
  ## 4. Multiple Row 선택 삭제
  #### Form.jsx
  ```javaScript
   const onDeleteHandler = () => {
   // Todo.jsx에서 받아온 checkedItems이 0보다 클때 alert 확인 버튼 누를시,
    if (checkedItems.length > 0) {
      if (window.confirm("삭제할까요?") === true) {
      
        // 로컬스토리지의 투두들을 리스트로 변환
        const todosFromLocalStorage = localStorage.getItem("allTodos");
        const localTodos = JSON.parse(todosFromLocalStorage);

        // 로컬스토리지에서 todo.id와 checkedItems의 id가 일치하는 것 for문 돌려 찾아서 삭제
        for (let i = 0; i < checkedItems.length; i++) {
          const index = localTodos.findIndex(
            (todo) => todo.id === checkedItems[i]
          );
          
          // 일치하는 데이터가 있으면 배열화한 데이터에서 삭제해주기
          if (index > -1) {
            localTodos.splice(index, 1);
          }

          // 삭제된 배열을 다시 로컬스토리지에 넣어줌
          let allTodos = JSON.stringify(localTodos);
          localStorage.setItem("allTodos", allTodos);
        }

        // API Delete
        dispatch(deleteTodos(checkedItems));
        setCheckedItems([]);
      } else {
        setCheckedItems([]);
        return false;
      }
    }
  };
  ```
  #### todos.js (Redux module)
  ```javaScript
  
 // 미들웨어에서 for문 이용해 multiple삭제 구현
  export const deleteTodos = createAsyncThunk(
  "todos/deleteTodos",
  async (payload) => {
    for (let i = 0; i < payload.length; i++) {
      await axios
        .delete(process.env.REACT_APP_HOST + `/api/todos/${payload[i]}`)

        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }
);

// ...생략

// 상세페이지 초기화 해주는 reducer
  reducers: {
    clearDetail: (state, action) => {
      state.detail = {};
    },
  },
  
// ...생략

// todo배열의 id와 action으로 들어온 id들과 비교해 같은 것 찾아 삭제 
 extraReducers:{
   
    [deleteTodos.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteTodos.fulfilled]: (state, action) => {
      state.isLoading = false;
      let length = action.meta.arg.length;
      for (let i = 0; i < length; i++) {
        let index = state.todos.findIndex(
          (todo) => todo.id === action.meta.arg[i]
        );
        state.todos.splice(index, 1);
      }
    },

    [deleteTodos.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
}    
//...생략
  ```
  
  </br>
  
  ## 5. List size - 5로 페이지네이션 
  #### List.jsx
  ```javaScript
  //todos = 전체 todo 데이터
  
  // 키워드 search시 전체 투두를 필터
  const filteredTodos =
    todos &&
    todos.filter((todo) => {
      if (query === "") return todos;
      const todoo = todo.text || "";
      return todoo.toLowerCase().includes(query && query.toLowerCase());
    });

  // 날짜별 오름차순 정렬
  const sortedTodos = filteredTodos.sort(
    (a, b) => new Date(a.deadLine) - new Date(b.deadLine)
  );

  // 각 페이지에서 보여질 투두 배열
  const currentTodos = sortedTodos?.slice(indexOfFirstTodo, indexOfLastTodo);

  // 페이지 나누기
  const pageNumber = [];
  const totalTodos = todos.length;
  for (let i = 1; i <= Math.ceil(totalTodos / todosPerPage); i++) {
    pageNumber.push(i);
  }
  
  //...생략
  
    return (
    <>
      {currentTodos.map((todo, idx) => {
        return <Todo props={props} todo={todo} key={todo.id} idx={idx} />;
      })}
      <StPageNumberUl>
        {pageNumber.map((pageNum) => {
          return (
            <Pagination
              pageNum={pageNum}
              key={pageNum}
              paginate={paginate}
              selected={currentPage}
            />
          );
        })}
      </StPageNumberUl>
    </>
  );
};
  
  
  ```
  
  </br>
  
  ## 6. 검색필터, 검색어 브라우저 닫아도 남도록하기
  #### Form.jsx
  ```javaScript
  
  // 검색어 input value에 initialState를 localStorage에 저장한 데이터로 지정
   const [query, setQuery] = useState(localStorage.getItem("search"));
  
   const handleSearch = (e) => {
    setQuery(e.target.value);
    localStorage.setItem("search", e.target.value);
  };
  
  ```
  
  #### List.jsx
  
  ```javaScript
  
// 키워드 search시 전체 투두를 필터, 검색어 없으면 전체 배열 보여줌
  const filteredTodos =
    todos &&
    todos.filter((todo) => {
      if (query === "") return todos;
      const todoo = todo.text || "";
      return todoo.toLowerCase().includes(query && query.toLowerCase());
    });
    
  ```
  
 </br>
 
 ## 7. API가 offline인 경우 로컬스토리지로 작동될 수 있게 처리
 ### fetch, get 
 
 미들웨어에서 catch로 AxiosError가 잡히면 extraReducer에서 state.error에 저장하여 useSelector를 이용해 error일때 로컬스토리지에서 가져온 데이터를 보여주도록 구현했습니다.
 
 #### todos.js
 
 ```javaScript
 
 export const todos = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    detail: {},
    isLoading: false,
    error: null,
  },
  
  // extraReducer
  
  [getTodos.pending]: (state) => {
      state.isLoading = true;
    },
    [getTodos.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.detail = action.payload;
    },
    [getTodos.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

```
 
 
 #### List.jsx
 
 ```javaScript
 
 if (error) {
    return (
      <div>
        {currentLocalTodos &&
          currentLocalTodos.map((todo) => {
            return (
              <Todo props={props} todo={todo} key={todo.id} error={error} />
            );
          })}
        <StPageNumberUl>
          {localPageNumber.map((pageNum) => {
            return (
              <Pagination
                pageNum={pageNum}
                key={pageNum}
                paginate={paginate}
                selected={currentPage}
              />
            );
          })}
        </StPageNumberUl>
      </div>
    );
  }
  
 ```
 
 ### delete
 삭제 버튼 eventHandler안에서 localStorage데이터 수정, 삭제하는 로직 구현 (Multiple Row 삭제 소스코드 참고)
 
 ### put
 TodoDetail.jsx(todo 상세페이지)에서 error 일 때 localStorage에 저장된 데이터들을 보여주었습니다. 수정버튼 눌렀을 때 뜨는 모달창의 input에 떠야할 값은 API통신을 하는 DB와 LocalStorage가 서로 달라서 로컬스토리지 데이터 수정용 모달을 따로 만들어주어 API offline일 때는 다른 모달을 보여주도록 구현했습니다.
 
 #### EditLocalTodoModal.jsx
 
 ```javaScript
 
 const onUpdateHandler = async (e) => {
    e.preventDefault();
    let req = {
      id: initialState.id,
      text,
      deadLine,
    };
    try {
      const data = await axios.put(
        process.env.REACT_APP_HOST + `/api/todos/${initialState.id}`,
        req
      );
      if (data.statusText === "OK") {
        navigate("/");
      }
      
      // API offline 일 때, 
      
    } catch {
      
      // 로컬스토리지의 투두들을 리스트로 변환
      const todosFromLocalStorage = localStorage.getItem("allTodos");
      const localTodos = JSON.parse(todosFromLocalStorage);
      
      // 수정할 투두 index 찾기
      const index = localTodos.findIndex((todo) => todo.id === initialState.id);
      
      // 수정할 투두로 배열 원소 교체
      localTodos.splice(index, 1, req);
      
      // 교체된 배열 다시 로컬스토리지 저장
      let allTodos = JSON.stringify(localTodos);
      localStorage.setItem("allTodos", allTodos);
      navigate("/");
    }
  };
  
 ```
 </br>
 
 ### ![회고](https://nonjee888.tistory.com/entry/%EC%9E%98-%EC%95%88-%EB%90%98%EC%97%88%EB%8D%98%EA%B2%83-%ED%86%BA%EC%95%84%EB%B3%B4%EA%B8%B0)
 
  
