<%@tag description="Main Wrapper Tag" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
    <head>
        <jsp:include page="/WEB-INF/pages/meta-header.jsp"/>

        <link href="<c:url value="/assets/css/bootstrap.min.css" />" rel="stylesheet">
        <link href="<c:url value="/assets/css/font-awesome.min.css" />" rel="stylesheet">

        <link href="<c:url value="/bootstrap/css/signin.css" />" rel="stylesheet">

        <link href="<c:url value="/main_page/css/reset.css" />" rel="stylesheet">
        <link href="<c:url value="/main_page/css/style.css" />" rel="stylesheet">
        <%--<link href="<c:url value="/bootstrap/css/theme.css" />" rel="stylesheet">--%>
        <script src="<c:url value="/js/lib/jquery-1.11.0.js" />"></script>
        <script src="<c:url value="/bootstrap/js/bootstrap.js" />"></script>
        <script src="<c:url value="/js/lib/angular.js" />"></script>
        <script src="<c:url value="/js/lib/ui-bootstrap-tpls-0.11.0.js" />"></script>
        <script src="<c:url value="/js/index/main.js" />"></script>
        <script src="<c:url value="/js/dialogs/login.js" />"></script>
    </head>
    <body ng-app="indexApp" ng-controller="mainPageController">
    <div class="header" id="main">
            <div class="wrapper">
                <a href="${pageContext.request.contextPath}/" class="logo">Language box</a>
                <div class="nav">
                    <ul>
                        <li><a href="${pageContext.request.contextPath}/" ng-class="{active : tab == 'main'}" ng-click="goToMain()">Главная</a></li>
                        <li><a href="" ng-class="{active : tab == 'how'}"  ng-click="goToHow()">Как работает</a></li>
                        <li><a href="/guest">Библиотека</a></li>
                    <%--<li><a href="" ng-class="{active : tab == 'faq'}" ng-click="goToFaq()">Вопросы и ответы</a></li>--%>
                        <%--<li><a href="#">Кто уже использует</a></li>--%>
                    </ul>
                </div>
                <div class="user">
                    <c:choose>
                        <c:when test="${not empty principal}">
                            <a href="${pageContext.request.contextPath}/profile" class="log">Профиль</a>
                        </c:when>
                        <c:otherwise>
                            <a href="${pageContext.request.contextPath}/select_registration">Регистрация</a>
                            <%--<a href="#" ng-click="showLoginForm()" class="log">Вход</a>--%>
                            <a href="${pageContext.request.contextPath}/signin" class="log">Вход</a>
                        </c:otherwise>
                    </c:choose>
                </div>
                <div class="empty"></div>
            </div>
        </div>
        <jsp:doBody/>
        <div class="footer">
            <div class="wrapper">
                <ul>
                    <li><a href="${pageContext.request.contextPath}/company">О компании</a></li>
                    <li><a href="${pageContext.request.contextPath}/contacts">Контакты</a></li>
                    <li><a href="${pageContext.request.contextPath}/help">Помощь</a></li>
                    <li>
                        <a href="http://languagebox.userecho.com/" target="_blank">
                            Отзывы и предложения
                        </a>
                    </li>
                    <%--<li><a href="#">Условия использования</a></li>--%>
                </ul>
                <p class="phone">+7 (499) 506-8219</p>
                <p class="phone">Бесплатная техподдержка + 7 (499) 506 8219</p>
                <div class="empty"></div>
            </div>
        </div>
    </body>
    <jsp:include page="/WEB-INF/pages/metrika.jsp"/>
    <%--<jsp:include page="/WEB-INF/pages/feedback.jsp"/>--%>
</html>