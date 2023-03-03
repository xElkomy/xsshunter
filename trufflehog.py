from flask import Flask, render_template, request
from flask import jsonify
import json
import os

app = Flask(__name__)

@app.route('/trufflehog', methods=['POST'])
def check_for_secrets():
    data = []
    
    text_file = open("/tmp/input.txt", "wb")
    text_file.write(request.get_data())
    text_file.close()

    os.system("/usr/bin/trufflehog filesystem /tmp/input.txt --no-update --no-verification --json > /tmp/output.txt")

    with open('/tmp/output.txt') as f:
        for line in f:
            data.append(json.loads(line))

    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=False, host='0.0.0.0')
