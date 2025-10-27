# Talksy Deployment Guide

This guide will help you deploy the Talksy language learning chat application to production.

## 🚀 Quick Deployment Options

### Option 1: Vercel + Railway (Recommended for beginners)
- **Frontend**: Vercel (free tier available)
- **Backend**: Railway (free tier available)
- **Database**: MongoDB Atlas (free tier available)

### Option 2: Netlify + Render
- **Frontend**: Netlify (free tier available)
- **Backend**: Render (free tier available)
- **Database**: MongoDB Atlas

### Option 3: DigitalOcean App Platform
- **Full-stack**: Single platform deployment
- **Database**: MongoDB Atlas or DigitalOcean Managed Database

## 📋 Prerequisites

Before deploying, ensure you have:

1. **GitHub Repository**: Your code pushed to GitHub
2. **MongoDB Atlas**: Cloud database (free tier available)
3. **Stream Account**: For chat and video features
4. **Domain** (optional): Custom domain for production

## 🗄️ Step 1: Set up MongoDB Atlas

1. **Create MongoDB Atlas Account**:
   - Go to [mongodb.com/atlas](https://www.mongodb.com/atlas)
   - Sign up for free account
   - Create a new project

2. **Create Database Cluster**:
   - Choose "FREE" tier
   - Select AWS/Google Cloud/Azure (any region close to your users)
   - Create cluster (takes 5-10 minutes)

3. **Set up Database User**:
   - Go to "Database Access" → "Add New Database User"
   - Choose "Password" authentication
   - Create user with read/write permissions

4. **Whitelist IP Addresses**:
   - Go to "Network Access" → "Add IP Address"
   - Add `0.0.0.0/0` for development (restrict in production)

5. **Get Connection String**:
   - Go to "Clusters" → "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password

## 🔧 Step 2: Set up Stream Chat

1. **Create Stream Account**:
   - Go to [getstream.io](https://getstream.io/)
   - Sign up for free account
   - Create a new app

2. **Get API Credentials**:
   - Go to your app dashboard
   - Copy API Key and Secret
   - Note: Keep secret secure, never expose in frontend

## 🌐 Step 3: Deploy Backend

### Option A: Railway (Recommended)

1. **Create Railway Account**:
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Deploy Backend**:
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your Talksy repository
   - Choose "backend" folder for deployment
   - Railway will auto-detect Node.js

3. **Set Environment Variables**:
   - Go to your project → "Variables"
   - Add these variables:
     ```
     MONGO_URI=your_mongodb_atlas_connection_string
     JWT_SECRET_KEY=your_secure_random_jwt_secret
     STREAM_API_KEY=your_stream_api_key
     STREAM_API_SECRET=your_stream_api_secret
     NODE_ENV=production
     ```

4. **Set up Domain** (optional):
   - Go to "Settings" → "Domains"
   - Add custom domain or use Railway domain

5. **Get Backend URL**:
   - Copy the deployment URL (e.g., `https://talksy-backend.up.railway.app`)

### Option B: Render

1. **Create Render Account**:
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Deploy Backend**:
   - Click "New" → "Web Service"
   - Connect your GitHub repo
   - Set build settings:
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Root Directory**: `backend`

3. **Set Environment Variables**:
   - Add the same variables as Railway

4. **Deploy**:
   - Render will build and deploy automatically

## 🎨 Step 4: Deploy Frontend

### Option A: Vercel (Recommended)

1. **Create Vercel Account**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub

2. **Deploy Frontend**:
   - Click "New Project"
   - Import your GitHub repo
   - Configure project:
     - **Framework Preset**: Vite
     - **Root Directory**: `frontend`
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`

3. **Set Environment Variables**:
   - Go to project settings → "Environment Variables"
   - Add:
     ```
     VITE_API_BASE_URL=https://your-backend-url/api
     VITE_STREAM_API_KEY=your_stream_api_key
     ```

4. **Deploy**:
   - Vercel will build and deploy automatically
   - Get your frontend URL (e.g., `https://talksy.vercel.app`)

### Option B: Netlify

1. **Create Netlify Account**:
   - Go to [netlify.com](https://netlify.com)
   - Sign up with GitHub

2. **Deploy Frontend**:
   - Click "New site from Git"
   - Choose your repo
   - Set build settings:
     - **Base directory**: `frontend`
     - **Build command**: `npm run build`
     - **Publish directory**: `dist`

3. **Set Environment Variables**:
   - Go to site settings → "Environment variables"
   - Add the same variables as Vercel

4. **Deploy**:
   - Netlify will build and deploy

## 🔗 Step 5: Update CORS Settings

Update your backend CORS configuration to allow requests from your frontend domain:

**In `backend/src/server.js`**:
```javascript
app.use(
  cors({
    origin: [
      "http://localhost:5173",  // development
      "http://localhost:5175",  // development
      "https://your-frontend-domain.vercel.app",  // production
      "https://talksy.netlify.app"  // if using Netlify
    ],
    credentials: true,
  })
);
```

## 🔒 Step 6: Security Checklist

Before going live, ensure:

1. **Environment Variables**:
   - ✅ No secrets exposed in frontend code
   - ✅ JWT secret is strong and random
   - ✅ Database IP whitelisting is restrictive

2. **HTTPS**:
   - ✅ All deployment platforms provide SSL certificates
   - ✅ Force HTTPS redirects configured

3. **Rate Limiting**:
   - Consider adding rate limiting to prevent abuse

4. **Monitoring**:
   - Set up error logging (consider services like Sentry)

## 🚀 Step 7: Test Production Deployment

1. **Test Authentication**:
   - Sign up new user
   - Login/logout functionality

2. **Test Chat Features**:
   - Send messages
   - Create chat channels

3. **Test Video Calls**:
   - Initiate video calls
   - Check audio/video quality

4. **Test Friend System**:
   - Send friend requests
   - Accept/reject requests

5. **Test Responsive Design**:
   - Check on mobile devices
   - Test different screen sizes

## 💰 Cost Estimation

### Free Tier Limits:
- **MongoDB Atlas**: 512MB storage
- **Railway/Render**: 512MB RAM, limited hours
- **Vercel/Netlify**: 100GB bandwidth
- **Stream**: Generous free tier for development

### Paid Upgrades (when needed):
- **MongoDB Atlas**: $9/month for 2GB storage
- **Railway**: $5/month for persistent apps
- **Render**: $7/month for 750 hours
- **Vercel**: $20/month for pro features

## 🛠️ Troubleshooting

### Common Issues:

1. **CORS Errors**:
   - Check backend CORS origins include your frontend domain
   - Ensure credentials: true is set

2. **Environment Variables**:
   - Verify all required variables are set
   - Check variable names match code expectations

3. **Database Connection**:
   - Ensure MongoDB Atlas IP whitelist includes deployment IP
   - Verify connection string format

4. **Build Failures**:
   - Check build logs for errors
   - Ensure all dependencies are in package.json

5. **Stream Chat Issues**:
   - Verify API keys are correct
   - Check Stream dashboard for app status

## 📞 Support

If you encounter issues:
1. Check deployment platform documentation
2. Review application logs
3. Test locally with production environment variables
4. Check GitHub issues for similar problems

## 🎉 Going Live!

Once everything is working:
1. Update your README with production URLs
2. Announce your launch on social media
3. Monitor for any issues
4. Gather user feedback for improvements

Happy deploying! 🚀
