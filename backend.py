# -------------------
# Imports
# -------------------
from flask import Flask, request, jsonify, render_template
from PIL import Image
import numpy as np
import tensorflow as tf
import json
import os

# -------------------
# App Initialization
# -------------------
app = Flask(__name__)

# -------------------
# Load Model and Class Names (once at startup)
# -------------------
try:
    print("Loading Keras model...")
    # Use the .h5 format and load with compile=False for better compatibility
    model = tf.keras.models.load_model("trained_model.h5", compile=False)
    with open("class_names.json", "r") as f:
        class_names = json.load(f)
    print("Model and class names loaded successfully.")
except Exception as e:
    print(f"Error: Could not load model or class_names.json. Make sure they are in the correct folder.")
    print(f"Details: {e}")
    exit()


# -------------------
# Define API Routes
# -------------------

# This route serves the main HTML page
@app.route("/")
def home():
    # Flask automatically looks for this file in the 'templates' folder
    return render_template("index.html")

# This route handles the prediction logic
@app.route("/predict", methods=["POST"])
def predict():
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No file selected for uploading"}), 400

    try:
        # 1. Read the image file from the request
        image = Image.open(file.stream).convert('RGB')
        
        # 2. Preprocess the image for the model
        image_resized = image.resize((128, 128))
        input_arr = np.expand_dims(np.array(image_resized), axis=0)

        # 3. Make a prediction
        predictions = model.predict(input_arr)[0]
        
        # 4. === THE CHANGE IS HERE: Find the single best prediction ===
        # Get the index of the highest probability
        top_index = np.argmax(predictions)
        
        # Create a dictionary with just that one result
        result = {
            "label": class_names[top_index], 
            "confidence": f"{predictions[top_index] * 100:.2f}%"
        }
        
        # 5. Send the single result back inside a list
        # We keep it in a list so the frontend JavaScript doesn't break
        return jsonify({"predictions": [result]})

    except Exception as e:
        # Handle any errors during prediction
        return jsonify({"error": "An error occurred during prediction.", "details": str(e)}), 500


# -------------------
# Run the Application
# -------------------
if __name__ == "__main__":
    print("Starting Flask server... Please open http://127.0.0.1:5000 in your browser.")
    app.run(host="0.0.0.0", port=5000, debug=False)