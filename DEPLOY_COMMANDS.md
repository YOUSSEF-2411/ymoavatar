# 🚀 Git & GitHub Deployment Commands

## Step 1: Initialize Git (if not done)

```powershell
# Check if git is initialized
git status

# If not initialized:
git init
git add .
git commit -m "Initial commit: YMO Avatar AR Platform"
```

## Step 2: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `ymoavatar` or `ymo-avatar-ar`
3. Description: "WebAR Platform - Upload images, link videos, experience AR in browser"
4. Make it **Public** (or Private if you prefer)
5. **DO NOT** initialize with README (we have one)
6. Click "Create repository"

## Step 3: Connect & Push

```powershell
# Add your GitHub repository as remote
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/ymoavatar.git

# If you already have a remote, update it:
git remote set-url origin https://github.com/YOUR_USERNAME/ymoavatar.git

# Check remote is set
git remote -v

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 4: If Git Push Requires Authentication

### Option A: Personal Access Token (Recommended)
1. Go to GitHub Settings → Developer Settings → Personal Access Tokens
2. Generate new token (classic)
3. Select scopes: `repo` (full control)
4. Copy the token
5. When pushing, use token as password:
   ```
   Username: YOUR_GITHUB_USERNAME
   Password: YOUR_PERSONAL_ACCESS_TOKEN
   ```

### Option B: SSH (Alternative)
```powershell
# Generate SSH key
ssh-keygen -t ed25519 -C "your_email@example.com"

# Add to SSH agent
ssh-add ~/.ssh/id_ed25519

# Copy public key
Get-Content ~/.ssh/id_ed25519.pub | clip

# Add to GitHub: Settings → SSH Keys → New SSH Key
# Paste the key

# Change remote to SSH
git remote set-url origin git@github.com:YOUR_USERNAME/ymoavatar.git

# Push
git push -u origin main
```

## Step 5: Verify on GitHub

1. Go to `https://github.com/YOUR_USERNAME/ymoavatar`
2. You should see all your files
3. README.md should display nicely

---

## 🔄 Future Updates

When you make changes:

```powershell
# Stage all changes
git add .

# Or stage specific files
git add src/pages/Scan.tsx

# Commit with message
git commit -m "fix: improve AR scanning performance"

# Push to GitHub
git push
```

---

## 🌟 Deploy to Vercel (After GitHub Push)

### Method 1: Web Interface
1. Go to https://vercel.com
2. Sign up / Login with GitHub
3. Click "New Project"
4. Import your `ymoavatar` repository
5. Framework Preset: **Vite**
6. Build Command: `npm run build`
7. Output Directory: `dist`
8. Add Environment Variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
   - `VITE_SUPABASE_PROJECT_ID`
9. Click **Deploy**
10. Wait 2-3 minutes
11. Your app is live! 🎉

### Method 2: Vercel CLI
```powershell
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name: ymoavatar
# - Directory: ./
# - Override settings? No

# Add environment variables
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_PUBLISHABLE_KEY
vercel env add VITE_SUPABASE_PROJECT_ID

# Deploy to production
vercel --prod
```

---

## 📱 Deploy to Netlify (Alternative)

### Web Interface:
1. Go to https://netlify.com
2. Sign up / Login
3. "Add new site" → "Import an existing project"
4. Connect to GitHub
5. Select `ymoavatar` repository
6. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
7. Add environment variables
8. Deploy!

### Netlify CLI:
```powershell
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

---

## ✅ Quick Checklist

Before deploying:
- [ ] Code builds successfully (`npm run build`)
- [ ] All files committed to git
- [ ] Pushed to GitHub
- [ ] .env NOT in git (check .gitignore)
- [ ] Environment variables ready
- [ ] Supabase project ready
- [ ] Edge Functions deployed

After deploying:
- [ ] Test on mobile device
- [ ] Test AR scanning
- [ ] Check camera permissions
- [ ] Verify videos load
- [ ] Test project creation
- [ ] Check dashboard

---

## 🎯 Your URLs After Deployment

- **GitHub Repo:** `https://github.com/YOUR_USERNAME/ymoavatar`
- **Vercel App:** `https://ymoavatar.vercel.app` (or custom domain)
- **Netlify App:** `https://ymoavatar.netlify.app`

---

## 🔐 Important: Environment Variables

Make sure these are set in your deployment platform:

```env
VITE_SUPABASE_URL=https://eovdsfouwvgtvlhxmqya.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_SUPABASE_PROJECT_ID=eovdsfouwvgtvlhxmqya
```

⚠️ **Never commit .env to Git!** (Already in .gitignore)

---

## 🆘 Troubleshooting

### "Permission denied (publickey)"
→ Use HTTPS instead of SSH or set up SSH keys

### "Failed to push"
→ Use Personal Access Token as password

### "Build failed" on Vercel/Netlify
→ Check environment variables are set correctly

### "AR not working" after deploy
→ Ensure using HTTPS (all platforms provide this automatically)

---

**Ready to deploy? Let's go! 🚀**

```powershell
# Quick deploy commands:
git add .
git commit -m "feat: production-ready AR platform"
git push origin main

# Then go to vercel.com or netlify.com and import!
```
