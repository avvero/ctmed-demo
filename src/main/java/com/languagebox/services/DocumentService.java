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

    public static final String DATA_FILE = "documents.json";

    public JSONArray getAll() {
        String s = CommonUtils.getStringFromResourceFile(DATA_FILE);

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

    public String getByIdOrStub(int documentId) {
        return documentId == 0 ? getStub(documentId) : getById(documentId);
    }

    public String getById(int documentId) {
        JSONArray documents = getAll();
        return getById(documentId, documents);
    }

    public String getById(int documentId, JSONArray documents) {
        for (int i = 0; i < documents.length(); i++) {
            JSONObject object = documents.getJSONObject(i);
            if (object.has("id") && object.getInt("id") == documentId) {
                return object.toString();
            }
        }
        return null;
    }

    public String saveOrUpdate(int templateId, Integer documentId, String documentString) {
        JSONArray documents = getAll();
        JSONObject documentJson = new JSONObject(documentString);
        if (documentId.intValue() == 0) {
            documentJson.put("id", getNextId(documents));
            documents.put(documentJson);
            CommonUtils.saveStringToResourceFile(DATA_FILE, documents.toString());
        }
        for (int i = 0; i < documents.length(); i++) {
            JSONObject object = documents.getJSONObject(i);
            if (object.has("id") && object.getInt("id") == documentId) {
                documents.remove(i);
                documents.put(documentJson);
                CommonUtils.saveStringToResourceFile(DATA_FILE, documents.toString());
                break;
            }
        }
        return documentJson.toString();
    }

    public Integer getNextId(JSONArray documents) {
        int max = 0;
        for (int i = 0; i < documents.length(); i++) {
            JSONObject object = documents.getJSONObject(i);
            if (object.has("id") && object.getInt("id") > max) {
                max = object.getInt("id");
            }
        }
        return ++max;
    }

    public String getStub(int documentId) {
        String s = CommonUtils.getStringFromResourceFile("stub.json");
        JSONArray documents = new JSONArray(s);
        return getById(documentId, documents);
    }
}
