from transformers import AutoTokenizer, AutoModelForCausalLM
import torch

# Load the model
model_name = "ContactDoctor/Bio-Medical-MultiModal-Llama-3-8B-V1"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

def generate_response(input_text):
    # Tokenize input text
    inputs = tokenizer(input_text, return_tensors="pt").to("cuda" if torch.cuda.is_available() else "cpu")
    # Generate response
    outputs = model.generate(inputs["input_ids"], max_length=150, temperature=0.7)
    response = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return response


from flask import Flask, request, jsonify
from predict import generate_response  # import from the predict file

app = Flask(__name__)

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    input_text = data.get("text")
    if not input_text:
        return jsonify({"error": "No input text provided"}), 400
    response = generate_response(input_text)
    return jsonify({"response": response})

if __name__ == "__main__":
    app.run(port=5000)

