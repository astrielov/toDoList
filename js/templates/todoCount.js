
let items = 0;
let string = items % 10 === 1 ? 'item' : 'items';

const todoCountInnerHtml = `<strong>${items}</strong> item${string} left`;
