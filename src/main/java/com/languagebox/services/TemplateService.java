package com.languagebox.services;

import com.languagebox.domain.Template;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by avvero on 18.02.15.
 */
@Service
public class TemplateService {

    public List<Template> getAll() {
        List<Template> templates = new ArrayList<Template>();
        Template template = new Template();
        template.setName("История болезни");
        template.setDescription("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.");
        template.setView("<html><head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\"/></head><body data-feedly-mini=\"yes\">DOCUMENT!!!!</body></html>");
        template.setId(1);
        templates.add(template);

        template = new Template();
        template.setName("Карточка пациента");
        template.setDescription("Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.");
        template.setId(2);
        templates.add(template);
        return templates;
    }

    public Template getById(int id) {
        List<Template> templates = getAll();
        for (Template template : templates) {
            if (template.getId() == id) return template;
        }
        return null;
    }
}
