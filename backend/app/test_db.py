from sqlalchemy import create_engine, text
from dotenv import load_dotenv
import os

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

print("Using:", DATABASE_URL)

try:
    engine = create_engine(DATABASE_URL)

    with engine.connect() as conn:
        result = conn.execute(text("SELECT DATABASE();"))
        print("✅ Connected Successfully!")
        print("Current Database:", result.scalar())

except Exception as e:
    print("❌ Connection Failed")
    print(e)