angular.module('splitText', [])
    .factory('utils', ['$http', function($http) {
        /**
         * Разбиваем на предложения
         * @param value
         * @returns {Array}
         */
        var splitOnSentences = function (value) {
            var bunch = []
            // Предложения
            var sents = value.match(/([A-Z<>&a-zА-Яа-я\?][^\.!?]*[\.!?])/g)
            //
            var textRight = value
            var textLeft = ""
            if (sents) {
                for (var i =0; i < sents.length; i++) {
                    var parts = textRight.split(sents[i])
                    textLeft = parts[0] + sents[i]
                    textRight = textRight.replace(textLeft, "")
                    bunch.push(parts[0])
                    bunch.push(sents[i])
                }
                if (textRight != "") {
                    bunch.push(textRight)
                }
            } else {
                bunch.push(value)
            }
            return bunch
        }
        /**
         * Отделяем HTML от текста
         * @param value
         * @returns {Array}
         */
        var splitTextAndHtml = function (value) {
            var bunch = []
            // куски текста и html
            var sents = value.match(/(<(.|\n)*?>)|[^><]+?(?=<|$)/g)
            if (sents) {
                for (var i =0; i < sents.length; i++) {
                    bunch.push(sents[i])
                }
            } else {
                bunch.push(value)
            }
            return bunch
        }
        var getCleanText = function (value) {
            var result = ""
            // куски текста и html
            var parts = value.match(/[^><]+?(?=<|$)/g)
            if (parts) {
                for (var i =0; i < parts.length; i++) {
                    result+=parts[i]
                }
            } else {
                result = value
            }
            return result
        }
        /**
         * Убираем лишние символы
         * @param value
         * @returns {*|string}
         */
        var escape = function(value) {
            return value
//                .replace(/&nbsp;/g, " ")
//                .replace("\"", "&rsquo;")
//                .replace(/&ldquo;/g, "\"")
//                .replace(/&raquo;/g, "»")
//                .replace(/&laquo;/g, "«")
                .replaceAll("'", "&#39;")
                .replaceAll("\"", "'")
                .replaceAll("&#39;", "&rsquo;")
//                .replace(/&mdash;/g, "-")
//                .replace(/&ndash;/g, "-")
        }
        var escapeForMethod = function(value) {
            return value
                .replaceAll("'", "&#39;")
                .replaceAll("&quot;", "&#39;")
        }
        /**
         * Нужно заменить все точки в тегах
         * @param value
         */
        var escapeDots = function(value) {
            var parts = value.match(/<(.|\n)*?>/g)
            for (var i =0; i < parts.length; i++) {
                if (parts[i].match(/.+\..+/g)) {
                    var tag = parts[i]
                    tag = tag.replaceAll(".", "&#46;")
                    tag = tag.replaceAll("?", "&#63;")
                    value = value.replaceAll(parts[i], tag)
                }
            }
            return value;
        }
        /**
         * Делим на слова, теги и разделители
         * @param item
         * @returns {*}
         */
        var splitOn = function (item) {
            if (item.splittedDescription) {
                return item.splittedDescription
            }
            var value = item.description
            value = escape(value)
            value = escapeDots(value)
            var bunch = []
            var sents = splitOnSentences(value)
            for (var k =0; k < sents.length; k++) {
                var array = splitTextAndHtml(sents[k])
                for (var i =0; i < array.length; i++) {
                    if (array[i].match(/[^><]+?(?=<|$)/g)) {
                        var words = array[i].match(/[\w'&;#]+/g)        //
                        var textRight = array[i]
                        var textLeft = ""
                        if (words && words.length) {
                            for (var j =0; j < words.length; j++) {
                                var parts = textRight.split(words[j])
                                textLeft = parts[0] + words[j]
                                textRight = textRight.replace(textLeft, "")
                                bunch.push({type : "space", value : parts[0]})
                                bunch.push({
                                    type : "word",
                                    value : words[j],
                                    sentence: getCleanText(sents[k])
                                })
                            }
                            // Добавляем оставшийся кусок
                            bunch.push({type : "space", value : textRight})
                        } else {
                            bunch.push({type : "tag", value : array[i]})
                        }
                    } else {
                        bunch.push({type : "tag", value : array[i]})
                    }
                }
            }
            item.splittedDescription = bunch
            return bunch
        }
        /**
         * Создаем html шаблон
         * @param item
         * @returns {string}
         */
        var htmlize = function (item) {
            if (!item.description) return;

            var html = ""
            var list = splitOn(item)
            for (var i =0; i < list.length; i++) {
                if (list[i].type == "word") {
//                    html += "<span class='trsl_word' ng-click='selectTrslWord(\""+list[i].value+"\")'>" + list[i].value + "</span>"
                    html += "<span class='dropdown' style='display: inline-block'>"
                            + "<span class='split-text-dropdown trsl_word' word=\"" + list[i].value + "\" sentence=\"" + list[i].sentence + "\">"
                                + list[i].value
                            + "</span>"
                            + "<span class='dropdown-menu'>"
                              + "<b class='align-center full_width trsl_title'>Перевод RU - EN</b>"
                            + "</span>"
                        + "</span>"
                } else {
                    html += list[i].value
                }
            }
            return html;
        }
        var getTranslate = function(word, callback) {
            $http({
                method: 'POST',
                url: '/translate',
                data: {
                    phrase: word,
                    langFrom: 'en',
                    langTo: 'ru'
                },
                showSpinner: true
            })
                .success(function(data) {
                    callback(data)
                })
                .error(function(data){
                    deferred.resolve("error value");
                });
        }
        return {
            htmlize: htmlize,
            getTranslate: getTranslate,
            escapeForMethod: escapeForMethod
        };
    }])
    .directive('splitText', ['utils', '$compile', function(utils, $compile) {
        return function($scope, element, attrs) {
            $scope.$watch(attrs.splitText,function(value){
                element.replaceWith(value);
            });
        }
    }])
    .directive('splitText2', ['$document', '$location', '$http', '$compile', 'utils', function ($document, $location, $http, $compile, utils) {
        var openElement = null,
            closeMenu = angular.noop;
        var getWord = function () {
            s = window.getSelection();
            var range = s.getRangeAt(0);
            var node = s.anchorNode;
            while (range.toString().indexOf(' ') != 0) {
                range.setStart(node, (range.startOffset - 1));
            }
            range.setStart(node, range.startOffset + 1);
            do {
                range.setEnd(node, range.endOffset + 1);
            } while (range.toString().indexOf(' ') == -1 && range.toString().trim() != '');
            var word = range.toString().trim()
            console.info(word);
            return word;
        }
        var inBorder = function (value) {
            return value.indexOf('.') == -1 && value.indexOf('!') == -1 && value.indexOf('?') == -1
        }
        var getContext = function () {
            s = window.getSelection();
            var range = s.getRangeAt(0);
            var node = s.anchorNode;
            while (inBorder(range.toString())) {
                //Нельзя переступать за манимальный диапазон
                if (range.startOffset - 1 < 0) {
                    break;
                }
                range.setStart(node, (range.startOffset - 1));
                //Если дошли до конца границы, то вернемся на шаг назад и прервемся
                if (!inBorder(range.toString())) {
                    range.setStart(node, (range.startOffset + 1));
                    break;
                }
            }
            do {
                console.info(range.toString());
                range.setEnd(node, range.endOffset + 1);
            } while (inBorder(range.toString()));
            var word = range.toString().trim()
            console.info(word);
            return word;
        }
        return {
            restrict: 'CA',
            link: function (scope, element, attrs) {
                scope.$watch('$location.path', function () {
                    closeMenu();
                });
                element.parent().bind('click', function () {
                    closeMenu();
                });
                element.bind('click', function (event) {
                    var word = getWord();
                    var sentence = getContext();

                    var elementWasOpen = (element === openElement);
                    event.preventDefault();
                    event.stopPropagation();

                    if (!!openElement) {
                        closeMenu();
                    }

                    // Перевод и упаковка в html
                    utils.getTranslate(word, function (data) {
                        console.info(data);
                        var dp = element.parent().children(".dropdown-menu")

                        var html = "<ul class='dropdown-menu trsl-list'>"
                            + "<b class='align-center full_width trsl_title'>Перевод RU - EN</b><hr/>"
                        if (data.translations && data.translations.length > 0) {
                            for (var j = 0; j < data.translations.length; j++) {
                                html += "<p>"
                                    + "<i class='icon-bookmark-empty green bigger-125' style='position: inherit; padding-right: 9px;' "
                                    + "ng-click='addToCard(\"" + word + "\",\"" + data.translations[j] + "\", "
                                    + "\"" + data.transcription + "\", "
                                    + "\"" + utils.escapeForMethod(sentence) + "\"" + ")'"
                                    + "title='Добавить в карточки'>"
                                    + " </i>"
                                    + data.translations[j]
                                    + "</p>"
                            }
                        } else {
                            html += "<p>Перевод не найден</p>"
                        }
                        html += "</ul>"
                        dp.replaceWith($compile(html)(scope));

                        element.parent().addClass('open');
                    })
                    //
                    openElement = element;
                    closeMenu = function (event) {
                        if (event) {
                            event.preventDefault();
                            event.stopPropagation();
                        }
                        $document.unbind('click', closeMenu);
                        element.parent().removeClass('open');
                        closeMenu = angular.noop;
                        openElement = null;
                    };
                    $document.bind('click', closeMenu);
                });
            }
        };
    }])
    .directive('splitText3', ['$document', '$location', '$http', '$compile', 'utils', '$modal',
        function ($document, $location, $http, $compile, utils, $modal) {
            var wrapSelected = function () {
            if (window.getSelection) {
                t = window.getSelection();
            } else if (document.getSelection) {
                t = document.getSelection();
            } else if (document.selection) {
                t = document.selection.createRange().text;
            }
            chucknorris = document.createElement("b");

            var range = t.getRangeAt(0).cloneRange();
            range.surroundContents(chucknorris); // Does not work for different ranges
            t.removeAllRanges();
            t.addRange(range);

            return t;
        }

        function getSelectedText() {
            var text = "";
            if (typeof window.getSelection != "undefined") {
                text = window.getSelection().toString();
            } else if (typeof document.selection != "undefined" && document.selection.type == "Text") {
                text = document.selection.createRange().text;
            }
            return text;
        }

        return {
            restrict: 'CA',
            link: function (scope, element, attrs) {
                element.bind('click', function (event) {
                    var word = getSelectedText();
                    if (word) {
                        console.info(word)
                        utils.getTranslate(word, function (data) {
                            console.info(data)
                            var modalInstance = $modal.open({
                                templateUrl: contextPath + '/pages/dialogs/translation',
                                controller: 'translationController',
                                size: "sm",
                                resolve: {
                                    data: function ($q, $http) {
                                        var deferred = $q.defer();
                                        deferred.resolve({
                                            word: word,
                                            translations: data.translations,
                                            lessonId: scope.lesson.id,
                                            cards: scope.cards,
                                        })
                                        return deferred.promise;
                                    }
                                }
                            });
                        })
                    }
                    event.preventDefault();
                    event.stopPropagation();
                });
            }
        };
    }])
    .directive('splitTextDropdown', ['$document', '$location', '$http', '$compile', 'utils', function ($document, $location,
                                                                                              $http, $compile, utils) {
        var openElement = null,
            closeMenu   = angular.noop;
        return {
            restrict: 'CA',
            link: function(scope, element, attrs) {
                scope.$watch('$location.path', function() { closeMenu(); });
                element.parent().bind('click', function() { closeMenu(); });
                element.bind('click', function (event) {
                    var elementWasOpen = (element === openElement);

                    event.preventDefault();
                    event.stopPropagation();

                    if (!!openElement) {
                        closeMenu();
                    }

                    if (!elementWasOpen && !element.hasClass('disabled') && !element.prop('disabled')) {
                        // Перевод и упаковка в html
                        utils.getTranslate(attrs.word, function(data) {
                            var dp = element.parent().children(".dropdown-menu")

                            var html = "<ul class='dropdown-menu trsl-list'>"
                                        + "<b class='align-center full_width trsl_title'>Перевод RU - EN</b><hr/>"
                            if (data.translations && data.translations.length > 0) {
                                for (var j =0; j < data.translations.length; j++) {
                                    html += "<p>"
                                        + "<i class='icon-bookmark-empty green bigger-125' style='position: inherit; padding-right: 9px;' "
                                        + "ng-click='addToCard(\""+attrs.word + "\",\"" + data.translations[j]+"\", "
                                        + "\"" + data.transcription+"\", "
                                        + "\"" + utils.escapeForMethod(attrs.sentence) + "\"" + ")'"
                                        + "title='Добавить в карточки'>"
                                        + " </i>"
                                        + data.translations[j]
                                        + "</p>"
                                }
                            } else {
                                html+= "<p>Перевод не найден</p>"
                            }
                            html += "</ul>"
                            dp.replaceWith($compile(html)(scope));

                            element.parent().addClass('open');
                        })
                        //
                        openElement = element;
                        closeMenu = function (event) {
                            if (event) {
                                event.preventDefault();
                                event.stopPropagation();
                            }
                            $document.unbind('click', closeMenu);
                            element.parent().removeClass('open');
                            closeMenu = angular.noop;
                            openElement = null;
                        };
                        $document.bind('click', closeMenu);
                    }
                });
            }
        };
    }])
//    .directive('colorbox', function($compile, $rootScope){
//        return {
//            link: function(scope, element, attrs){
//                element.bind('click', function(e){
//                    $.colorbox({
//                        href: attrs.colorbox,
//                        onComplete: function(){
//                            $rootScope.$apply(function(){
//                                var content = $('#cboxLoadedContent');
//                                $compile(content)($rootScope);
//                            })
//                        }
//                    });
//                    e.preventDefault();
//                });
//            }
//        };
//    });
//    .directive('colorbox', function($compile, $rootScope){
//        return {
//            link: function(scope, element, attrs){
//                element.bind('click', function(e){
//                    $(element).colorbox({
//                        onComplete: function(){
//                            $rootScope.$apply(function(){
//                                var content = $('#cboxLoadedContent');
//                                $compile(content)($rootScope);
//                            })
//                        }
//                    });
//                    e.preventDefault();
//                });
//            }
//        };
//    });

.directive('colorbox', function($compile, $rootScope){
    return {
        link: function(scope, element, attrs){
            element.click('bind', function(){
                $.colorbox({
                    href: attrs.colorbox,
                    onComplete: function(){
                        $rootScope.$apply(function(){
                            var content = $('#cboxLoadedContent');
                            $compile(content)($rootScope);
                        })
                    }
                });
            });
        }
    };
});
//    .directive('colorbox', function() {
//        return {
//            restrict: 'A',
//            link: function (scope, element, attrs) {
//                $(element).colorbox(attrs.colorbox);
//
//
//                // UI-ROUTER FIX (clicking resulted in location change in browser)
//                $(element).bind('click', function(e) {
//                    e.preventDefault();
//                });
//            }
//            }
//        });
//    .directive('colorbox', [function() {
//        return {
//            restrict: 'A',
//            link: function(scope, element, attrs) {
//                $(element).colorbox({
//                    photo: true,
//                    scalePhotos: true,
//                    maxWidth: '600px'
//                });
//
//                // UI-ROUTER FIX (clicking resulted in location change in browser)
//                $(element).bind('click', function(e) {
//                    e.preventDefault();
//                });
//            }
//        };
//    }]);