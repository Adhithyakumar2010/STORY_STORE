import os

class Config:
    """Application configuration management."""
    SECRET_KEY = os.environ.get("SECRET_KEY", "change-this-before-production")
    UPI_ID = os.environ.get("UPI_ID", "payments@akclicks")
    MAIL_SERVER = os.environ.get("MAIL_SERVER", "smtp.gmail.com")
    MAIL_PORT = int(os.environ.get("MAIL_PORT", 587))
    MAIL_USE_TLS = os.environ.get("MAIL_USE_TLS", "true").lower() in ("true", "1", "on")
    MAIL_USE_SSL = os.environ.get("MAIL_USE_SSL", "false").lower() in ("true", "1", "on")
    MAIL_USERNAME = os.environ.get("MAIL_USERNAME")
    MAIL_PASSWORD = os.environ.get("MAIL_PASSWORD")
    SESSION_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SAMESITE = "Lax"
