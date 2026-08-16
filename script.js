const form = document.querySelector("#food_form");
const recordList = document.querySelector("#record_list");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const date = document.querySelector("#date").value;
  const shop = document.querySelector("#shop").value;
  const price = document.querySelector("#price").value;
  const meal = document.querySelector("#meal").value;

  const record = document.createElement("div"); //建立動態HTML 元素
  record.innerHTML = `
    <p>日期：${date}</p>
    <p>店名：${shop}</p>
    <p>金額：¥${price}</p>
    <p>類型：${meal}</p>
  <button class="delete-btn">刪除</button>
    <hr>
  `; //把 HTML 放進剛剛建立的 div
  recordList.appendChild(record);
  const deleteButton = record.querySelector(".delete-btn");
  deleteButton.addEventListener("click", () => {
    record.remove();
  });
  form.reset();
});
