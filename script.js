// 從瀏覽器的 localStorage 裡拿以前存的資料 → records
// JSON.parse()：把 JSON 字串轉回 JS　資料
// || []: 把以前保存的紀錄拿出來，如果沒有，就建立一個空的陣列
let records = JSON.parse(localStorage.getItem("records")) || [];
let editingIndex = null;

// 取得 HTML 元素
const form = document.querySelector("#food_form");
const recordList = document.querySelector("#record_list");

// 顯示所有紀錄
function allRecords() {
  // 清空目前畫面上的列表，避免重複繪製
  recordList.innerHTML = `
  <div class="record-header">
    <span>日期</span>
    <span>店名</span>
    <span>類型</span>
    <span>金額</span>
    <span>操作</span>
  </div>
`;

  // 透過 forEach 逐筆處理資料
  // recordData：目前處理的資料 ， index： 這筆資料在陣列裡的位置
  records.forEach((recordData, index) => {
    const record = document.createElement("div");

    record.className = "record"; //告訴 CSS這個 div 是一筆紀錄
    //把資料放進 HTML
    record.innerHTML = `
      <span>${recordData.date}</span>
      <span>${recordData.shop}</span>
      <span>${recordData.price}</span>
      <span>${recordData.meal}</span>
      <button class="edit-btn">修改</button>
      <button class="delete-btn">刪除</button>
      <hr>
    `;

    // 當前這筆紀錄的定點擊事件
    const editButton = record.querySelector(".edit-btn");
    const deleteButton = record.querySelector(".delete-btn");

    editButton.addEventListener("click", () => {
      editingIndex = index;
      document.querySelector("#date").value = recordData.date;
      document.querySelector("#shop").value = recordData.shop;
      document.querySelector("#price").value = recordData.price;
      document.querySelector("#meal").value = recordData.meal;
    });

    deleteButton.addEventListener("click", () => {
      const result = confirm("確定要刪除這筆紀錄嗎？");

      if (result) {
        records.splice(index, 1);
        localStorage.setItem("records", JSON.stringify(records));
        allRecords();
      }
    });

    //把 <div> 放進畫面
    recordList.appendChild(record);
  });
}

// 網頁初次載入時，立即執行一次以顯示歷史紀錄
allRecords();

// 新增紀錄
form.addEventListener("submit", (event) => {
  //阻止表單預設行為
  event.preventDefault();

  // 取得表單輸入值
  const date = document.querySelector("#date").value;
  const shop = document.querySelector("#shop").value;
  const price = document.querySelector("#price").value;
  const meal = document.querySelector("#meal").value;

  // 建立一筆 Object
  const recordData = {
    date: date,
    shop: shop,
    price: price,
    meal: meal,
  };

  if (editingIndex === null) {
    // 新增紀錄
    records.push(recordData);
  } else {
    // 修改紀錄
    records[editingIndex] = recordData;
    editingIndex = null;
  }

  localStorage.setItem("records", JSON.stringify(records));

  allRecords();

  form.reset();
});
