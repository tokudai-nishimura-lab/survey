/*
 * file name  : mos_pra.js
 * Date       : 2025/1/18
 * Author     : Kaito Koto
 * Function   : 「mos_pra」に関する関数を定義する
 */

document.addEventListener("DOMContentLoaded", () => {
  console.log("mos_pra : DOMContentLoaded.");
  // コンテナ生成の設定
  const containerMos = document.getElementById("container-mos");
  const { startQuestion, endQuestion } = getQuestionRange(); // 質問範囲を取得

  if (containerMos) {
    // 各コンテナのオーディオファイル名の配列
    const isMobile = window.innerWidth <= 600;

    for (let i = startQuestion; i < endQuestion; i++) {
      let surveyHTML;

      if (isMobile) {
        // スマホ版のリッカート尺度
        surveyHTML = `
          <div class="likert-group">
            <input type="range" name="mos-rating${(i + 1).toString().padStart(2, '0')}" min="1" max="5" value="1" required>
            <div class="likert-labels">
              <span>1<br>完全に<br>不自然</span>
              <span>2</span>
              <span>3<br>どちら<br>でもない</span>
              <span>4</span>
              <span>5<br>完全に<br>自然</span>
            </div>
          </div>
        `;
      } else {
        // PC版のラジオボタン
        surveyHTML = `
          <div class="radio-group">
              <label>
                  <input type="radio" name="mos-rating${(i + 1).toString().padStart(2, '0')}" value="1" required> 1：完全に不自然
              </label>
              <label>
                  <input type="radio" name="mos-rating${(i + 1).toString().padStart(2, '0')}" value="2" required> 2：少し不自然
              </label>
              <label>
                  <input type="radio" name="mos-rating${(i + 1).toString().padStart(2, '0')}" value="3" required> 3：どちらでもない
              </label>
              <label>
                  <input type="radio" name="mos-rating${(i + 1).toString().padStart(2, '0')}" value="4" required> 4：少し自然
              </label>
              <label>
                  <input type="radio" name="mos-rating${(i + 1).toString().padStart(2, '0')}" value="5" required> 5：完全に自然
              </label>
          </div>
        `;
      }

      const containerHTML = `
        <div class="survey-container">
          <p>例題 ${i + 1}問目</p>
          <!-- 音声再生部分 -->
          <audio controls>
            <source src="${MOStestaudioFiles[i]}" type="audio/wav">
            お使いのブラウザはaudio要素をサポートしていません。
          </audio>
          <!-- アンケート部分 -->
          <fieldset>
            <legend>音声の評価</legend>
            ${surveyHTML}
            <div id="mosError${i + 1}" class="error-message"></div>
          </fieldset>
        </div>
            `;
      containerMos.insertAdjacentHTML("beforeend", containerHTML);
    }

    // リッカート尺度のinput要素にchangeイベントリスナーを追加
    const likertInputs = document.querySelectorAll('.likert-group input[type="range"]');
    likertInputs.forEach(input => {
      input.addEventListener('change', () => {
        input.setAttribute('data-checked', 'true');
      });
    });
  }
  updateProgressBar(); // 現在の進捗バーの表示
  addButtons(); // ボタンの表示
  restoreFormData(); // 保存した解答の復元
});

/**
 * 検証をスキップする
 * @returns {boolean} 検証結果
 * @author Kaito Koto
 */
window.ValidSkipInfo = function () {
  console.log("<-- Function in " + getCallerName() + "-->");
  let valid = true;
  // シャッフルのシード値を5桁のランダムな数で再定義
  setseed();
  console.log(">> return vaild : " + valid);
  return valid;
};
