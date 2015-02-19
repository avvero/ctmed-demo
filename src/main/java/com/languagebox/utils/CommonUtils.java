package com.languagebox.utils;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

/**
 * @author fxdev-belyaev-ay
 */
public class CommonUtils {

    public static String getStringFromResourceFile(String fileName) {
        try {
            Resource resource = new ClassPathResource(fileName);
            byte[] encoded = Files.readAllBytes(Paths.get(resource.getURI()));
            return new String(encoded, "UTF-8");
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

}
