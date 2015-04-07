package com.languagebox.services;

import com.languagebox.domain.Template;
import com.languagebox.utils.CommonUtils;
import org.springframework.core.io.FileSystemResource;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

/**
 * Заглушка сервиса
 * Список шаблонов формируем тут
 * view для шаблона получаем из файла
 * TODO получать все из БД
 */
@Service
public class TemplateService {

    private String getView() {
        return CommonUtils.getStringFromResourceFile("view_1.html");
    }

    public List<Template> getAll() {
        List<Template> templates = new ArrayList<Template>();
        Template template = new Template();
        template.setName("\u041e\u041d\u041c\u041a");
        template.setDescription("\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435 \u0448\u0430\u0431\u043b\u043e\u043d\u0430 \u0434\u043e\u043a\u0443\u043c\u0435\u043d\u0442\u0430");
        template.setView(getView());
        template.setId(1);
        templates.add(template);

        // template = new Template();
        // template.setName("Карточка пациента");
        // template.setDescription("Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.");
        // template.setId(2);
        // templates.add(template);
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
