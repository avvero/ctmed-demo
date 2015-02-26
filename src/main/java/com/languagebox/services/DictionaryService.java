package com.languagebox.services;

import com.languagebox.utils.CommonUtils;
import org.json.JSONArray;
import org.springframework.stereotype.Service;

/**
 * @author fxdev-belyaev-ay
 */
@Service
public class DictionaryService {

    public Object getAll(String name) {
        switch (name) {
            case "patients": {
                String s = CommonUtils.getStringFromResourceFile("patients.json");
                JSONArray patients = new JSONArray(s);
                return patients;
            }
            case "doctors": {
                String s = CommonUtils.getStringFromResourceFile("doctors.json");
                JSONArray patients = new JSONArray(s);
                return patients;
            }
            case "clinics": {
                String s = CommonUtils.getStringFromResourceFile("clinics.json");
                JSONArray patients = new JSONArray(s);
                return patients;
            }
        }
        return null;
    }
}
