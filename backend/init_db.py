try:
    from backend.database import engine, Base
    from backend import models_db
except ImportError:
    from database import engine, Base
    import models_db

print("Creating database tables...")
Base.metadata.create_all(bind=engine)
print("Tables created successfully!")
