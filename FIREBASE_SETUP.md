# Firebase Setup Guide

## 🚀 Quick Setup

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" 
3. Enter project name (e.g., "lumieramed")
4. Enable Google Analytics (optional)
5. Click "Create project"

### 2. Enable Authentication
1. In Firebase Console, go to **Authentication** → **Sign-in method**
2. Enable **Email/Password** provider
3. Enable **Google** provider:
   - Click on "Google"
   - Enable the toggle
   - Enter your project email address
   - Click "Save"
4. Click "Save" for Email/Password provider

### 3. Configure Web App
1. Go to **Project Settings** → **General** → **Your apps**
2. Click **Web app** (</> icon)
3. Enter app nickname (e.g., "Lumieramed Web")
4. Click "Register app"
5. Copy the Firebase config values

### 4. Add Authorized Domains
1. In **Project Settings** → **General** → **Your apps**
2. Scroll down to **Your domains**
3. Add:
   - `localhost` (for development)
   - `127.0.0.1` (alternative localhost)
   - Your production domain when deployed

### 5. Environment Variables
1. Copy `.env.local.example` to `.env.local`
2. Fill in your Firebase config:

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_actual_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Backend API URL (for Google authentication)
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
# or
# NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
```

### 6. Test Your Setup
Run this test in your browser console or create a test component:

```javascript
import { testFirebaseConnection } from '@/lib/firebase';

// Test the connection
testFirebaseConnection().then(isConnected => {
  console.log('Firebase is', isConnected ? 'connected' : 'not connected');
});
```

## 🔧 Common Issues & Solutions

### ❌ "Missing Firebase configuration"
**Solution**: Ensure all environment variables are set in `.env.local`

### ❌ "auth/network-request-failed"
**Solution**: Check your internet connection and CORS settings

### ❌ "auth/too-many-requests"
**Solution**: Wait a few minutes or enable less secure apps in Firebase

### ❌ "auth/invalid-email"
**Solution**: Ensure email format is valid and domain is authorized

### ❌ Backend API errors after Google sign-in
**Solution**: 
1. Check that your backend server is running
2. Verify the `/users/google` endpoint exists and handles the expected payload
3. Check CORS settings on your backend
4. Ensure your API URL is correctly set in environment variables

### ❌ "auth/popup-blocked"
**Solution**: Allow popups for localhost in your browser settings

### ❌ "auth/popup-closed-by-user"
**Solution**: Complete the Google sign-in flow in the popup window

### ❌ Google sign-in not working
**Solution**: 
1. Ensure Google provider is enabled in Firebase Console
2. Check browser console for popup blocker warnings
3. Verify authorized domains include localhost

## 📱 Firebase Console Checklist

- [ ] Project created
- [ ] Authentication → Email/Password enabled
- [ ] Authentication → Google provider enabled
- [ ] Web app registered
- [ ] Authorized domains added (localhost, production)
- [ ] Environment variables configured
- [ ] Test connection successful

## 🛠 Development Tips

1. **Always use `.env.local`** (never commit to git)
2. **Test with localhost** before production
3. **Check browser console** for detailed error messages
4. **Use Firebase Emulator** for local development (optional)

## 📚 Additional Resources

- [Firebase Web Documentation](https://firebase.google.com/docs/web/setup)
- [Firebase Auth Documentation](https://firebase.google.com/docs/auth/web/start)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
