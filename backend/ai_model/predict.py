#!/usr/bin/env python3
"""
DELTA NEURONS - AI 7-Stage Dementia CLI Predictor
Runs inference using the trained Random Forest model and outputs stage classification and report.
"""

import sys
import os
import json
import joblib
import warnings
warnings.filterwarnings("ignore")
import numpy as np

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8')

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "dementia_rf_model.joblib")
META_PATH = os.path.join(BASE_DIR, "model_metadata.json")

def load_resources():
    if not os.path.exists(MODEL_PATH) or not os.path.exists(META_PATH):
        raise FileNotFoundError("Model or metadata not found. Please train the model first.")
    model = joblib.load(MODEL_PATH)
    with open(META_PATH, "r", encoding="utf-8") as f:
        meta = json.load(f)
    return model, meta

def predict_stage(features_dict):
    model, meta = load_resources()
    feature_names = meta["feature_names"]
    
    # Vectorize
    vector = [features_dict.get(fn, 50.0) for fn in feature_names]
    X = np.array([vector])

    predicted_stage = int(model.predict(X)[0])
    probabilities = model.predict_proba(X)[0].tolist()

    stage_info = meta["stages"].get(str(predicted_stage), meta["stages"].get(predicted_stage, {}))

    prob_breakdown = [
        {"stage": i + 1, "probability": round(probabilities[i] * 100, 1)}
        for i in range(len(probabilities))
    ]

    return {
        "predicted_stage": predicted_stage,
        "stage_name": stage_info.get("name"),
        "stage_description": stage_info.get("description"),
        "clinical_category": stage_info.get("clinical_category"),
        "gds_equivalent": stage_info.get("gds_equivalent"),
        "badge_color": stage_info.get("color"),
        "confidence_pct": round(max(probabilities) * 100, 1),
        "stage_probabilities": prob_breakdown
    }

if __name__ == "__main__":
    test_sample = {
        "age": 72.0,
        "mmse_score": 21.0,
        "memory_recall": 52.0,
        "attention_focus": 48.0,
        "iadl_score": 5.0,
        "badl_score": 9.0,
        "verbal_fluency": 60.0,
        "orientation": 7.0,
        "behavioral_symptoms": 3.0,
        "game_accuracy": 62.0,
        "game_reaction_time": 7.8
    }

    if len(sys.argv) > 1:
        try:
            test_sample = json.loads(sys.argv[1])
        except Exception:
            pass

    result = predict_stage(test_sample)
    print(json.dumps(result, indent=2))
