// script.js - simple, no storage
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('taskInput');
  const addBtn = document.getElementById('addBtn');
  const list = document.getElementById('taskList');
  const countSpan = document.getElementById('taskCount');

  // Add when Add button clicked
  addBtn.addEventListener('click', addTaskFromInput);

  // Add when Enter pressed inside input
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addTaskFromInput();
  });

  // Event delegation for checkbox toggle and delete button
  list.addEventListener('click', (e) => {
    const li = e.target.closest('li');
    if (!li) return;

    // If clicked delete button
    if (e.target.classList.contains('delete-btn')) {
      li.remove();
      updateCount();
      return;
    }

    // If clicked the checkbox
    if (e.target.matches('input[type="checkbox"]')) {
      const textEl = li.querySelector('.text');
      if (e.target.checked) textEl.classList.add('done');
      else textEl.classList.remove('done');
      return;
    }
  });

  // Create and add a task element from the input value
  function addTaskFromInput() {
    const text = input.value.trim();
    if (!text) return; // ignore empty

    const li = document.createElement('li');
    li.className = 'task-item';

    li.innerHTML = `
      <input type="checkbox" aria-label="Mark task done">
      <span class="text"></span>
      <button class="delete-btn" title="Delete task">✕</button>
    `;

    li.querySelector('.text').textContent = text;
    list.appendChild(li);

    input.value = '';
    input.focus();
    updateCount();
  }

  // Update task count display
  function updateCount() {
    countSpan.textContent = list.children.length;
  }
});
