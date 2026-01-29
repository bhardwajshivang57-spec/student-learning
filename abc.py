#Backend order
# 
# 1️⃣ server.js        (engine start)
# 2️⃣ config/db.js     (database connect)
# 3️⃣ models/          (data ka shape)
# 4️⃣ routes/          (API endpoints)
# 5️⃣ controllers/     (actual logic)
# 6️⃣ middleware/      (security & errors)
# 7️⃣ utils/           (helpers)




# 1️⃣ server.js – SABSE PEHLA FILE 🔥
# 🔹 Ye kya hai?

# Backend ka entry point

# Jaise React me main.jsx

# Yahin se:

# Express app start hota hai

# Middleware load hota hai

# Routes attach hote hain

# Server run hota hai

# 🔹 Tum yahin se start karoge

# Is file ke bina:
# ❌ backend run nahi hota
# ❌ APIs ka koi matlab nahi

# 🧠 Mental model:

# “server.js = backend ka engine”

# 2️⃣ config/db.js – DATABASE CONNECTION 🗄️
# 🔹 Ye kya karta hai?

# MongoDB se connect karta hai

# mongoose use hota hai

# .env se MONGO_URI leta hai

# 🔹 Isse kya fayda?

# DB logic alag file me

# server.js clean rehta hai

# 🧠 Mental model:

# “db.js = backend ka power supply”

# 3️⃣ models/ – DATA KA SHAPE 🧩

# Yahin se real backend feel aati hai.

# 🔹 Model kya hota hai?

# Data ka blueprint

# MongoDB me data kaise dikhega

# Example socho:

# User ka naam kya?

# Email unique hoga?

# Password encrypted?

# 🧠 Mental model:

# “Model = form jisme data bhara jaata hai”

# ⚠️ Models ke bina:

# API useless

# Data random

# 4️⃣ routes/ – API KA ADDRESS 📍
# 🔹 Route kya hota hai?

# URL define karta hai

# Example:

# /api/auth/login

# /api/courses

# 🔹 Yahan logic nahi hota

# Sirf ye batata hai:

# “Is URL pe request aaye to kis controller ko bhejo”

# 🧠 Mental model:

# “Route = gatekeeper”

# 5️⃣ controllers/ – DIMAAG 🧠
# 🔹 Controller kya karta hai?

# Actual kaam

# Login check

# DB me save

# Response bhejna

# Frontend se jo request aati hai:
# 👉 controller hi uska jawab deta hai

# 🧠 Mental model:

# “Controller = decision maker”

# 6️⃣ middleware/ – CHECKPOINT 🚨
# 🔹 Middleware kya hota hai?

# Request ke beech me check

# Example:

# Login hai ya nahi?

# Token valid hai?

# Error handle

# 🧠 Mental model:

# “Middleware = security guard”

# 7️⃣ utils/ – HELPER TOOLS 🧰
# 🔹 Utils kya hota hai?

# Chhote reusable functions

# Example:

# JWT token banana

# Date format

# Common helpers

# 🧠 Mental model:

# “Utils = toolbox”

# 