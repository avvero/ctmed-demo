<%@tag description="Main Wrapper Tag" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@attribute name="resources" fragment="true" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- basic styles -->
    <link href="<c:url value="/bootstrap/css/bootstrap.min.css" />" rel="stylesheet">
    <link href="<c:url value="/bootstrap/css/font-awesome.min.css" />" rel="stylesheet">
</head>
<jsp:doBody/>
</html>