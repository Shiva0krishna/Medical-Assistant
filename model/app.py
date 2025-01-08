from flask import Flask, request, jsonify
from flask_cors import CORS
from predict import get_model_prediction
import os
app = Flask(__name__)
CORS(app)

# Health check endpoint
@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "Running"}), 200

# Prediction endpoint
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        user_message = data.get("message", "").strip()
        
        if not user_message:
            return jsonify({"reply": "Please enter a valid message."}), 400

        # Call the model's prediction function
        # prediction = get_model_prediction(user_message)
        prediction = "This model is in development. Please check back later."
        return jsonify({"reply": prediction}), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"reply": "Server-side error, please try again later.", "error": str(e)}), 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 7000))
    print(f"Server running on port {port}")
    app.run(host="0.0.0.0", port=port)
 
