/*
 * file name  : common.js
 * Date       : 2024/8/5
 * Author     : Kaito Koto
 * Function   : 共通の関数を定義する
 */

////////////////////////////////////////////////////////////
//                   ページ遷移に関する関数                   //
////////////////////////////////////////////////////////////
/**
 * この関数を呼び出した関数の関数名を返す
 * @returns {string} 呼び出し元の関数名
 * @author Kaito Koto
 */
function getCallerName() {
  if (getCallerName.caller) {
    return getCallerName.caller.name || "anonymous function";
  } else {
    return "no caller (likely called from global scope)";
  }
}

/**
 * 現在のページ数を取得する
 * @returns {number} 現在のページ数
 * @author Kaito Koto
 */
function getCurrentPage() {
  console.log("<-- Function in " + getCallerName() + "-->");

  const currentPage = localStorage.getItem("currentPage");
  console.log("> getCurrentPage : " + currentPage);
  return currentPage ? parseInt(currentPage, 10) : 1;
}

/**
 * 現在のページ数を記録する
 * @param {number} pageNumber 記録するページ数
 * @author Kaito Koto
 */
function setCurrentPage(pageNumber) {
  console.log("<-- Function in " + getCallerName() + "-->");

  console.log(" >> Next page : " + pageNumber);

  localStorage.setItem("currentPage", pageNumber);
}

/**
 * 現在のページから指定する HTML の番号に変換する
 * @param {number} currentPage 現在のページ数
 * @returns {number} 指定するhtmlの番号
 * @author Kaito Koto
 */
function page2html(currentPage) {
  console.log("<-- Function in " + getCallerName() + "-->");
  let threshold = 0;

  for (let i = 0; i < HTML.length; i++) {
    threshold += HTML[i].Pages;

    if (currentPage <= threshold) {
      return i; // currentPageがthreshold以下になったときのインデックスを返す
    }
  }

  return HTML.length; // すべての範囲を超えた場合、配列の長さを返す
}

/**
 * 次のページに進む
 * @author Kaito Koto
 */
async function goToNextPage() {
  console.log("<-- Function in " + getCallerName() + "-->");
  let currentPage = 0;
  const currentPageURL = window.location.pathname.split("/").pop();
  console.log("Page URL : " + currentPageURL);

  // indexページ
  if (!currentPageURL || currentPageURL === "index.html") {
    currentPage = 1;
    setCurrentPage(currentPage);
    console.log("next page : ../html/" + HTML[0].html);
    console.error("jamp page.");
    window.location.href = "../html/" + HTML[0].html;
  }
  //基本ページ
  else {
    const currentPage = getCurrentPage();
    // 検証
    let validFunctionName = HTML[page2html(currentPage)].action; // 紐付けされた関数名を取得
    let validFunction = window[validFunctionName]; // 関数を指定
    let valid = validFunction(); // 検証を実行

    if (!valid) {
      return; // 検証が失敗した場合、ページ遷移を中止
    }
    // 最終問題ページ
    if (currentPage === MaxPage - 1) {
      await SubmitData();
      console.log("送信するでぇ");
    } else {
      saveFormData();
    }
    setCurrentPage(currentPage + 1);
    console.log("next page : " + HTML[page2html(currentPage + 1)].html);
    console.error("jamp page.");
    window.location.href = HTML[page2html(currentPage + 1)].html;
  }
}

/**
 * 前のページに戻る
 * @author Kaito Koto
 */
function goToPreviousPage() {
  console.log("<-- Function in " + getCallerName() + "-->");

  let currentPage = getCurrentPage();
  const currentPageURL = window.location.pathname.split("/").pop();
  console.log("Page URL : " + currentPageURL);
  // 送信完了ページ & 最初のページ
  if (
    currentPageURL === HTML[HTML.length - 1].html ||
    currentPageURL === HTML[0].html
  ) {
    // リセット
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      localStorage.removeItem(key);
    });
    currentPage = 0;
    setCurrentPage(currentPage);
    // indexに飛ぶ
    console.log("Jamp index!");
    console.error("jamp page.");
    window.location.href = "../index.html";
  }
  // 基本ページ
  else {
    setCurrentPage(currentPage - 1);
    console.log("Previous page : " + HTML[page2html(currentPage - 1)]);
    console.error("jamp page.");
    window.location.href = HTML[page2html(currentPage - 1)].html;
  }
}

////////////////////////////////////////////////////////////
//                  ページの構成に関する関数                  //
////////////////////////////////////////////////////////////
/**
 * 現在の進捗状況を返す（画面下の進捗バー）
 * @author Kaito Koto
 */
