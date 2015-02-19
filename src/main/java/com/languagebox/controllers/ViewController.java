package com.languagebox.controllers;

import com.languagebox.domain.Template;
import com.languagebox.services.TemplateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

/**
 * User: avvero
 * Date: 18.01.14
 */
@Controller
@Scope("request")
public class ViewController {

    @Autowired
    private TemplateService templateService;

    /**
     * Главная страница
     * @param model
     * @param request
     * @return
     */
    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String printWelcome(ModelMap model, HttpServletRequest request)  {
        return "static/client/view/index.html";
    }

    /**
     * Получение VIEW для шаблонов документов
     * @param templateId
     * @param model
     * @return
     */
    @RequestMapping(value = "/view/{templateId}", method = RequestMethod.GET,
            produces = "text/html; charset=UTF-8")
    public @ResponseBody Object pages(@PathVariable int templateId, ModelMap model) {
        Template template = templateService.getById(templateId);
        return template.getView();
    }



}