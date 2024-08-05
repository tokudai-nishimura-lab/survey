from flask import Flask, request, jsonify
import csv
import os
from datetime import datetime
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # CORSを有効にする

CSV_FILE = '../data.csv'

@app.route('/save_data', methods=['POST'])
def save_data():
    try:
        name = request.form.get('name')
        age = request.form.get('age')
        gender = request.form.get('gender')
        
        mos_ratings = [request.form.get(f'mos-rating{i}') for i in range(1, 21)]
        dmos_ratings = [request.form.get(f'dmos-rating{i}') for i in range(1, 11)]

        timestamp = datetime.now().isoformat()

        data = {
            'timestamp': timestamp,
            'name': name,
            'age': age,
            'gender': gender
        }

        for i in range(20):
            data[f'mos-rating{i+1}'] = mos_ratings[i] if mos_ratings[i] is not None else ''

        for i in range(10):
            data[f'dmos-rating{i+1}'] = dmos_ratings[i] if dmos_ratings[i] is not None else ''

        file_exists = os.path.isfile(CSV_FILE)
        
        with open(CSV_FILE, 'a', newline='') as csvfile:
            fieldnames = ['timestamp', 'name', 'age', 'gender'] + \
                        [f'mos-rating{i+1}' for i in range(20)] + \
                        [f'dmos-rating{i+1}' for i in range(10)]
            
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            
            if not file_exists:
                writer.writeheader()
            
            writer.writerow(data)
        
        return jsonify({"message": "Data saved successfully!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
