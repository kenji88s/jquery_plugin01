# 【jQuery】動画をオーバーレイで表示するプラグイン

## 開発環境／実行環境
ruby 2.6.5p114  
※shadowbox.jsなど別プラグインを使うことをお勧めします   
ページ単位

## 特徴／説明
- 動画はYouTubeのみ
- ローディングアニメーションの指定が可（CSSアニメーションもしくはアニメーションGIF）
- セッションストレージにHTMLコードの保存し、ページ遷移時に即実行
- readPlay→none：1ページに複数可、timeInterval　count　every：最初の設定した1個のみそれ以外はnone

## 設定項目
| プロパティ | 初期値 | 説明 | 
|:------------|:------------|:------------|
| readPlay | none | ページ遷移時にモーダル<br><small>値：none（無し）／ timeInterval（時間間隔）／ count（〇回毎に）／ every（毎回）<small> |
| readIntervalTime | 60 | ページ遷移時にモーダル（時間間隔）を選択した場合、再度出現させたいときの分数
| readCount | 6 | ページ遷移時にモーダル（〇回毎に）を選択した場合、再度出現させたいときの回数
| playAuto | true | ローディング完了後の自動再生<br>値：true ／ false | | 
| loading | none | ローディングアニメーションがコード（html,svg）もしくはアニメーションGIF<br>値：none（無し） ／ code（html,svg） ／ image（アニメーションGIF） |
| loadingSrc | ymodal/xml/ymodal-figure.xml | 画像もしくはHTMLのパス |
| loadingSelector | *[class^=".fulfilling-"] | ローディングアニメーションがhtml,svgのときのセレクタ。ローディング完了後にアニメーションをストップ |
| thumbnail | true | ※
| thumbnailSrc |  | ※
| thumbArrow | true | サムネイルの上の矢印<br>値：true ／ false |
| closeStr | 閉じる | 閉じるボタンクリックの文言 |
| closeSeconds | 100 | 閉じるボタンクリック後のフェードアウト秒数 |
| closeOverlay | true | オーバーレイ（黒の半透明）クリックで閉じる<br>値：true ／ false |
| sizeWidth | 560 | 動画の横幅 |
| sizeHeight | 315 | 動画の縦幅 |
| storage | false | セッションストレージの使用・不使用（readPlay: 'none'）<br>値：true ／ false |
| storageKey |  | ※
| storageRemove | 180 | セッションストレージ削除の分数 |
| youtubeParm | ?rel=0&autoplay=1&mute=1 | youTube動画のパラメータ |

## ディレクトリ／ファイル説明
| ディレクトリ／ファイル | 説明 | 
|:------------|:------------|
| css/ymodal.css | オーバーレイの体裁 |
| css/ymodal-loading.css | ローディングアニメーションに使用するCSS |
| image/loading.gif | ローディングアニメーションに使用するアニメーションGIF |
| xml/ymodal-figure.xml | ローディングアニメーションに使用するHTMLコード | 

## セッションストレージ内容 例

## コード設置 例
```end.cmd
<head>
<link rel="stylesheet" href="ymodal/css/ymodal.css">
<link rel="stylesheet" href="ymodal/css/ymodal-loading.css">
/* ↑ data-modal-urlに対象のYouTube動画のURLを記載 */
</head>

...

<a class="modal_open_btn modal_a" data-modal-url="https://www.youtube.com/watch?v=●●●"><img　src="img/sample.jpg" alt=""></a>
/* ↑ data-modal-urlに対象のYouTube動画のURLを記載 */
...

<script src="ymodal/ymodal.js"></script>
<script>
$(function () {
   $('.modal_a').ymodal({
      closeStr: 'cle',
      readPlay: 'none',
      playAuto: false,
      storageKey: 'tesggggfffffft'
   });
});
</script>
/* ↑ data-modal-urlに対象のYouTube動画のURLを記載 */
</body>
```

## 好みにカスタマイズ
- http://urbanqee.com/doga/youtube-thumbnail-dl.php
- https://developers.google.com/youtube/player_parameters?hl=ja
- https://icons8.com/preloaders/en/search/loading
- https://www.webcreatorbox.com/tech/loading-animation
