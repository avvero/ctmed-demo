<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="t" tagdir="/WEB-INF/tags" %>

<t:partner>


    <div class="fors" id="main">
        <div class="wrapper">
            <div class="theTitle">
                <p>Произошла непредвиденная ошибка</p>
                <p>${exception.message}</p>
            </div>
        </div>
    </div>


</t:partner>