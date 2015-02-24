package com.languagebox.controllers;

import com.languagebox.services.DictionaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @author fxdev-belyaev-ay
 */
@Controller
@Scope("request")
public class DictionaryController {

    @Autowired
    private DictionaryService dictionaryService;

    @RequestMapping(value = "/data/dictionary/{name}", method = RequestMethod.GET,
            produces = "application/json;charset=UTF-8")
    public @ResponseBody
    Object getDictionary(@PathVariable String name) {
        return dictionaryService.getAll(name).toString();
    }

}
