class TodoView {
  static TODO_VIEW_ITEM = 'todoItem';
  static TODO_VIEW_ITEM_DELETE = 'delete-button';

  static isDomElementMatch(domElement) {
    return domElement.dataset.type === TodoView.TODO_VIEW_ITEM;
  }
  static isDomElementMatchDeleteElement(domElement) {
    return domElement.dataset.type === TodoView.TODO_VIEW_ITEM_DELETE;
  }

  static createSimpleViewFromVO(index, vo) {

    const checked = vo.isComplited ? 'checked' : '';
    return `<li style="user-select: none; width: 100%;" 
              data-type="${TodoView.TODO_VIEW_ITEM}"
               id="${vo.id}">
        <input type="checkbox" id="${index}"${checked}>${vo.title}
        <button data-type="${TodoView.TODO_VIEW_ITEM_DELETE}">x</button>
    </li>`;
  }
}

export default TodoView;
