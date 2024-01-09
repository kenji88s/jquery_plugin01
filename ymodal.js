(function ($) {

    var defaults = {

        readPlay: 'none',
        readIntervalTime: 60,
        readCount: 6,

        playAuto: true,

        loading: 'none',
        loadingSrc: 'ymodal/xml/ymodal-figure.xml',
        loadingSelector: '.self-building-square-spinner .square',
        loadingImage: 'none',
        loadingImageSrc: '',

        thumbArrow: true,

        closeStr: '閉じる',
        closeSeconds: 100,
        closeOverlay: true,

        sizeWidth: 560,
        sizeHeight: 315,

        storage: false,
        storageRemove: 180,

        youtubeParm: '?rel=0&mute=1&autoplay=0',

        /*
        // ページ遷移時にモーダル
        readPlay: 'none', // none（無し）, timeInterval（〇分毎に）, count（〇回毎に）, every（毎回）
        // ページ遷移時にモーダル（〇分毎に）を選択した場合、再度出現させたいときの分数
        readIntervalTime: 60,
        // ページ遷移時にモーダル（〇回毎に）を選択した場合、再度出現させたいときの回数
        readCount: 6,
    
        // ローディング完了後の自動再生
        playAuto: true, // true, false
    
        // ローディングアニメーションがコード（html,svg）もしくはアニメーションGIF
        loading: 'none', // none（無し）, code（コード）, image（アニメーションGIF）
        // 画像もしくはHTMLのパス
        loadingSrc: 'ymodal/xml/ymodal-figure.xml',
        // ローディングアニメーションがhtml,svgのときのセレクタ。ローディング完了後にアニメーションをストップ
        loadingSelector: '.self-building-square-spinner .square',
        // ローディングアニメーション時に動画の上に画像を表示
        loadingImage: 'none', // none（無し）, attr（src属性）, property（loadingImageSrcプロパティ）
        // ローディングアニメーション時に動画の上の画像のパス
        loadingImageSrc: '',
    
        // サムネイルの上の矢印
        thumbArrow: true, // true, false
    
        // 閉じるボタンの文言
        closeStr: '閉じる',
        // 閉じるボタンクリック後のフェードアウト秒数
        closeSeconds: 100,
        // オーバーレイ（黒の半透明）クリックで閉じる
        closeOverlay: true, // true, false

        // 動画の横幅
        sizeWidth: 560,
        // 動画の縦幅
        sizeHeight: 315,

        // セッションストレージの使用・不使用（readPlay: 'none'）
        storage: false // true, false
        // セッションストレージ削除の分数
        storageRemove: 180
        // セッションストレージのキー名
        storageKey: ''
        
        // youTube動画のパラメータ
        youtubeParm: '?rel=0&mute=1&autoplay=0'

        // モーダルが出現する前のアクション
        appearBefore: function() {
        },
        // モーダルが出現時のアクション
        appearAction: function() {
        },
        // モーダルが出現した後のアクション
        appearAfter: function() {
        },
        // モーダルが消える前のアクション
        hiddenBefore: function() {
        },
        // モーダルが消えるときのアクション
        hiddenAction: function() {
        },
        // モーダルが消えた後のアクション
        hiddenAfter: function() {
        },

        */
    }

    var plugin = [];
    const youtubeUrl = 'https://www.youtube.com/embed/';
    const figureSource = '<div class="fulfilling-bouncing-circle-spinner"><div class="circle"></div><div class="orbit"></div></div>';

    $.fn.ymodal = function (options, num = null) {
        
        if (num == null) {
            var element = $(this);
            for (var int = 0; int < element.length; int++) {
                element.ymodal(options, int);
            };
            if (plugin.length > 0) return false;
        } else {
            var element = $(this).eq(num);
        }

        var scrollTop;
        var playInfo;
        var modalSource;
        var loadingSource;


        /* ======================================================================================= */
        

        var settings = {};
        settings = $.extend({}, defaults, options);

        // すべての処理
        settings.modalAction = function () {
            if (settings.loadingSelect() && settings.modalOpen() && settings.finishLoading()) {
                $('a#modal_close').click(function () { settings.modalClose() });
                /* ↑ 「閉じる」ボタンの処理 */

                if (settings.closeOverlay) {
                    $('.modal_window').css({ 'cursor': 'pointer' }).click(function () { settings.modalClose() });
                    $('.modal_window_box').css({ 'cursor': 'default' }).click(function (event) { event.stopPropagation() });
                };
                /* ↑ オーバーレイ（黒の半透明、動画の領域は除く）クリックで閉じる処理（closeOverlay==true） */
            };
        };

        // ローディングアニメーションコードの形成
        settings.loadingSelect = function () {
            var code = '';
            if (settings.loading != 'none' && settings.loadingSrc != '') {
                if (settings.loading == 'image') var figure = `<img src="${settings.loadingSrc}" alt="">`;
                if (settings.loading == 'code') {
                    var figure = typeof loadingSource == 'undefined' ? figureSource : loadingSource;
                };
                /* ↑ アニメーションGIFもしくはコードの選択（html,svg） */

                var image = '';
                if (settings.loadingImage == 'attr' && element.find('img').length > 0) {
                    image = `<img src="${element.find('img').attr('src')}" alt="">`;
                };
                if (settings.loadingImage == 'property' && settings.loadingImageSrc != '') {
                    image = `<img src="${settings.loadingImageSrc}" alt="">`;
                };
                /* ↑ 動画の上に画像を選択（プロパティもしくはsrc属性） */

                code += `<div class="modal_window_thumb">${image}<div class="modal_loading">${figure}</div></div>`;
                /* ↑ コードの作成 */
            };
            modalSource = modalSource.replace('<!-- LOADING ANIMATION -->', code);
            return true;
        };

        // モーダルウィンドウが起動
        settings.modalOpen = function () {
            scrollTop = $(window).scrollTop();
            $('body').addClass('modal_opened').addClass('notscroll').prepend(modalSource);
            /* ↑ オーバーレイを許可＆スクロールを無効後、動画を表示 */
            return true;
        };

        // ローディング完了時の処理
        settings.finishLoading = function () {
            $('.modal_window_box iframe').load(function () {
                setTimeout(function () {
                    if(settings.deleteLoading() && settings.deleteThumb()) clearTimeout();
                }, 1000);
            });
            return true;
        };

        // ローディングアニメーションの削除（loading=='code',loadingSelector!=''）
        settings.deleteLoading = function () {
            if (settings.loading == 'code' && settings.loadingSelector != '') {
                $(settings.loadingSelector).css({ 'animation-play-state': 'paused' }).fadeOut(500, function () {
                    $(this).remove();
                });
            };
            return true;
        };

        // ローディング時のサムネイルの削除
        settings.deleteThumb = function () {
            $('.modal_window_thumb').fadeOut(500, function () {
                $(this).remove();
            });
            return true;
        };

        // モーダルウィンドウを閉じる
        settings.modalClose = function () {
            $('.modal_window').fadeOut(settings.closeSeconds, function () {
                $(this).remove();
                $('body').removeClass('modal_opened').removeClass('notscroll');
                $(window).scrollTop(scrollTop);
            });
            /* ↑ 動画を終了し、オーバーレイを無効＆スクロールを許可 */
        };

        // ローディングアニメーションのコードの非同期読込（loading=='code'）
        settings.loadingRead = function () {
            $.ajax({
                url: settings.loadingSrc,
                dataType: 'HTML',
            }).done(function (data) {
                console.log('ajax-success');
                loadingSource = data;
            }).fail(function (err) {
                console.log(err);
            });
            /* ↑ 非同期で外部XMLからコードを取得 */
        };

        plugin.push(settings);
        // console.log(settings);　


        /* ======================================================================================= */


        // セッションストレージ
        var storage_action = {

            // セッションストレージに保存するキー名の生成
            keyName: function () {
                var target = location.href.split('/').pop();
                // var target = location.href.split('/').pop().split('?').shift().split('.').shift();

                if (sessionStorage.getItem(`single-${target}`) == null && settings.readPlay != 'none') {
                    settings.storageKey = `single-${target}`;
                    settings.storage = true;
                    sessionStorage.setItem(`single-${target}`, element.selector);
                };
                /* ↑ readPlay: none（無し）以外のとき、キー名が存在しない場合、キー名を作成・ストレージに保存 */

                if (settings.readPlay == 'none' && settings.storage) {
                    settings.storageKey = `${element.selector}-${target}`;
                };
                /* ↑ readPlay: none（無し）のとき、ストレージが有効の場合、キー名を作成 */

                if (sessionStorage.getItem(`single-${target}`) != element.selector && settings.readPlay != 'none') {
                    settings.readPlay = 'none';
                    settings.storage = false;
                };
                /* ↑ readPlay: none（無し）以外のとき、キー名が存在する場合、ストレージを無効（有効は1ページに1個まで） */

                if (sessionStorage.getItem(`single-${target}`) == element.selector && settings.readPlay != 'none') {
                    settings.storageKey = `single-${target}`;
                    settings.storage = true;
                }
                /* ↑ readPlay: none（無し）以外のとき、キー名が存在する場合、キー名を作成（2回目以降） */
                
                return true;
            },

            // プロパティの設定／更新
            playInfo: function () {
                var data = JSON.parse(sessionStorage.getItem(settings.storageKey + '-playInfo'));
                if (data != null) {
                    data['count']++;
                    playInfo = data;
                } else {
                    playInfo = {
                        count: 0,
                        timestamp: Date.now(),
                        firsttime: Date.now(),
                        setMode: settings.readPlay,
                        setMinutes: settings.readIntervalTime,
                        setCount: settings.readCount,
                        setRemove: settings.storageRemove,
                    };
                };

                if (settings.storage) {
                    sessionStorage.setItem(settings.storageKey + '-playInfo', JSON.stringify(playInfo));
                };
                return true;
            },

            // モーダルウィンドウのコードの取得／読込
            modalSource: function () {
                var data = sessionStorage.getItem(settings.storageKey + '-modalSource');
                if (data != null) {
                    modalSource = data;
                } else {
                    storage_action.makeSource(storage_action.makeUrl());
                    if (settings.storage) {
                        sessionStorage.setItem(settings.storageKey + '-modalSource', modalSource);
                    };
                };
                return true;
            },

            // URLの形成
            makeUrl: function () {
                var target = element.attr('data-modal-url');
                var param = target.split('?').pop().split('=').pop();
                var url = youtubeUrl + param;
                if(settings.youtubeParm != '') url += settings.youtubeParm;
                url = url.replace('&autoplay=1', '').replace('&autoplay=0', '');
                if(settings.playAuto && settings.youtubeParm != '') url += '&autoplay=1';
                if(settings.playAuto && settings.youtubeParm == '') url += '?autoplay=1';
                return url;
            },

            // コードの形成
            makeSource: function (url) {
                modalSource = `<div class="modal_window"><div class="modal_window_box">`;
                modalSource += `<div class="modal_window_movie">`;
                modalSource += `<iframe src="${url}" width="${settings.sizeWidth}" height="${settings.sizeHeight}" `;
                modalSource += `frameborder="0"	allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>`;
                modalSource += `</iframe>`;
                modalSource += `<!-- LOADING ANIMATION -->`;
                modalSource += `</div>`;
                modalSource += `<div class="modal_window_btn"><a id="modal_close">${settings.closeStr}<span>×</span></a></div>`;
                modalSource += `</div></div>`;
            },

            // 該当するストレージの削除
            remove: function () {
                if(settings.storage && settings.readPlay == 'none') {
                    var data = JSON.parse(sessionStorage.getItem(settings.storageKey + '-playInfo'));
                };
                /* ↑ ストレージを有効かつreadPlay: none（無し）のとき、データを取り出す */
                if (data != null && ((Date.now() - data['firsttime']) > data['setRemove'] * 60000)) {
                    sessionStorage.removeItem(settings.storageKey + '-playInfo');
                    sessionStorage.removeItem(settings.storageKey + '-modalSource');
                };
                /* ↑ データに中身が存在かつ設定時間を経過している場合、削除 */
                return true;
            },
        };


        /* ======================================================================================= */


        // 即時
        if (settings.loading == 'code') {
            settings.loadingRead();
        };
        /* ↑ ローディングアニメーションがコードの場合、非同期を実行 */

        // ソースコード読み込み完了時
        $(function () {
            if (settings.thumbArrow) {
                element.append(`<span class="play"></span>`);
            };
            /* ↑ サムネイルの上の矢印を出現 */

            if (storage_action.keyName() && storage_action.playInfo() && storage_action.modalSource() && storage_action.remove()) {
                return false;
            };
            /* ↑ すべてのストレージのアクションの実行 */
        });

        // ページ全体読み込み完了時
        $(window).load(function () {
            if (settings.readPlay == 'every' || (settings.readPlay == 'count' && playInfo['count'] % playInfo['setCount'] == 0)) {
                settings.modalAction();
            };
            /* ↑ 「毎回」もしくは「〇回毎に」を選択した場合、モーダルを実行 */

            if (settings.readPlay == 'timeInterval' && ((Date.now() - playInfo['timestamp']) > playInfo['setMinutes'] * 60000 || playInfo['count'] == 0)) {
                playInfo['timestamp'] = Date.now();
                sessionStorage.setItem(settings.storageKey + '-playInfo', JSON.stringify(playInfo));
                settings.modalAction();
            };
            /* ↑ 「〇分毎に」を選択した場合、タイムスタンプをセッションストレージに再格納、モーダルを実行 */
        });

        // クリック時
        element.click(function () {
            settings.modalAction();
        });

    };

})(jQuery);