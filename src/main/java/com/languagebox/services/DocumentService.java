package com.languagebox.services;

import com.languagebox.utils.CommonUtils;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

/**
 * Created by avvero on 18.02.15.
 */
@Service
public class DocumentService {

    public JSONArray getAll() {
        String s = CommonUtils.getStringFromResourceFile("documents.json");

        JSONArray documents = new JSONArray(s);
        return documents;
    }

    public String getAllByTemplateId(int id) {
        JSONArray documents = getAll();
        JSONArray result = new JSONArray();
        for (int i = 0; i < getAll().length(); i++) {
            JSONObject object = documents.getJSONObject(i);
            if (object.has("templateId") && object.getInt("templateId") == id) {
                result.put(object);
            }
        }
        return result.toString();
    }

    public String getById(int documentId) {
        JSONArray documents = getAll();
        for (int i = 0; i < documents.length(); i++) {
            JSONObject object = documents.getJSONObject(i);
            if (object.has("id") && object.getInt("id") == documentId) {
                return object.toString();
            }
        }
        return null;
    }
}
