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
        template.setName("История болезни");
        template.setDescription("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.");
        template.setView(getView());
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
