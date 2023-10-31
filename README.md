`I'm still building this project, so I'll update this README as I go along.`

## Environment Variables Required

### .env

```bash
# PRISMA DATABASE
DATABASE_URL="mongodb+srv://USERNAME:PASSWORD@HOST/DATABASE"

# FIREBASE ADMIN SDK
# we use the public keys in order to access the firebase database on the client side
NEXT_PUBLIC_FIREBASE_API_KEY=""
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=""
NEXT_PUBLIC_FIREBASE_PROJECT_ID=""
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=""
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=""
NEXT_PUBLIC_FIREBASE_APP_ID=""
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=""

# CUSTOM ENV VARIABLES
NEXT_PUBLIC_URL="http://localhost:3000"
```
