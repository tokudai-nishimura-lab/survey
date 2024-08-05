const DMOSList = ["dmos_test_01.html", "dmos_test_02.html"];

document.addEventListener("DOMContentLoaded", () => {
  console.log("dmos : DOMContentLoaded.");
  // コンテナ生成の設定
  const containerDmos = document.getElementById("container-dmos");
  const { startQuestion, endQuestion } = getDmosQuestionRange(); // 質問範囲を取得

  if (containerDmos) {
    // 各コンテナのオーディオファイル名の配列

    for (let i = startQuestion; i < endQuestion; i++) {
      const containerHTML = `
                <div class="survey-container">
                    <p>${i + 1}問目</p>
                    <!-- 音声再生部分 -->
                    <div class="audio-wrapper">
                      <span>A：</span>
                      <audio controls>
                        <source src="${DMOSaudioFiles[i][0]}" type="audio/wav">
                        お使いのブラウザはaudio要素をサポートしていません。
                      </audio>
                    </div>
                    <div class="audio-wrapper">
                      <span>B：</span>
                      <audio controls>
                        <source src="${DMOSaudioFiles[i][1]}" type="audio/wav">
                        お使いのブラウザはaudio要素をサポートしていません。
                      </audio>
                    </div>
                    <!-- アンケート部分 -->
                    <fieldset>
                        <legend>音声の評価</legend>
                        <div class="radio-group">
                            <label>
                                <input type="radio" name="dmos-rating${
                                  i + 1
                                }" value="1" required> 1：完全に不自然
                            </label>
                            <label>
                                <input type="radio" name="dmos-rating${
                                  i + 1
                                }" value="2" required> 2：少し不自然
                            </label>
                            <label>
                                <input type="radio" name="dmos-rating${
                                  i + 1
                                }" value="3" required> 3：普通
                            </label>
                            <label>
                                <input type="radio" name="dmos-rating${
                                  i + 1
                                }" value="4" required> 4：少し自然
                            </label>
                            <label>
                                <input type="radio" name="dmos-rating${
                                  i + 1
                                }" value="5" required> 5：完全に自然
                            </label>
                        </div>
                        <div id="dmosError${i + 1}" class="error-message"></div>
                    </fieldset>
                </div>
            `;
      containerDmos.insertAdjacentHTML("beforeend", containerHTML);
    }
  }
  updateProgressBar();
  addButtons();
});

function getDmosQuestionRange() {
  console.log("<-- Function in " + getCallerName() + "-->");
  const currentdmosPage = getCurrentPage(); // DMOSの現在のページ数を取得

  // 設定に応じてページごとの質問セットを表示
  const startQuestion = (currentdmosPage - 2 - mosPages) * DMOSquestionsPerPage;
  const endQuestion = Math.min(
    startQuestion + DMOSquestionsPerPage,
    DMOStotalQuestions
  );
  return { startQuestion, endQuestion };
}

function validatedmosInfo() {
  console.log("<-- Function in " + getCallerName() + "-->");
  let valid = true;

  const { startQuestion, endQuestion } = getDmosQuestionRange(); // 質問範囲を取得
  for (let i = startQuestion; i < endQuestion; i++) {
    const dmosError = document.getElementById(`dmosError${i + 1}`);
    const dmosMessage = document.getElementById(`dmosMessage${i + 1}`);
    dmosError.textContent = "";
    let isChecked = false;
    const dmosInputs = document.querySelectorAll(
      `input[name="dmos-rating${i + 1}"]`
    );

    dmosInputs.forEach((input) => {
      if (input.checked) {
        isChecked = true;
      }
    });
    if (!isChecked) {
      dmosError.textContent = "この回答は必須です。";
      if (dmosMessage) dmosMessage.style.display = "block";
      valid = false;
    } else {
      if (dmosMessage) dmosMessage.style.display = "none";
    }
  }
  console.log(">> return vaild : " + valid);
  return valid;
}
