/*
 * file name  : const.js
 * Date       : 2024/8/5
 * Author     : Kaito Koto
 * Function   : 変数を定義する
 */

/**
 * データ収集用のPythonサーバーの URL
 *
 * ※変更ポイント（ご自身で立てたPythonサーバーの URL に変更して下さい）
 */
const PostURL = "http://localhost:8080/save_data";

/**
 * MOS関連の音声リスト(テスト用)
 *
 * ※変更ポイント（使用する音声に変更して下さい）
 */
const MOStestaudioFiles = [
  "../wav/_num/0.wav",
  "../wav/_num/10.wav",
  "../wav/_num/20.wav",
];

/**
 * MOS関連の音声リスト
 *
 * ※変更ポイント（使用する音声に変更して下さい）
 */
const MOSaudioFiles = [
  ["../wav/_num/1.wav", 0,],
  ["../wav/_num/2.wav", 1,],
  ["../wav/_num/3.wav", 2,],
  ["../wav/_num/4.wav", 3],
  ["../wav/_num/5.wav", 4],
  ["../wav/_num/6.wav", 5],
  ["../wav/_num/7.wav", 6],
  ["../wav/_num/8.wav", 7],
  ["../wav/_num/9.wav", 8],
  ["../wav/_num/10.wav", 9],
  ["../wav/_num/11.wav", 10],
  ["../wav/_num/12.wav", 11],
  ["../wav/_num/13.wav", 12],
  ["../wav/_num/14.wav", 1,],
  ["../wav/_num/15.wav", 1,],
  ["../wav/_num/16.wav", 15],
  ["../wav/_num/17.wav", 16],
  ["../wav/_num/18.wav", 17],
  ["../wav/_num/19.wav", 18],
  ["../wav/_num/20.wav", 19],
];

/**
 * DMOS関連の音声リスト（テスト用）
 *
 * ※変更ポイント（使用する音声に変更して下さい）
 */
const DMOStestaudioFiles = [
  ["../wav/_num/0.wav", "../wav/_num/1.wav",],
  ["../wav/_num/0.wav", "../wav/_num/2.wav",],
  ["../wav/_num/0.wav", "../wav/_num/3.wav",],
];

/**
 * DMOS関連の音声リスト
 *
 * ※変更ポイント（使用する音声に変更して下さい）
 */
const DMOSaudioFiles = [
  ["../wav/_num/1.wav", "../wav/_num/2.wav", 0],
  ["../wav/_num/3.wav", "../wav/_num/4.wav", 1],
  ["../wav/_num/5.wav", "../wav/_num/6.wav", 2],
  ["../wav/_num/7.wav", "../wav/_num/8.wav", 3],
  ["../wav/_num/9.wav", "../wav/_num/10.wav", 4],
  ["../wav/_num/11.wav", "../wav/_num/12.wav", 5],
  ["../wav/_num/13.wav", "../wav/_num/14.wav", 6],
  ["../wav/_num/15.wav", "../wav/_num/16.wav", 7],
  ["../wav/_num/17.wav", "../wav/_num/18.wav", 8],
  ["../wav/_num/19.wav", "../wav/_num/20.wav", 9],
];


/**
 * HTMLのファイルリスト
 *
 * ※変更ポイント（HTMLのファイルが変わる場合は変更して下さい）
 * アンケートフォームの質問
 *
 * ※変更ポイント（出題する設問に応じてに変更して下さい）
 * @param {string} category - カテゴリ名。例えば "form", "mos", "dmos", "confirm" など
 * @param {string} html - htmlのファイル名
 * @param {number} total - カテゴリ内の全質問数
 * @param {number} perpage - 1ページあたりの質問数
 * @param {string} action - 問題に全て答えられているか検証する関数
 */
let HTML = [
  {
    category: "form",
    html: "form.html",
    total: 7,
    perpage: 7,
    action: "ValidFormInfo",
  },
  {
    category: "mos_pra",
    html: "mos_pra.html",
    total: MOStestaudioFiles.length,
    perpage: 5,
    action: "ValidSkipInfo",
  },
  {
    category: "mos",
    html: "mos.html",
    total: MOSaudioFiles.length,
    perpage: 5,
    action: "ValidMOSInfo",
  },
  {
    category: "dmos_pra",
    html: "dmos_pra.html",
    total: DMOStestaudioFiles.length,
    perpage: 5,
    action: "ValidSkipInfo",
  },
  {
    category: "dmos",
    html: "dmos.html",
    total: DMOSaudioFiles.length,
    perpage: 5,
    action: "ValidDMOSInfo",
  },
  {
    category: "confirm",
    html: "confirm.html",
    total: 0,
    perpage: 0,
    action: "noFunction", // confirm の場合は検証をスキップ
  },
];

for (let i = 0; i < HTML.length; i++) {
  let Pages = 1;
  if (HTML[i].total !== 0) {
    Pages = Math.ceil(HTML[i].total / HTML[i].perpage);
  }
  HTML[i].Pages = Pages;
  console.log("HTML.Pages" + HTML[i].Pages);
}

/**
 * 最大ページ数
 */
let MaxPage = 0;
for (let i = 0; i < HTML.length; i++) {
  MaxPage += HTML[i].Pages;
}
