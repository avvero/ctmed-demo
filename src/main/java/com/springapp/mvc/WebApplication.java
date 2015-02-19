package com.springapp.mvc;

import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.ContextLoaderListener;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.filter.CharacterEncodingFilter;
import org.springframework.web.servlet.DispatcherServlet;

import javax.servlet.*;
import java.util.EnumSet;

/**
 * Created by avvero on 18.02.15.
 */
public class WebApplication implements WebApplicationInitializer {

    @Override
    public void onStartup(ServletContext container) throws ServletException {
        // Creates the root application context
        AnnotationConfigWebApplicationContext appContext =
                new AnnotationConfigWebApplicationContext();

        appContext.setDisplayName("Silver Chalice Web API");

        // Registers the application configuration with the root context
        appContext.register(WebConfig.class);

        // Creates the Spring Container shared by all Servlets and Filters
        container.addListener(new ContextLoaderListener(appContext));


        // Creates the dispatcher servlet context
        AnnotationConfigWebApplicationContext servletContext =
                new AnnotationConfigWebApplicationContext();

        // Registers the servlet configuraton with the dispatcher servlet context
        servletContext.register(WebConfig.class);
        // Further configures the servlet context
        ServletRegistration.Dynamic dispatcher = container.addServlet("spring-mvc-dispatcher", new DispatcherServlet(servletContext));
        dispatcher.setLoadOnStartup(1);
        dispatcher.addMapping("/");

        EnumSet<DispatcherType> dispatcherTypes = EnumSet.of(DispatcherType.REQUEST, DispatcherType.FORWARD);
        CharacterEncodingFilter characterEncodingFilter = new CharacterEncodingFilter();
        characterEncodingFilter.setEncoding("UTF-8");
        characterEncodingFilter.setForceEncoding(true);

        FilterRegistration.Dynamic characterEncoding = container.addFilter("characterEncoding", characterEncodingFilter);
        characterEncoding.addMappingForUrlPatterns(dispatcherTypes, true, "/*");
    }

}