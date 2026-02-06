# HRMS Lite - Deployment Guide

This guide provides step-by-step instructions for deploying the HRMS Lite application to production.

## Prerequisites

- GitHub account (for connecting repositories)
- PostgreSQL database hosting account (Render, Railway, or Supabase)
- Backend hosting account (Render or Railway)
- Frontend hosting account (Netlify)

---

## Step 1: Deploy PostgreSQL Database

### Option A: Render PostgreSQL

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **New** → **PostgreSQL**
3. Configure database:
   - **Name**: `hrms-lite-db`
   - **Database**: `hrms_lite`
   - **User**: (auto-generated)
   - **Region**: Choose closest to your users
   - **Plan**: Free tier (or paid for production)
4. Click **Create Database**
5. Wait for provisioning (2-3 minutes)
6. Copy the **External Database URL** from the database dashboard
7. Connect to your database using a PostgreSQL client (pgAdmin, DBeaver, or psql)
8. Run the migration file:
   ```bash
   psql <YOUR_DATABASE_URL> < backend/migrations/init.sql
   ```

### Option B: Railway PostgreSQL

1. Go to [Railway](https://railway.app/)
2. Click **New Project** → **Provision PostgreSQL**
3. Click on the PostgreSQL service
4. Go to **Variables** tab and copy the `DATABASE_URL`
5. Use the Railway CLI or a PostgreSQL client to run the migration:
   ```bash
   psql <YOUR_DATABASE_URL> < backend/migrations/init.sql
   ```

### Option C: Supabase

1. Go to [Supabase](https://supabase.com/)
2. Create a new project
3. Go to **SQL Editor**
4. Copy and paste the contents of `backend/migrations/init.sql`
5. Click **Run**
6. Go to **Project Settings** → **Database** and copy the connection string

---

## Step 2: Deploy Backend to Render/Railway

### Option A: Deploy to Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **New** → **Web Service**
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `hrms-lite-backend`
   - **Root Directory**: `backend`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free tier (or paid for production)

5. Add **Environment Variables**:
   ```
   DATABASE_URL=<your-database-url-from-step-1>
   PORT=5000
   NODE_ENV=production
   FRONTEND_URL=https://your-app.netlify.app
   ```
   (You'll update `FRONTEND_URL` after deploying frontend in Step 3)

6. Click **Create Web Service**
7. Wait for deployment (3-5 minutes)
8. Copy your backend URL (e.g., `https://hrms-lite-backend.onrender.com`)

### Option B: Deploy to Railway

1. Go to [Railway](https://railway.app/)
2. Click **New Project** → **Deploy from GitHub repo**
3. Select your repository
4. Add a new service for the backend
5. Configure:
   - **Root Directory**: `/backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
6. Add environment variables (same as Render option above)
7. Deploy and copy the generated URL

---

## Step 3: Deploy Frontend to Netlify

### Method 1: Netlify UI (Recommended)

1. Go to [Netlify](https://app.netlify.com/)
2. Click **Add new site** → **Import an existing project**
3. Connect to GitHub and select your repository
4. Configure build settings:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/build`

5. Add **Environment Variable**:
   ```
   REACT_APP_API_URL=<your-backend-url-from-step-2>/api
   ```
   Example: `https://hrms-lite-backend.onrender.com/api`

6. Click **Deploy site**
7. Wait for deployment (2-3 minutes)
8. Copy your frontend URL (e.g., `https://your-app.netlify.app`)

### Method 2: Netlify CLI

```bash
cd frontend
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

---

## Step 4: Update Backend CORS Configuration

1. Go back to your backend hosting platform (Render/Railway)
2. Update the `FRONTEND_URL` environment variable with your Netlify URL
   ```
   FRONTEND_URL=https://your-app.netlify.app
   ```
3. Trigger a redeployment or wait for auto-redeploy

---

## Step 5: Verify Deployment

### Test Backend API

Visit your backend health check endpoint:
```
https://your-backend-url.onrender.com/api/health
```

You should see:
```json
{
  "success": true,
  "message": "HRMS Lite API is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Test Frontend

1. Visit your Netlify URL
2. Navigate through all pages (Dashboard, Employees, Attendance)
3. Try adding an employee
4. Try marking attendance
5. Check for any console errors

---

## Environment Variables Summary

### Backend (.env)
```env
DATABASE_URL=postgresql://user:password@host:5432/database
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://your-app.netlify.app
```

### Frontend (.env)
```env
REACT_APP_API_URL=https://your-backend-url.onrender.com/api
```

---

## Troubleshooting

### Database Connection Issues

**Error**: `Connection refused` or `timeout`
- Check if database is running
- Verify DATABASE_URL is correct
- Check if database allows external connections

**Error**: `relation "employees" does not exist`
- Run the migration file: `backend/migrations/init.sql`

### CORS Errors

**Error**: `CORS policy: No 'Access-Control-Allow-Origin' header`
- Verify `FRONTEND_URL` is set correctly in backend
- Make sure there are no trailing slashes
- Redeploy backend after updating environment variables

### Frontend Not Loading Data

**Error**: `Network Error` or `Failed to fetch`
- Check if `REACT_APP_API_URL` is correct
- Include `/api` at the end of the URL
- Verify backend is running (test health endpoint)
- Check browser console for specific errors

### Build Failures

**Frontend build fails**:
- Make sure all dependencies are in `package.json`
- Check Node version compatibility (use Node 18+)
- Review build logs for specific errors

**Backend deployment fails**:
- Verify `package.json` has all dependencies
- Check if migration file syntax is correct
- Review deployment logs

---

## Post-Deployment Checklist

- [ ] Database is created and migration is run
- [ ] Backend health endpoint returns success
- [ ] Frontend loads without console errors
- [ ] Can add new employee
- [ ] Can delete employee
- [ ] Can mark attendance
- [ ] Can view attendance history
- [ ] Dashboard shows correct statistics
- [ ] Search functionality works
- [ ] All forms validate correctly
- [ ] Toast notifications appear

---

## Monitoring and Maintenance

### Backend Logs
- **Render**: Dashboard → Your Service → Logs
- **Railway**: Project → Service → Deployments → View Logs

### Frontend Logs
- **Netlify**: Site → Deploys → Deploy log

### Database Backups
- **Render**: Automatic daily backups on paid plans
- **Railway**: Use `pg_dump` for manual backups
- **Supabase**: Automatic backups included

---

## Scaling Considerations

For production use:

1. **Upgrade to paid plans** for better performance and uptime
2. **Add database indexes** for commonly queried columns
3. **Implement rate limiting** on API endpoints
4. **Add authentication** to protect admin routes
5. **Set up monitoring** with Sentry or similar tools
6. **Configure CDN** for frontend assets
7. **Enable HTTPS** (should be automatic on Render/Netlify)

---

## Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review deployment logs
3. Verify all environment variables are set correctly
4. Test backend API independently using Postman or curl
5. Check browser console for frontend errors
