/*
 * file name  : common.js
 * Date       : 2024/8/5
 * Author     : Kaito Koto
 * Function   : 各jsファイルで共通の変数と関数を定義する
 */

const HTML = [
  "startform.html",
  "mos_test_01.html",
  "mos_test_02.html",
  "dmos_test_01.html",
  "dmos_test_02.html",
  "confirm.html",
];

//////////////////////////////////////////////////
//              アンケートに関する変数              //
//////////////////////////////////////////////////
const PersonalQuestions = 3; // 最大質問数

//////////////////////////////////////////////////
//                 MOSに関する変数                //
//////////////////////////////////////////////////
const MOStotalQuestions = 20; // 最大質問数
const MOSquestionsPerPage = 10; // １ページの質問数

const MOSaudioFiles = [
  "../wav/_num/1.wav",
  "../wav/_num/2.wav",
  "../wav/_num/3.wav",
  "../wav/_num/4.wav",
  "../wav/_num/5.wav",
  "../wav/_num/6.wav",
  "../wav/_num/7.wav",
  "../wav/_num/8.wav",
  "../wav/_num/9.wav",
  "../wav/_num/10.wav",
  "../wav/_num/11.wav",
  "../wav/_num/12.wav",
  "../wav/_num/13.wav",
  "../wav/_num/14.wav",
  "../wav/_num/15.wav",
  "../wav/_num/16.wav",
  "../wav/_num/17.wav",
  "../wav/_num/18.wav",
  "../wav/_num/19.wav",
  "../wav/_num/20.wav",
];

//////////////////////////////////////////////////
//                DMOSに関する変数                //
//////////////////////////////////////////////////
const DMOStotalQuestions = 10; // 最大質問数
const DMOSquestionsPerPage = 5; // １ページの質問数

const DMOSaudioFiles = [
  ["../wav/_num/1.wav", "../wav/_num/2.wav"],
  ["../wav/_num/3.wav", "../wav/_num/4.wav"],
  ["../wav/_num/5.wav", "../wav/_num/6.wav"],
  ["../wav/_num/7.wav", "../wav/_num/8.wav"],
  ["../wav/_num/9.wav", "../wav/_num/10.wav"],
  ["../wav/_num/11.wav", "../wav/_num/12.wav"],
  ["../wav/_num/13.wav", "../wav/_num/14.wav"],
  ["../wav/_num/15.wav", "../wav/_num/16.wav"],
  ["../wav/_num/17.wav", "../wav/_num/18.wav"],
  ["../wav/_num/19.wav", "../wav/_num/20.wav"],
];

const mosPages = Math.ceil(MOStotalQuestions / MOSquestionsPerPage);
const dmosPages = Math.ceil(DMOStotalQuestions / DMOSquestionsPerPage);

//////////////////////////////////////////////////
//                    共通関数                   //
//////////////////////////////////////////////////
function getCallerName() {
  if (getCallerName.caller) {
    return getCallerName.caller.name || "anonymous function";
  } else {
    return "no caller (likely called from global scope)";
  }
}
/*
 * 現在のページ数を取得する
 */
function getCurrentPage() {
  console.log("<-- Function in " + getCallerName() + "-->");

  const currentPage = localStorage.getItem("currentPage");
  console.log("> getCurrentPage : " + currentPage);
  return currentPage ? parseInt(currentPage, 10) : 1;
}

function setCurrentPage(pageNumber) {
  console.log("<-- Function in " + getCallerName() + "-->");

  console.log(" >> Next page : " + pageNumber);

  localStorage.setItem("currentPage", pageNumber);
}

function updateProgressBar() {
  console.log("<-- Function in " + getCallerName() + "-->");
  const currentPageURL = window.location.pathname.split("/").pop();
  if (currentPageURL === HTML[HTML.length - 1]) {
    return;
  }
  const progressBar = document.getElementById("progress-bar");
  const progressText = document.getElementById("progress-text");

  const totalPages = 1 + mosPages + dmosPages;
  const currentprogPage = getCurrentPage();
  const progressPercentage = (currentprogPage / totalPages) * 100;

  progressBar.value = progressPercentage;
  progressText.textContent = `${progressPercentage.toFixed(0)}%`;
}

