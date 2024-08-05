const MOSList = ["mos_test_01.html", "mos_test_02.html"];

document.addEventListener("DOMContentLoaded", () => {
  console.log("mos : DOMContentLoaded.");
  // コンテナ生成の設定
  const containerMos = document.getElementById("container-mos");
  const { startQuestion, endQuestion } = getMosQuestionRange(); // 質問範囲を取得

  if (containerMos) {
    // 各コンテナのオーディオファイル名の配列

    for (let i = startQuestion; i < endQuestion; i++) {
      const containerHTML = `
                <div class="survey-container">
                    <p>${i + 1}問目</p>
                    <!-- 音声再生部分 -->
                    <audio controls>
                        <source src="${MOSaudioFiles[i]}" type="audio/wav">
                        お使いのブラウザはaudio要素をサポートしていません。
                    </audio>
                    <!-- アンケート部分 -->
                    <fieldset>
                        <legend>音声の評価</legend>
                        <div class="radio-group">
                            <label>
                                <input type="radio" name="mos-rating${
                                  i + 1
                                }" value="1" required> 1：完全に不自然
                            </label>
                            <label>
                                <input type="radio" name="mos-rating${
                                  i + 1
                                }" value="2" required> 2：少し不自然
                            </label>
                            <label>
                                <input type="radio" name="mos-rating${
                                  i + 1
                                }" value="3" required> 3：普通
                            </label>
                            <label>
                                <input type="radio" name="mos-rating${
                                  i + 1
                                }" value="4" required> 4：少し自然
                            </label>
                            <label>
                                <input type="radio" name="mos-rating${
                                  i + 1
                                }" value="5" required> 5：完全に自然
                            </label>
                        </div>
                        <div id="mosError${i + 1}" class="error-message"></div>
                    </fieldset>
                </div>
            `;
      containerMos.insertAdjacentHTML("beforeend", containerHTML);
    }
  }
  updateProgressBar();
  addButtons();
});

function getMosQuestionRange() {
  console.log("<-- Function in " + getCallerName() + "-->");

  const currentPage = getCurrentPage(); // MOSの現在のページ数を取得

  // 設定に応じてページごとの質問セットを表示
  const startQuestion = (currentPage - 2) * MOSquestionsPerPage;
  const endQuestion = Math.min(
    startQuestion + MOSquestionsPerPage,
    MOStotalQuestions
  );

  return { startQuestion, endQuestion };
}

function validatemosInfo() {
  console.log("<-- Function in " + getCallerName() + "-->");
  let valid = true;

  const { startQuestion, endQuestion } = getMosQuestionRange(); // 質問範囲を取得
  for (let i = startQuestion; i < endQuestion; i++) {
    const mosError = document.getElementById(`mosError${i + 1}`);
    const mosMessage = document.getElementById(`mosMessage${i + 1}`);
    mosError.textContent = "";
    let isChecked = false;
    const mosInputs = document.querySelectorAll(
      `input[name="mos-rating${i + 1}"]`
    );

    mosInputs.forEach((input) => {
      if (input.checked) {
        isChecked = true;
      }
    });
    if (!isChecked) {
      mosError.textContent = "この回答は必須です。";
      if (mosMessage) mosMessage.style.display = "block";
      valid = false;
    } else {
      if (mosMessage) mosMessage.style.display = "none";
    }
  }
  console.log(">> return vaild : " + valid);
  return valid;
}
