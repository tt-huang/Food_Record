//========== 讀取 localStorage 資料 ==========
let records = JSON.parse(localStorage.getItem("records")) || []; // records: 存放所有外食紀錄的陣列
let editingIndex = null; //null : 現在沒有資料，所以是「新增模式」。

//==========  取得HTML元素 ==========
const form = document.querySelector("#food_form");
const recordList = document.querySelector("#record_list");

allRecords();

//========== 顯示資料 ==========
function allRecords() {
  //==========  清空原本的內容，並建立清單標題 ==========
  recordList.innerHTML = `
    <div class="record-header">
      <span>日付</span>
      <span>店名</span>
      <span>種類</span>
      <span>金額</span>
      <span>操作</span>
    </div>
  `;
  //==========  顯示清單資料 ==========
  records.forEach((recordData, index) => {
    //records 裡的資料一筆一筆拿出來
    // recordData = 目前這一筆資料
    // index = 目前這一筆資料在陣列中的位置
    const record = document.createElement("div"); //建立一個新的 <div> 元素，並把它放進 record 這個變數裡
    record.className = "record"; // 加上 record class，讓 CSS 套用每筆紀錄的樣式
    record.innerHTML = `
      <span>${recordData.date}</span>
      <span>${recordData.shop}</span>
      <span>${recordData.meal}</span>
      <span>¥${recordData.price}</span>
      <button class="delete-btn">削除</button>
      <button class="edit-btn">編集</button>
    `;

    //========== 刪除紀錄 ==========
    const deleteButton = record.querySelector(".delete-btn");
    deleteButton.addEventListener("click", () => {
      // ① 按刪除
      const result = confirm("確定要刪除這筆紀錄嗎？"); // ② 跳出瀏覽器的確認視窗
      if (result) {
        records.splice(index, 1); // ③　 從records陣列裡的位置(index) 開始刪除1筆資料
        localStorage.setItem("records", JSON.stringify(records)); //④ 將 records 轉成 JSON 字串，並儲存到 localStorage
        allRecords(); // ⑤ 重新顯示
      }
    });
    //========== 刪除紀錄 end ==========

    //========== 編集紀錄 ==========
    const editButton = record.querySelector(".edit-btn");
    editButton.addEventListener("click", () => {
      // ① 按編集
      editingIndex = index; // ② 記住編輯的是哪一筆資料放入editingIndex
      document.querySelector("#date").value = recordData.date;
      document.querySelector("#shop").value = recordData.shop;
      document.querySelector("#price").value = recordData.price;
      document.querySelector("#meal").value = recordData.meal;
      document.querySelector(".submit-btn").textContent = "更新"; //找到「新增」按鈕，把按鈕上的文字改成「更新」
      document.querySelector(".submit-btn").classList.add("update-mode"); // 幫按鈕加上 update-mode class，切換成更新模式的樣式
    });
    //========== 編集紀錄 end  ==========

    recordList.appendChild(record); //把剛剛建立的 record 加到 recordList裡面
  });
}

//========== 新增資料 ==========
form.addEventListener("submit", (event) => {
  // ① 按新增
  event.preventDefault(); //阻止瀏覽器原本的預設行為(重新整理頁面)
  const inputDate = document.querySelector("#date").value; // ②取得日期
  const inputShop = document.querySelector("#shop").value; // ②取得店名
  const inputPrice = document.querySelector("#price").value; // ②取得金額
  const inputMeal = document.querySelector("#meal").value; //　②取得種類
  const recordData = {
    //③　　建立Object(recordData)
    date: inputDate,
    shop: inputShop,
    price: inputPrice,
    meal: inputMeal,
  };

  //④  判斷： 新增 or 修改
  if (editingIndex === null) {
    records.push(recordData); //⑤　新增　：　把這一筆 recordData 放進 records 陣列
  } else {
    records[editingIndex] = recordData; // ⑤　更新 : 找到 editingIndex 指定的那一筆資料，換成新的 recordData
    editingIndex = null; // ⑥ 更新完成，回到新增模式
    document.querySelector(".submit-btn").textContent = "新增"; // ⑦　將按鈕上的文字改回新增
    document.querySelector(".submit-btn").classList.remove("update-mode"); // 移除 update-mode class，恢復新增模式的樣式
  }

  localStorage.setItem("records", JSON.stringify(records)); //⑧ 將 records 轉成 JSON 字串，並儲存到 localStorage
  allRecords(); //　　⑨ 重新顯示
});

//========== 日期預設為今天 ==========
const dateInput = document.querySelector("#date"); // ① 取得日期輸入框
const today = new Date().toISOString().split("T")[0]; // ② 取得今天的日期，轉成 YYYY-MM-DD 格式
dateInput.value = today; // ③　將今天的日期放入日期輸入框

//========== 店名快捷按鈕　==========
const shopInput = document.querySelector("#shop"); // ① 取得店名輸入框
const shopButtons = document.querySelectorAll(".shop-btn"); // ② 取得所有店名快捷按鈕
shopButtons.forEach((button) => {
  // ③ 逐一處理每個店名快捷按鈕
  button.addEventListener("click", () => {
    // ④ 按下店名快捷按鈕
    shopInput.value = button.dataset.shop; //  ⑤ 將按鈕的 data-shop 值放入店名輸入框
  });
});

//========== 午餐 / 晚餐按鈕　==========
const mealInput = document.querySelector("#meal"); // 取得種類的 hidden input
const mealButtons = document.querySelectorAll(".meal-btn"); // 取得所有午餐 / 晚餐按鈕
mealButtons.forEach((button) => {
  // 逐一處理每個午餐 / 晚餐按鈕
  button.addEventListener("click", () => {
    // 按下午餐 / 晚餐按鈕

    mealButtons.forEach((btn) => {
      // 先移除所有按鈕的 active
      btn.classList.remove("active");
    });

    button.classList.add("active");
    // 幫目前點擊的按鈕加上 active

    mealInput.value = button.dataset.meal;
    // 將目前按鈕的 data-meal 值存進 hidden input
  });
});
