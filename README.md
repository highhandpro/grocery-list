# 🛒 GroceryCart

A mobile-first grocery shopping checklist designed for your **iPhone**. Paste raw recipe ingredients from any food blog, website, or notes, and GroceryCart instantly parses them and organizes them by **supermarket aisle** so you can quickly check items off as you walk through the grocery store.

---

## 📱 Designed for iPhone Shopping

- **⚡ Screen Keep Awake (Wake Lock):** Tap the lightning bolt icon in the header so your iPhone screen never locks or dims while your hands are on the shopping cart.
- **📳 Haptic Feedback:** Vibrates subtly on tap when ticking items off on iOS Safari.
- **👆 One-Handed Big Tap Targets:** Strike through items anywhere on the card; checked items dim or move out of the way.
- **📶 Works 100% Offline (PWA):** Supermarkets often have spotty cellular service; your list and progress are saved locally on your phone.
- **📲 Add to iPhone Home Screen:** Open in Safari, tap the Share icon `⎋`, then select **"Add to Home Screen"** to run it fullscreen like a native iOS app.

---

## 🌟 Built-In Features

1. **Smart Recipe Ingredient Parser:**
   - Paste multi-line ingredient blocks directly from recipe websites (NYT Cooking, Allrecipes, Food Network, TikTok, ChatGPT).
   - Automatically cleans bullet points (`•`, `-`, `*`), numbered steps (`1.`, `2.`), and checkboxes (`[ ]`).
   - Extracts quantities, units (cups, tbsp, oz, lbs, cloves, cans, etc.), and preparation instructions (e.g. *, minced*, *, chopped*).
2. **Automatic Supermarket Aisle Grouping:**
   - 🥬 **Produce** (Fruits, vegetables, fresh herbs)
   - 🥩 **Meat & Seafood** (Chicken, beef, salmon, shrimp)
   - 🥛 **Dairy & Eggs** (Milk, butter, cheeses, heavy cream)
   - 🥖 **Bakery & Bread** (Breads, tortillas, buns, pitas)
   - 🌾 **Pantry & Grains** (Rice, pasta, flour, sugars)
   - 🥫 **Canned & Jarred** (Broth, beans, canned tomatoes)
   - 🧂 **Spices & Condiments** (Oils, vinegars, seasonings, sauces)
   - 🧊 **Frozen** (Frozen veggies, ice cream)
   - 🧃 **Beverages**
   - 🍪 **Snacks & Sweets**
   - 🧼 **Household & Personal**
3. **Multiple View Modes:**
   - **By Aisle:** Organizes items by store section with collapsible accordions.
   - **All Items:** Clean flat checklist.
   - **By Recipe:** View ingredients grouped under their recipe name.
4. **Multiple Recipe Manager:**
   - Save multiple recipes (e.g. *Tuscan Garlic Chicken* + *Guacamole*).
   - Toggle recipes active or inactive to include or exclude from today's shopping trip without deleting them.
5. **Quick Add Bar:**
   - Tap the bottom input at any time to add single items on the fly (e.g. `2 gallons milk` or `paper towels`).
6. **Progress Tracker & Celebration:**
   - Live visual progress bar showing `% in cart`.
   - Confetti celebration when all items are checked off!
7. **Share & Export:**
   - One-tap copy or native iOS Share sheet to send an aisle-organized list via iMessage or WhatsApp to a partner.

---

## 💡 Suggested Features Roadmap

As requested, here are recommended features you can add to take the shopping experience even further:

| Feature | Description |
|---|---|
| 📸 **Recipe Photo / Camera OCR** | Snap a picture of a cookbook page or handwritten family recipe to convert it into a grocery list directly via camera. |
| 🗺️ **Custom Aisle Sequence** | Drag and drop aisles to match the exact walking layout of your favorite local store (e.g. Produce ➔ Bakery ➔ Meat ➔ Dairy). |
| 👥 **Real-Time Partner Sync** | Live co-shopping via WebSockets / Supabase. As your partner checks off items in Dairy, they check off on your phone in real time. |
| ⚖️ **Recipe Batch Scaling** | Double, triple, or halve ingredient quantities (e.g. 2x batch for 8 people) before adding to list. |
| ⌚ **Apple Watch Companion** | Check off items from your wrist without having to pull your iPhone out of your pocket or hold it while steering a cart. |
| 💲 **Price & Budget Estimator** | Set approximate prices per item or aisle to track your cart total before hitting the register. |
| 🧊 **Pantry Check ("Already Have It")** | Quick checklist before leaving the house to mark off staples you already have in your pantry (salt, olive oil, etc.). |
| 🏷️ **Barcode Scanner** | Scan grocery items in the store to cross them off automatically. |

---

## 🚀 Getting Started

### Local Development
```bash
npm install
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

### Deploy to GitHub Pages
The included GitHub Action in `.github/workflows/deploy.yml` automatically builds and deploys this app to GitHub Pages whenever you push to `main`.
To enable:
1. Go to your repo on GitHub: **Settings** ➔ **Pages**.
2. Under **Build and deployment**, select **GitHub Actions**.
3. Push to `main`, and your app will be live at `https://highhandpro.github.io/grocery-list/`!
