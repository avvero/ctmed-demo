### project2

Приложение состоит услов из двух частей:

* STUB Backend
* JS/HTML frontend client

*STUB Backend* должен обеспечить выдачу ресурсов и данных по указанным ниже URL

## Основная форма клиента 
*static/client/view/index.html*. Необходимо обеспечить ее выдачу на запрос браузера. 

Допустим в *STUB Backend* такой мапинг:

`/ -> static/client/view/index.html`

Основная форма будет подгружать *static* ресурсы, необходимые для ее работы. Список смотрите ниже.

## Static ресурсы
Проще говоря, нужно чтобы по указанным адресам лежали файлы

# CSS
/bootstrap/css/bootstrap.css

/bootstrap/css/docs.min.css

/bootstrap/css/navbar-fixed-top.css

/client/css/client.css
        
# Vendor JS
- https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js
- /bootstrap/js/bootstrap.min.js
- /js/lib/jquery-1.11.0.js
- /js/lib/jquery-ui-1.10.4.js
- /js/lib/jquery.colorbox.js
- /js/lib/jquery.gritter.min.js

- /js/lib/angular.js
- /js/lib/angular-animate.js
- /js/lib/angular-sanitize.js
- /js/lib/angular-route.js
- /js/lib/angular-ui-router.js
- /js/lib/moment.min.js
- /js/lib/ui-bootstrap-tpls-0.11.0.js


# Оwn JS
- /client/js/dictionary.js
- /client/js/dictionaryController.js

- /client/js/main.js
- /client/js/templatesController.js
- /client/js/templateController.js
- /client/js/documentsController.js
- /client/js/documentController.js

## Шаблоны форм
- /client/view/templates.html - список шаблонов документов
- /client/view/template.html - шаблок документа
- /client/view/documents.html - список документов шаблона
- /view/*{documentId}*, где {documentId} - id соответствующего типа документов.
- /client/view/dictionary_{dictionaryName}.html, где {dictionaryName} - имя словаря


## Data API
Data API STUB Backend должен обеспечить вывод данных в JSON формате на стандартный REST запрос

#Документы, шаблоны
- *GET* /data/template - список шаблонов
- *GET* /data/template/{id} - шаблон с ID = {id}
- *GET* /data/template/{id}/document - список документов шаблона с ID = {id}
- *GET* /data/template/{templateId}/document/{documentId} - документ с ID = {documentId} шаблона с ID = {id}
- *POST* /data/template/{templateId}/document - сохраняем *новый* документ шаблона с ID = {id}
- *POST* /data/template/{templateId}/document/{documentId} - обновляем документ с ID = {documentId} шаблона с ID = {id}


#Справочники
*GET* /data/dictionary/{name} - словарь с именем = {name}

**Примеры JSON** в папке *resources*

### Timeline

2015.02.18 2.5 Создание проекта, настройка spring приложения.

2015.02.18 3.0 Привязка ангулара, шаблоны, переходы, route

2015.02.19 3.0 Добавил заглушки для данных (только получение), верстка формы

2015.02.19 1.5 Сохранение данных, добавление новых записей

2015.02.24 1.5 Механизм словарей, начало, формы, выбор, директивы

2015.02.26 2.5 Словарь клиник, докторов, доработал форму

2015.02.26 2.5 Словарь клиник, докторов, доработал форму

2015.03.20 0.5 Описание API

