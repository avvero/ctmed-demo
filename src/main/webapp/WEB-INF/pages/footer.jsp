<%--
  Created by IntelliJ IDEA.
  User: fxdev-belyaev-ay
  Date: 12.05.14
  Time: 17:08
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<div id="footer" ng-show="app.currentView == 'common'">
<div class="container">
        <div class="row" style="margin-left: 17px;">
            <div class="col-xs-3" style="margin-left: 67px;">Language box © 2014</div>
        <%--<div class="col-xs-3"></div>--%>
            <div class="col-xs-3">
                <a href="http://languagebox.userecho.com/" target="_blank">
                    Отзывы и предложения
                </a>
            </div>
            <div class="col-xs-5">
                <c:if test="${not empty partner.phone}">
                    Телефон партнера: ${partner.phone}
                </c:if>
                <p>Бесплатная техподдержка + 7 (499) 506 8219</p>
                <p>
                    <c:if test="${not empty principal}">
                        <a href="" ng-click="writeToSupport()">
                            Написать письмо в техподдержку
                        </a>
                    </c:if>
                </p>
            </div>
        </div>
    </div>
</div>