package com.languagebox.controllers;

import com.languagebox.services.DocumentService;
import com.languagebox.services.TemplateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

/**
 * Created by avvero on 18.02.15.
 */
@Controller
@Scope("request")
public class DataController {

    @Autowired
    private TemplateService templateService;
    @Autowired
    private DocumentService documentService;

    @RequestMapping(value = "/data/template", method = RequestMethod.GET,
            produces = "application/json;charset=UTF-8")
    public @ResponseBody Object getAllTemplates() {
        return templateService.getAll();
    }

    @RequestMapping(value = "/data/template/{id}", method = RequestMethod.GET,
            produces = "application/json;charset=UTF-8")
    public @ResponseBody Object getTemplate(@PathVariable int id) {
        return templateService.getById(id);
    }

    @RequestMapping(value = "/data/template/{id}/document", method = RequestMethod.GET,
            produces = "application/json;charset=UTF-8")
    public @ResponseBody Object getTemplateDocuments(@PathVariable int id) {
        return documentService.getAllByTemplateId(id);
    }

    @RequestMapping(value = "/data/template/{templateId}/document/{documentId}", method = RequestMethod.GET,
            produces = "application/json;charset=UTF-8")
    public @ResponseBody Object getTemplateDocument(@PathVariable int templateId, @PathVariable int documentId) {
        return documentService.getByIdOrStub(documentId);
    }


    @RequestMapping(value = "/data/template/{templateId}/document", method = RequestMethod.POST,
            produces = "application/json;charset=UTF-8")
    public @ResponseBody Object saveTemplateDocuments(@PathVariable int templateId, @RequestBody String documentString) {
        return saveTemplateDocument(templateId, null, documentString);
    }

    @RequestMapping(value = "/data/template/{templateId}/document/{documentId}", method = RequestMethod.POST,
            produces = "application/json;charset=UTF-8")
    public @ResponseBody Object saveTemplateDocument(@PathVariable int templateId, @PathVariable Integer documentId,
                                                     @RequestBody String documentString) {
        return documentService.saveOrUpdate(templateId, documentId, documentString);
    }


}
