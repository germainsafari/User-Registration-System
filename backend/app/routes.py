from flask import request, jsonify, current_app as app
from . import db
from .models import User
from .utils import validate_user_data, hash_password

@app.route('/api/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        print("Received data:", data)
        name = data.get('name')
        email = data.get('email')
        password = data.get('password')
        valid, msg = validate_user_data(name, email, password)
        if not valid:
            return jsonify({"error": msg}), 400
        if User.query.filter_by(email=email).first():
            return jsonify({"error": "Email already registered."}), 409
        user = User(
            name=name,
            email=email,
            password=hash_password(password)
        )
        db.session.add(user)
        db.session.commit()
        print("User registered successfully.")
        return jsonify({"message": "User registered successfully."}), 201
    except Exception as e:
        print("Registration error:", e)
        return jsonify({"error": "Internal server error"}), 500

@app.route('/api/users', methods=['GET'])
def get_users():
    users = User.query.all()
    result = [
        {
            "id": u.id,
            "name": u.name,
            "email": u.email,
            "registered_at": u.registered_at
        }
        for u in users
    ]
    return jsonify(result), 200
