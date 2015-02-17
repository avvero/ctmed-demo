var Lingua = {}

Lingua.translateIt = function (elem) {
    var elem = jQuery(elem);
    var scope = angular.element(elem).scope()
    var $http = scope.$http
    var $modal = scope.$modal


    var word = elem.html()
    var sentence = elem.attr("s")
    // Если в S не контекст, а ссылка, то получим контекст
    if (sentence.indexOf("#") == 0) {
        sentence = $(sentence).attr("s")
    }

    Lingua.getTranslate($http, word, function (data) {

        // Если нет родителя
        if (!elem.closest(".dropdown")[0]) {
            var d = document.createElement('span');
            $(d).addClass("dropdown")
            elem.replaceWith(d)
            $(d).append(elem)
            Lingua.setEventsForChildW($(d))
        }
        // Если нет, то добавим элемент для начала меню
        var dp = elem.parent().children(".dropdown-menu")
        if (dp.length == 0) {
            elem.parent().append("<w class='dropdown-menu'></w>")
            dp = elem.parent().children(".dropdown-menu")
        }

        var html = "<ul class='dropdown-menu trsl-list'>"
            + "<b class='align-center full_width trsl_title'>" + word + "</b><i class='icon-remove bigger-125 trsl_close'/><hr/>"
        if (data.translations && data.translations.length > 0) {
            for (var j = 0; j < data.translations.length; j++) {
                html += "<p>"
                    + "<i class='icon-plus-sign green bigger-125' style='position: inherit; padding-right: 9px;' "
                    + "onclick='Lingua.addToCard(this, \"" + word + "\",\"" + data.translations[j] + "\", "
                    + "\"" + data.transcription + "\", "
                    + "\"" + Lingua.escapeForMethod(sentence) + "\"" + ")'"
                    + "title='Добавить в мой словарь'>"
                    + " </i>"
                    + data.translations[j]
                    + "</p>"
            }
        } else {
            html += "<p>Перевод не найден</p>"
        }
        html += "</ul>"
        dp.replaceWith(html);

        elem.parent().addClass('open');
        var closeMenu = function (event) {
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }
            jQuery(document).unbind('click', closeMenu);
            elem.parent().removeClass('open');
        };
        jQuery(document).bind('click', closeMenu);
    })
}

/**
 * Синоним
 * @type {translateIt}
 */
Lingua.t = Lingua.translateIt

/**
 * Привязка событий
 * @param v
 */
Lingua.setOnClickEvents = function (v) {
    Lingua.setEventsForChildW($("#" + v))
}

Lingua.setEventsForChildW = function (v) {
    var vs = $(v).find("w")
    $.each(vs, function (key, value) {
        $(value).bind("click", function () {
            Lingua.translateIt(value)
        });
    });
}

/**
 * Перевод слова
 * @param $http
 * @param word
 * @param callback
 */
Lingua.getTranslate = function ($http, word, callback) {
    $http({
        method: 'POST',
        url: '/translate',
        data: {
            phrase: word,
            langFrom: 'en',
            langTo: 'ru'
        },
        showSpinner: false
    })
        .success(function (data) {
            callback(data)
        })
        .error(function (data) {
            deferred.resolve("error value");
        });
}

Lingua.escapeForMethod = function (value) {
    return value
        .replaceAll("'", "&#39;")
        .replaceAll("&quot;", "&#39;")
}

Lingua.addToCard = function (elem, word, translate, transcription, sentence) {
    var elem = jQuery(elem);
    var $scope = angular.element(elem).scope()
    var $http = $scope.$http

    $http({
        url: '/student/cards/insert',
        method: "POST",
        data: {
            word: word,
            translate: translate,
            transcription: transcription,
            lessonId: $scope.lesson.id,
            context: sentence
        },
        headers: {'Content-Type': 'application/json;charset=UTF-8'}
    }).success(function (data) {
        $scope.sharedProperties.success("Слово добавлено в ваш словарь")
        $scope.cards.push(data)
    }).error(function (result, status) {
        $scope.sharedProperties.error(result.message)
    });
}
