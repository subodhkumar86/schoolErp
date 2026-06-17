# Deployment Guide - EduFlow ERP SaaS Platform

This document outlines the hosting architecture, database provisioning, configuration variables, and startup procedures for running EduFlow ERP in production.

---

## ⚙️ Environment Variables Config

Create a `.env.production` (or configure these environment keys directly inside Vercel, AWS, or Railway dashboard):

```env
# MongoDB Connection String (Atlas or Private Cluster)
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/eduflow?retryWrites=true&w=majority

# Secret Key used to sign and verify user JWT sessions (Use high entropy key)
JWT_SECRET=your_secure_32_character_signing_key_here

# Next.js Environment Mode
NODE_ENV=production
```

---

## 🗄️ Database Setup (MongoDB Atlas)

1. **Provision Cluster:** Spin up a shared or dedicated cluster in your region.
2. **Network Access:** Whitelist target host IPs (or allow access from anywhere `0.0.0.0/0` if using serverless Vercel function instances).
3. **Database Seeding:**
   EduFlow ERP will automatically run database initial seeding (sandbox schools, user roles, default courses) on the first start or login endpoint call if the database is completely empty.

---

## 📦 Build & Launch Commands

To verify and run the production package locally or on servers:

```bash
# 1. Install Node modules
npm install

# 2. Compile and optimize static pages & API functions
npm run build

# 3. Start the production HTTP server
npm run start
```

---

## 🚦 Pre-Flight Production Checklist

Before launching to live customers, ensure:
1. **SSL/HTTPS Protection:** Verify your deployment has SSL active. Next.js cookies are set with `secure: true` when running in `production` mode.
2. **JWT Secret Strength:** Change the development fallback secret to a cryptographically secure random string.
3. **MongoDB Connection Limits:** Verify that your MongoDB connection pool size is sized correctly to prevent connection leakage across dynamic Next.js Serverless Function worker instances.
4. **Subscription Limits Checked:** Confirm that all multi-tenant API boundaries are running with subscription checks enabled.