async function goToNextPage() {
  console.log("<-- Function in " + getCallerName() + "-->");
  let currentPage = 0;
  const currentPageURL = window.location.pathname.split("/").pop();
  console.log("Page URL : " + currentPageURL);

  // indexページ
  if (!currentPageURL || currentPageURL === "index.html") {
    currentPage = 1;
    setCurrentPage(currentPage);
    console.log("next page : ../html/" + HTML[0]);
    window.location.href = "../html/" + HTML[0];
  }
  // 最終問題ページ
  else if (currentPageURL === HTML[HTML.length - 2]) {
    const currentPage = getCurrentPage();
    // 検証
    let valid = Valid(currentPage);

    if (!valid) {
      return; // 検証が失敗した場合、ページ遷移を中止
    }
    // 送信
    await SubmitData();
    console.log("送信するでぇ");
    setCurrentPage(currentPage + 1);
    console.log("next page : " + HTML[currentPage]);
    window.location.href = HTML[currentPage];
  }
  //基本ページ
  else {
    const currentPage = getCurrentPage();
    // 検証
    let valid = Valid(currentPage);

    if (!valid) {
      return; // 検証が失敗した場合、ページ遷移を中止
    }
    setCurrentPage(currentPage + 1);
    saveFormData();
    console.log("next page : " + HTML[currentPage]);
    window.location.href = HTML[currentPage];
  }
}

function goToPreviousPage() {
  console.log("<-- Function in " + getCallerName() + "-->");

  let currentPage = getCurrentPage();
  const currentPageURL = window.location.pathname.split("/").pop();
  console.log("Page URL : " + currentPageURL);
  // 送信完了ページ
  if (currentPageURL === HTML[HTML.length - 1]) {
    // リセット
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      localStorage.removeItem(key);
    });
    // indexに飛ぶ
    console.log("top page : " + HTML[currentPage]);
    window.location.href = "../index.html";
  }
  // 最初の問題ページ
  else if (currentPageURL === HTML[0]) {
    currentPage = 0;
    setCurrentPage(currentPage);
    // indexに飛ぶ
    console.log("Jamp index!");
    window.location.href = "../index.html";
  }
  // 基本ページ
  else {
    setCurrentPage(currentPage - 1);
    console.log("Previous page : " + HTML[currentPage - 2]);
    window.location.href = HTML[currentPage - 2];
  }
}

function saveFormData() {
  console.log("<-- Function in " + getCallerName() + "-->");

  const form = document.getElementById("surveyForm");
  const formData = new FormData(form);

  formData.forEach((value, key) => {
    localStorage.setItem(key, value);
  });
  alert("保存アイテム数" + localStorage.length);
}

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
    if (currentPage === HTML.length - 1) {
      prevButton.type = "before";
      prevButton.textContent = "前のページへ";
      prevButton.onclick = goToPreviousPage;

      nextButton.type = "submit";
      nextButton.textContent = "送信";
      nextButton.onclick = goToNextPage;
    }
    // 送信完了ページのボタン
    else if (currentPage === HTML.length) {
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

function Valid(currentPage) {
  console.log("<-- Function in " + getCallerName() + "-->");
  let valid = true;
  if (currentPage <= 1) {
    console.log("Personl Valid.");
    valid = validatePersonalInfo();
  } else if (currentPage <= 1 + mosPages) {
    console.log("MOS Valid.");
    valid = validatemosInfo();
  } else if (currentPage <= 1 + mosPages + dmosPages) {
    console.log("DMOS Valid.");
    valid = validatedmosInfo();
  }
  return valid;
}

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
    const response = await fetch("http://localhost:8080/save_data", {
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
    alert("送信に成功しました！");
  } catch (error) {
    console.error("Error:", error);
    alert(
      "アンケートの送信に失敗しました。もう一度お試しください。 エラー内容: " +
        error.message
    );
  }
}
