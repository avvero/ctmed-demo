package com.languagebox.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;

/**
 * User: avvero
 * Date: 18.01.14
 */
@Controller
public class ClientController {


    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String printWelcome(ModelMap model, HttpServletRequest request)  {
        return "static/client/view/index.html";
    }

}