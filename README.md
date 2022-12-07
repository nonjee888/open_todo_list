## 컴포넌트 구조

![오픈소스컨설팅](https://user-images.githubusercontent.com/106578705/206108432-809247c8-d714-4c2d-a37f-a1c55179e94c.png)

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

- Visual Studio Code
- Node.js
- npm
- yarn
- create-react-app

## 시작

```bash
yarn start
json-server db.json --routes routes.json --port 3001
```

- 환경변수 설정하기

## 기능 & 동작 원리 </br>

### 1. 신규 todo 입력해 추가

#### Form.jsx

```javaScript

  const onSubmitHandler = (e) => {
    e.preventDefault();
    let req = {
      id,
      text,
      deadLine,
    };
    // LocalStorage에 todo 추가
    storage.addTodo("allTodos", req);

    // API Post 요청
    dispatch(createTodos(req));
    setText("");
    setDeadLine("");
  };

```

#### storage.js

```javaScript

  const storage = {
  save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  parseToArray(key) {
    return JSON.parse(localStorage.getItem(key));
  },

  addTodo(key, req) {
    // 로컬스토리지에 저장 할 배열 생성
    let todoArr = [];
    // 로컬스토리지에 추가
    todoArr = storage.parseToArray(key) || [];
    todoArr.push(req);
    storage.save(key, todoArr);
  },
  //...생략
}

```

#### 동작 원리

- 상단에서 신규 To-Do 입력하여 추가
- 내용과 날짜 선택 가능
- 현재 날짜 부터 선택 가능
- API가 offline일 경우엔 로컬스토리지에 저장
- 로컬스토리지에 저장 할 배열 todoArr를 선언하고
- todoArr를 localStorage에서 가져온 값을 파싱한 배열 또는 빈배열로 할당
- todoArr에 데이터인 req를 push해 배열 마지막에 추가
- 데이터가 추가된 todoArr를 localStorage에 저장
- API Post요청 dispatch
- 데이터 전송 후 input은 초기화
  </br>

## 2. 기한 3일 이내 남은 경우 경고

#### TodoDetail.jsx

```javaScript

  useEffect(() => {
    date.alertfrom3DaysLeft(detail?.deadLine);
    if (error?.message === "Network Error") {
      date.alertfrom3DaysLeft(localTodosDetail[0]?.deadLine);
    }
  }, [(error && localTodosDetail[0]?.deadLine) || detail.deadLine]);

```

#### date.js

```javaScript

const todaysDate = new Date().toISOString().split("T")[0];
const today = Date.parse(new Date().toISOString().split("T")[0]);
const MILLISECONDS = 24 * 60 * 60 * 1000;

const date = {
  parseByDate(value) {
    return Date.parse(value);
  },

  calculateDaysLeft(selectedDate, today) {
    return Math.ceil((selectedDate - today) / MILLISECONDS);
  },

  alertfrom3DaysLeft(value) {
    const selectedDate = date.parseByDate(value);
    const daysLeft = date.calculateDaysLeft(selectedDate, today);

    setTimeout(() => {
      if (value !== undefined) {
        if (0 < daysLeft && daysLeft < 4) {
          alert(`D-day 까지 ${daysLeft}일 남았습니다`);
        } else if (daysLeft === 0) {
          alert("D-day입니다");
        }
      }
    }, 500);
  },
};

export { todaysDate, today, date, MILLISECONDS };

```

#### 동작 원리

- new Date()이용해 오늘과 선택된 날의 값을 millisecond로 parse ⇒ 남은 일 수 구해 3일 전부터 alert 뜨도록
- path: “/id” 로 이동 시, alert 창 뜸
  </br>

## 3. Row 단위로 수정

#### EditTodoModal.jsx

```javaScript

  const initialState = {
    id: error === null ? detail.id : localTodosDetail[0].id,
    text: error === null ? detail.text : localTodosDetail[0].text,
    deadLine: error === null ? detail.deadLine : localTodosDetail[0].deadLine,
  };
  const [text, setText] = useState(initialState.text);
  const [deadLine, setDeadLine] = useState(initialState.deadLine);

```

#### storage.js

```javaScript

   updateById(key, value, req) {
    // 로컬스토리지의 투두들을 리스트로 변환
    const localTodos = storage.parseToArray(key);
    // 수정할 투두 index 찾기
    const index = localTodos.findIndex((todo) => todo.id === value);
    // 수정할 투두로 배열 원소 교체
    localTodos.splice(index, 1, req);
    // 교체된 배열 다시 로컬스토리지 저장
    storage.save(key, localTodos);
  },

```

#### 동작 원리

- Todo 상세조회페이지에서 수정 버튼 누름
- param과 id와 일치하는 데이터에서 가져온 내용과 기한을 useState의 initialState로 설정해 input에 반영
- 수정에 성공하면 path “/”로 navigate
- 로컬스토리지로 작동하는 경우 onUpdateHandler의 catch에서 분기처리
- localStorage 배열의 todo id와 상세조회페이지에서 가져온 데이터의 id를 비교 ⇒ 같은 id의 index 번호를 찾아 splice()로 교체, 교체된 배열을 다시 로컬스토리지로 저장

</br>
  
## 4. Multiple Row 선택 삭제
  
#### Form.jsx
  
```javaScript
  
    const onDeleteHandler = () => {
    if (checkedItems.length > 0 && window.confirm("삭제할까요?") === true) {
      // LocalStorage Delete
      storage.deleteById(checkedItems);
      // API Delete
      dispatch(deleteTodos(checkedItems));
      setCheckedItems([]);
    } else {
      setCheckedItems([]);
      return false;
    }
  };
```

#### storage.jsx

```javaScript

  deleteById(checkedItems) {
    // 로컬스토리지의 투두들을 리스트로 변환
    const localTodos = storage.parseToArray("allTodos");
    // 로컬스토리지에서 삭제
    for (let i = 0; i < checkedItems.length; i++) {
      const index =
        localTodos &&
        localTodos.findIndex((todo) => todo.id === checkedItems[i]);
      if (index > -1) {
        localTodos && localTodos.splice(index, 1);
      }
      // 삭제된 배열을 다시 로컬스토리지에 넣어줌
      storage.save("allTodos", localTodos);
    }
  },
```

#### todos.js (Redux module)

```javaScript

// middleware
export const deleteTodos = createAsyncThunk(
  "todos/deleteTodos",
  async (payload) => {
    deleteTodoById(payload);
  }
);

// extra reducer
 builder
      .addCase(deleteTodos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        deleteTodo(state, action);
      })
      .addCase(deleteTodos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
```

#### api.js

```javaScript
function deleteTodoById(payload) {
  for (let i = 0; i < payload.length; i++) {
    axios
      .delete(process.env.REACT_APP_HOST + `/api/todos/${payload[i]}`)

      .then((res) => {
        // console.log(res);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
}

function deleteTodo(state, action) {
  const length = action.meta.arg.length;
  for (let i = 0; i < length; i++) {
    let index = state.todos.findIndex((todo) => todo.id === action.meta.arg[i]);
    state.todos.splice(index, 1);
  }
}
```

#### 동작원리

- input type checkbox 이용 todo 다중 선택 ⇒ 삭제
- input의 id = todo.id로 지정
- checkedItems라는 state에 선택한 todo.id를 배열로 저장
- includes()로 checkedItems에 todo.id가 있으면 input checked로 상태 변경
- check 취소시 선택 취소한 id와 다른 요소들만 checkedItems에 저장
- checkedItems가 있을때 삭제 재확인 후 로컬스토리지의 todo들을 리스트로 변환해 for문 이용해 순차적으로 splice()를 이용해 삭제함
- 삭제한 배열 다시 로컬스토리지에 저장

#### API DELETE

- 반복문을 이용해 배열로 들어온 payload가 순서대로 axios 요청으로 전송 될 수 있도록 함
- extraReducer에서 todo.id와 action의 payload에 담긴 id 배열을 비교하여 splice()로 삭제되도록 반복문 실행

</br>

## 5. List size - 5로 페이지네이션

#### TodoList.jsx

```javaScript

  // 페이지 나누기
  const pageNumber = [];
  page.numberArray(error ? localTodos : todos, pageNumber);

// ...생략
return (
<>
{currentTodos &&
currentTodos.map((todo) => {
return <Todo props={props} todo={todo} key={todo.id} error={error} />;
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

export default TodoList;

```

#### Pagination.jsx

```javaScript

  const Pagination = ({ pageNum, paginate, selected }) => {
  return (
    <StNumber
      key={pageNum}
      onClick={() => paginate(pageNum)}
      style={
        selected === pageNum
          ? { background: "#ececec", fontWeight: "900" }
          : { background: "#ffffff" }
      }
    >
      {pageNum}
    </StNumber>
  );
};

export default Pagination;

```

#### page.js

```javaScript

  paginate(pageNumber, key) {
    key(pageNumber);
  },

  number(value) {
    return Math.ceil(value.length / TODOS_PER_PAGE);
  },

  numberArray(value, array) {
    for (let i = 1; i <= page.number(value); i++) {
      array.push(i);
    }
    return array;
  },

```

#### 동작 원리

- 검색 키워드로 filtered, paginated array = currentTodos
- API offline시 localTodos(로컬스토리지 데이터), 아닐 시 todos(서버 데이터)로 데이터 처리
- 검색 키워드 = query
- filterByQuery(): 키워드가 들어간 데이터를 전체 배열에서 filter하는 배열을 반환
- sortByDate(): 오름차순 정렬한 배열 반환
- numberArray(): 배열의 길이와 한 화면에 보여질 todo의 갯수(5)로 나누어 pageNumber에 페이지 수(i)를 배열로 저장
- showCurrentTodos(): 각 페이지에 보여질 To-do를 반환
- map()이용 currentTodos, pageNumber를 화면에 표시
  </br>

## 6. 검색필터, 검색어 브라우저 닫아도 남도록하기

#### Form.jsx

```javaScript

  // 검색어 input value에 initialState를 localStorage에 저장한 데이터로 지정
  const [query, setQuery] = useState(() => localStorage.getItem("search"));

  const handleSearch = (e) => {
    setQuery(e.target.value);
    storage.saveQuery("search", e.target.value);
  };

```

#### page.js

```javaScript

  // 키워드 search시 전체 투두를 필터, 검색어 없으면 전체 배열 보여줌
  filterByQuery(array, query) {
    return (
      array &&
      array.filter((todo) => {
        if (query === "") return array;
        const todoo = todo.text || "";
        return todoo.toLowerCase().includes(query.toLowerCase());
      })
    );
  },

```

#### 동작 원리

- input type=search, value=query 로 설정
- handleSearch에서 query에 검색 키워드 저장
- localStorage “search”라는 이름으로 검색 키워드인
- event target value 저장
- query의 initialState는 localStorage에서 가져온 “search”의 value ⇒ 브라우저 닫았다 켜도 키워드 유지

 </br>

## 7. API가 offline인 경우 로컬스토리지로 작동될 수 있게 처리

### fetch, get

미들웨어에서 catch로 AxiosError가 잡히면 extraReducer에서 state.error에 저장하여 useSelector를 이용해 error일때 로컬스토리지에서 가져온 데이터를 보여주도록 구현했습니다.

### delete

기능 & 동작원리 4. Multiple Row 삭제 소스코드를 참고 해 주세요.

### put

기능 & 동작원리 3. Row 단위로 수정 소스코드를 참고 해 주세요.

</br>

## [회고 : 잘 안된것, 새롭게 알게된 것들 톺아보기](https://nonjee888.tistory.com/entry/%EC%9E%98-%EC%95%88-%EB%90%98%EC%97%88%EB%8D%98%EA%B2%83-%ED%86%BA%EC%95%84%EB%B3%B4%EA%B8%B0)

## [코드리팩토링](https://nonjee888.tistory.com/entry/221207-%EB%A6%AC%ED%8C%A9%ED%86%A0%EB%A7%81-%EC%B6%94%EC%83%81%ED%99%94-%EB%8F%84%EC%A0%84)
