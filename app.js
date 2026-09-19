// 待辦清單的儲存鍵名稱
const STORAGE_KEY = 'todo-list-items';

// 取得 DOM 元素
const todoInput = document.getElementById('todo-input');
const addButton = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const emptyState = document.getElementById('empty-state');
const remainingCount = document.getElementById('remaining-count');

// 讀取 localStorage 中的待辦資料
function loadTodos() {
  const rawTodos = localStorage.getItem(STORAGE_KEY);

  if (!rawTodos) {
    return [];
  }

  try {
    const parsedTodos = JSON.parse(rawTodos);
    return Array.isArray(parsedTodos) ? parsedTodos : [];
  } catch (error) {
    console.error('讀取待辦資料失敗：', error);
    return [];
  }
}

// 儲存待辦資料到 localStorage
function saveTodos(todos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

// 產生唯一識別碼
function generateId() {
  return Date.now() + Math.random().toString(16).slice(2);
}

// 更新底部未完成數量與空白提示
function updateSummary(todos) {
  const incompleteCount = todos.filter((todo) => !todo.completed).length;
  remainingCount.textContent = String(incompleteCount);

  if (todos.length === 0) {
    emptyState.classList.add('visible');
  } else {
    emptyState.classList.remove('visible');
  }
}

// 渲染待辦清單
function renderTodos() {
  const todos = loadTodos();

  todoList.innerHTML = '';

  todos.forEach((todo) => {
    const item = document.createElement('li');
    item.className = `todo-item${todo.completed ? ' completed' : ''}`;
    item.dataset.id = todo.id;

    const main = document.createElement('div');
    main.className = 'todo-main';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'todo-checkbox';
    checkbox.checked = todo.completed;
    checkbox.setAttribute('aria-label', `標記為完成：${todo.text}`);

    const text = document.createElement('span');
    text.className = 'todo-text';
    text.textContent = todo.text;

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'delete-btn';
    deleteButton.textContent = '刪除';
    deleteButton.setAttribute('aria-label', `刪除待辦：${todo.text}`);

    checkbox.addEventListener('change', () => {
      // 更新勾選狀態並重新儲存
      const currentTodos = loadTodos();
      const target = currentTodos.find((itemTodo) => itemTodo.id === todo.id);

      if (!target) {
        return;
      }

      target.completed = checkbox.checked;
      saveTodos(currentTodos);
      renderTodos();
    });

    deleteButton.addEventListener('click', () => {
      // 刪除指定待辦事項
      const currentTodos = loadTodos().filter((itemTodo) => itemTodo.id !== todo.id);
      saveTodos(currentTodos);
      renderTodos();
    });

    main.appendChild(checkbox);
    main.appendChild(text);
    item.appendChild(main);
    item.appendChild(deleteButton);
    todoList.appendChild(item);
  });

  updateSummary(todos);
}

// 新增待辦事項
function addTodo() {
  const text = todoInput.value.trim();

  // 如果輸入為空白，不新增
  if (!text) {
    todoInput.focus();
    return;
  }

  const todos = loadTodos();
  todos.push({
    id: generateId(),
    text,
    completed: false,
  });

  saveTodos(todos);
  todoInput.value = '';
  todoInput.focus();
  renderTodos();
}

// 事件綁定：新增按鈕與 Enter 鍵
addButton.addEventListener('click', addTodo);

todoInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addTodo();
  }
});

// 首次載入時渲染資料
renderTodos();
