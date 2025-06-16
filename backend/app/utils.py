from email_validator import validate_email, EmailNotValidError
from werkzeug.security import generate_password_hash

def validate_user_data(name, email, password):
    if not name or not email or not password:
        return False, "All fields are required."
    if len(password) < 6:
        return False, "Password must be at least 6 characters."
    try:
        validate_email(email)
    except EmailNotValidError as e:
        return False, str(e)
    return True, None

def hash_password(password):
    return generate_password_hash(password)
