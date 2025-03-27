const openTodoModal = () => {
    const modal = document.querySelector("#todoModal");
    modal.show();
}

const closeTodoModal = () => {
    const modal = document.querySelector("#todoModal");
    modal.close();
}

export function createTodoListeners() {
    const openTodoBtn = document.querySelector("#openTodo");
    openTodoBtn.addEventListener("click", openTodoModal);

    const closeTodoBtn = document.querySelector("#closeTodo");
    closeTodoBtn.addEventListener("click", closeTodoModal);
}