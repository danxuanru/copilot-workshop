// 待辦清單的儲存鍵名稱
const STORAGE_KEY = 'todo-list-items';
const THEME_KEY = 'todo-theme-preference';

// 篩選狀態：all / active / completed
let currentFilter = 'all';

// 取得 DOM 元素
const todoInput = document.getElementById('todo-input');
const addButton = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const emptyState = document.getElementById('empty-state');
const remainingCount = document.getElementById('remaining-count');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.querySelector('.theme-icon');
const themeLabel = document.querySelector('.theme-label');
const filterButtons = document.querySelectorAll('.filter-btn');

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

// 取得使用者偏好的主題：若從未手動選擇，則跟隨系統設定
function getPreferredTheme() {
  const storedTheme = localStorage.getItem(THEME_KEY);

  if (storedTheme === 'light' || storedTheme === 'dark') {
    return storedTheme;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// 套用深色 / 淺色主題到頁面
function applyTheme(theme) {
  document.body.dataset.theme = theme;

  if (theme === 'dark') {
    themeIcon.textContent = '☀️';
    themeLabel.textContent = '淺色模式';
    themeToggle.setAttribute('aria-label', '切換至淺色模式');
  } else {
    themeIcon.textContent = '🌙';
    themeLabel.textContent = '深色模式';
    themeToggle.setAttribute('aria-label', '切換至深色模式');
  }
}

// 產生唯一識別碼
function generateId() {
  return Date.now() + Math.random().toString(16).slice(2);
}

// 取得目前篩選後的待辦項目
function getFilteredTodos(todos) {
  if (currentFilter === 'active') {
    return todos.filter((todo) => !todo.completed);
  }

  if (currentFilter === 'completed') {
    return todos.filter((todo) => todo.completed);
  }

  return todos;
}

// 更新底部未完成數量與空白提示
function updateSummary(todos) {
  const incompleteCount = todos.filter((todo) => !todo.completed).length;
  remainingCount.textContent = String(incompleteCount);

  const filteredTodos = getFilteredTodos(todos);

  if (todos.length === 0) {
    emptyState.textContent = '還沒有任何待辦事項,新增一個吧!';
    emptyState.classList.add('visible');
    return;
  }

  if (filteredTodos.length === 0) {
    if (currentFilter === 'active') {
      emptyState.textContent = '沒有未完成的待辦事項';
    } else if (currentFilter === 'completed') {
      emptyState.textContent = '沒有已完成的待辦事項';
    } else {
      emptyState.textContent = '還沒有任何待辦事項,新增一個吧!';
    }

    emptyState.classList.add('visible');
    return;
  }

  emptyState.classList.remove('visible');
}

// 渲染待辦清單
function renderTodos() {
  const todos = loadTodos();
  const filteredTodos = getFilteredTodos(todos);

  todoList.innerHTML = '';

  filteredTodos.forEach((todo) => {
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

// 切換篩選狀態
function setFilter(filterName) {
  currentFilter = filterName;

  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === filterName;
    button.classList.toggle('active', isActive);
  });

  renderTodos();
}

// 主題切換事件
themeToggle.addEventListener('click', () => {
  const nextTheme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem(THEME_KEY, nextTheme);
  applyTheme(nextTheme);
});

// 篩選按鈕事件
filterButtons.forEach((button) => {
  button.addEventListener('click', () => setFilter(button.dataset.filter));
});

// 事件綁定：新增按鈕與 Enter 鍵
addButton.addEventListener('click', addTodo);

todoInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addTodo();
  }
});

// 依照使用者偏好或系統設定初始化主題
const initialTheme = getPreferredTheme();
applyTheme(initialTheme);

// 首次載入時渲染資料
renderTodos();