function updateProgressBar() {
  console.log("<-- Function in " + getCallerName() + "-->");
  const currentPageURL = window.location.pathname.split("/").pop();
  if (currentPageURL === HTML[HTML.length - 1].html) {
    return;
  }
  const progressBar = document.getElementById("progress-bar");
  const progressText = document.getElementById("progress-text");

  const totalPages = MaxPage - 1;
  console.log("totalPages" + totalPages);
  const currentprogPage = getCurrentPage();
  const progressPercentage = (currentprogPage / totalPages) * 100;

  console.log("progressPercentage" + progressPercentage);
  progressBar.value = progressPercentage;
  progressText.textContent = `${progressPercentage.toFixed(0)}%`;
}

/**
 * ページ下のボタンを作る
 * @author Kaito Koto
 */
function addButtons() {
  console.log("<-- Function in " + getCallerName() + "-->");
  const containerButton = document.getElementById("container-button");

  if (containerButton) {
    const buttonGroup = document.createElement("div");
    buttonGroup.className = "button-group";

    const prevButton = document.createElement("button");
    const nextButton = document.createElement("button");

    const currentPage = getCurrentPage();
    // 最終問題ページのボタン
    if (currentPage === MaxPage - 1) {
      prevButton.type = "before";
      prevButton.textContent = "前のページへ";
      prevButton.onclick = goToPreviousPage;

      nextButton.type = "submit";
      nextButton.textContent = "送信";
      nextButton.onclick = goToNextPage;
    }
    // 送信完了ページのボタン
    else if (currentPage === MaxPage) {
      prevButton.type = "before";
      prevButton.textContent = "別の解答";
      prevButton.onclick = goToPreviousPage;

      nextButton.type = "button";
      nextButton.textContent = "終了";
    }
    // 基本のボタン
    else {
      prevButton.type = "before";
      prevButton.textContent = "前のページへ";
      prevButton.onclick = goToPreviousPage;

      nextButton.type = "submit";
      nextButton.textContent = "次のページへ";
      nextButton.onclick = goToNextPage;
    }

    buttonGroup.appendChild(prevButton);
    buttonGroup.appendChild(nextButton);
    containerButton.appendChild(buttonGroup);
  }
}

////////////////////////////////////////////////////////////
//                  データの扱いに関する関数                  //
////////////////////////////////////////////////////////////
/**
 * アンケートのデータを記録する
 * @author Kaito Koto
 */
function saveFormData() {
  console.log("<-- Function in " + getCallerName() + "-->");

  const form = document.getElementById("surveyForm");
  const formData = new FormData(form);

  formData.forEach((value, key) => {
    localStorage.setItem(key, value);
  });
  console.log("保存アイテム数" + localStorage.length);
}

/**
 * アンケートのデータの復元
 * @author Kaito Koto
 */
function restoreFormData() {
  const form = document.getElementById("surveyForm");

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    const element = form.querySelector(`[name="${key}"]`);

    if (element) {
      if (element.type === "radio" || element.type === "checkbox") {
        // ラジオボタンとチェックボックスの値を復元
        const inputElement = form.querySelector(
          `[name="${key}"][value="${value}"]`
        );
        if (inputElement) {
          inputElement.checked = true;
        }
      } else if (
        element.type === "text" ||
        element.type === "email" ||
        element.type === "number" ||
        element.type === "hidden"
      ) {
        // テキスト入力、メール入力、数値入力、隠しフィールドの値を復元
        element.value = value;
      } else if (element.tagName === "TEXTAREA") {
        // テキストエリアの値を復元
        element.value = value;
      } else if (element.tagName === "SELECT") {
        // セレクトボックスの値を復元
        element.value = value;
      }
    }
  }
}

/**
 * アンケートのデータをサーバーに送信する
 * @author Kaito Koto
 */
async function SubmitData() {
  console.log("<-- Function in " + getCallerName() + "-->");

  const form = document.getElementById("surveyForm");
  saveFormData();

  // ローカルストレージからデータを読み込んで送信用の formDataToSend に追加
  const formDataToSend = new FormData();
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    formDataToSend.append(key, value);
  }

  try {
    // データを送信
    const response = await fetch(PostURL, {
      method: "POST",
      body: new URLSearchParams(formDataToSend),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }
    const data = await response.json();
    console.log("Success:", data);
    form.reset();
    localStorage.clear();
    console.error("送信に成功しました！");
  } catch (error) {
    console.error("Error:", error);
    alert(
      "アンケートの送信に失敗しました。もう一度お試しください。 エラー内容: " +
        error.message
    );
  }
}
