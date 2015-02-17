<%@page contentType="text/html" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="t" tagdir="/WEB-INF/tags" %>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form" %>

<t:ace>
    <jsp:body>
        <body>
        <div class="error-container" style="width: auto; max-width: 680px; padding: 0 15px; margin-right: auto;
             margin-left: auto;">
            <div class="well">
                <h1 class="grey lighter smaller">
                    <span class="blue bigger-125">
                        <i class="icon-sitemap"></i>
                        404
                    </span>
                    Page Not Found
                </h1>
                <hr>
                <h3 class="lighter smaller">We looked everywhere but we couldn't find it!</h3>

                <div>
                    <form class="form-search">
                        <span class="input-icon align-middle">
                            <i class="icon-search"></i>

                            <input type="text" class="search-query" placeholder="Give it a search...">
                        </span>
                        <button class="btn btn-sm" onclick="return false;">Go!</button>
                    </form>
                    <div class="space"></div>
                    <h4 class="smaller">Try one of the following:</h4>
                    <ul class="list-unstyled spaced inline bigger-110 margin-15">
                        <li>
                            <i class="icon-hand-right blue"></i>
                            Re-check the url for typos
                        </li>
                        <li>
                            <i class="icon-hand-right blue"></i>
                            Read the faq
                        </li>
                        <li>
                            <i class="icon-hand-right blue"></i>
                            Tell us about it
                        </li>
                    </ul>
                </div>
                <hr>
                <div class="space"></div>

                <div class="center">
                    <a href="javascript:window.history.back()" class="btn btn-grey">
                        <i class="icon-arrow-left"></i>
                        Go Back
                    </a>

                    <a href="/" class="btn btn-primary">
                        <i class="icon-dashboard"></i>
                        Welcome page
                    </a>
                </div>
            </div>
        </div>
        </body>
    </jsp:body>
</t:ace>