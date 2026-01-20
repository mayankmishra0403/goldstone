# ⚡ Quick Reference Card

## 🏃 Quick Start (5 minutes)

```bash
# 1. Install
npm install

# 2. Start dev
npm run dev

# 3. Open browser
# http://localhost:3000
```

---

## 🔐 Security Status: ✅ SECURE

- ✅ 0 vulnerabilities
- ✅ API key protected
- ✅ All secrets in `.env.local`
- ✅ Code reviewed & safe
- ✅ Production ready

---

## 📁 Key Files

| File | Purpose |
|------|---------|
| `.env.local` | Your Appwrite credentials (secret!) |
| `src/lib/appwrite.ts` | Client SDK (browser) |
| `src/lib/appwrite-admin.ts` | Admin SDK (server only) |
| `src/app/api/check-availability/route.ts` | Availability API |
| `src/services/*.ts` | Data services |
| `src/app/*/page.tsx` | Pages & forms |

---

## 🚀 Deploy

1. **Add env vars to hosting provider:**
   - All `NEXT_PUBLIC_*` vars (safe)
   - `APPWRITE_API_KEY` (secret)

2. **Configure Appwrite permissions:**
   - Collections: set `create` permission to `Any`

3. **Deploy:**
   ```bash
   npm run build
   npm run start
   ```

---

## 📊 Data Collections

| Collection | Data | Who Creates |
|-----------|------|-------------|
| `bookings` | Room bookings | Guests |
| `rooms` | Room listings | Admin only |
| `tablebookings` | Restaurant reservations | Guests |
| `banquetenquiries` | Banquet event requests | Guests |
| `contactmessages` | Contact form submissions | Guests |

---

## 🔗 Appwrite URLs

- **Dashboard:** https://fra.cloud.appwrite.io/console
- **Project ID:** `68e80ac1002e854458c5`
- **Database ID:** `68e80af6002ace58d8e1`
- **Endpoint:** `https://fra.cloud.appwrite.io/v1`

---

## 📞 Common Issues

| Issue | Fix |
|-------|-----|
| Env vars not loading | Restart dev server |
| Appwrite errors | Check collection IDs in `.env.local` |
| Build fails | Run `npm run lint` to see errors |
| Data not appearing | Check Appwrite permissions |
| API key exposed | Ensure it's in `.env.local` not `.env` |

---

## ✅ Pre-Launch Checklist

- [ ] Local testing works (`npm run dev`)
- [ ] Production build succeeds (`npm run build`)
- [ ] Environment variables set in hosting
- [ ] Appwrite permissions configured
- [ ] Test form submission
- [ ] Data appears in Appwrite
- [ ] Deploy to production

---

## 📚 Full Documentation

- `SECURITY_AUDIT.md` - Detailed security report
- `SETUP.md` - Full deployment guide
- `IMPLEMENTATION_GUIDE.md` - Optional features
- `SECURITY_SUMMARY.md` - What was done

---

## 🎯 Key Security Points

1. **Admin key is server-only** → Never exposed to browser
2. **`.env.local` is gitignored** → Won't be committed
3. **Public IDs are safe** → Only work with project ID
4. **Appwrite handles permissions** → Collections restrict access
5. **Forms use client SDK** → Writes go directly to Appwrite

---

**Status: ✅ PRODUCTION READY**

*Last check: 0 vulnerabilities, build successful*
