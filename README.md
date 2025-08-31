# South Indian Kitchen - Online Menu

A beautiful, responsive restaurant menu application built with Next.js, TypeScript, and Tailwind CSS. The menu data is fetched from a Google Sheets document, making it easy to update menu items without touching the code.

## Features

- 🍛 **Beautiful UI**: Modern, responsive design with gradient backgrounds and smooth animations
- 🔍 **Search Functionality**: Search through menu items by name, category, section, or description
- 📱 **Mobile Responsive**: Optimized for all device sizes
- 🏆 **Special Badges**: Highlight best sellers and chef's special items
- 📊 **Google Sheets Integration**: Menu data is pulled from a Google Sheets document
- ⚡ **Fast Performance**: Built with Next.js 14 and optimized for speed

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
git clone <your-repo-url>
cd restaurant-menu
npm install
```

### 2. Configure Google Sheets

1. Create a new Google Sheets document
2. Add your menu data with the following columns:
   - Section (e.g., "South Indian", "North Indian")
   - Category (e.g., "Breakfast", "Lunch", "Dinner")
   - Item Name
   - Description
   - Price Regular (optional)
   - Price Small (optional)
   - Price Medium (optional)
   - Price Large (optional)
   - Status (Active/Inactive)
   - Is Active (TRUE/FALSE)
   - Best Seller (TRUE/FALSE)
   - Chef Special (TRUE/FALSE)

3. Make the sheet public:
   - Click "Share" in the top right
   - Change to "Anyone with the link" can view
   - Copy the sheet ID from the URL

### 3. Environment Configuration

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_GOOGLE_SHEET_ID=your_google_sheet_id_here
```

Replace `your_google_sheet_id_here` with your actual Google Sheet ID.

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
restaurant-menu/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── menu/
│   │   │       └── route.ts          # API endpoint for menu data
│   │   ├── globals.css               # Global styles
│   │   ├── layout.tsx                # Root layout
│   │   └── page.tsx                  # Main page component
│   ├── components/
│   │   ├── MenuBadge.tsx             # Badge component for special items
│   │   ├── MenuItem.tsx              # Individual menu item component
│   │   ├── SearchBar.tsx             # Search functionality
│   │   ├── Navigation.tsx            # Section navigation
│   │   └── MenuSection.tsx           # Menu section display
│   ├── hooks/
│   │   └── useMenuData.ts            # Custom hook for menu data
│   ├── lib/
│   │   └── menuData.ts               # Google Sheets integration
│   └── types/
│       └── menu.ts                   # TypeScript type definitions
├── .env.local                        # Environment variables
├── package.json                      # Dependencies and scripts
├── tailwind.config.js                # Tailwind CSS configuration
├── postcss.config.js                 # PostCSS configuration
└── next.config.js                    # Next.js configuration
```

## Technologies Used

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Google Sheets API**: For menu data management

## Customization

### Styling
The application uses Tailwind CSS for styling. You can customize colors, fonts, and layouts by modifying the Tailwind configuration in `tailwind.config.js`.

### Menu Structure
The menu is organized by sections and categories. You can modify the structure by updating your Google Sheets document or adjusting the parsing logic in `src/lib/menuData.ts`.

### Features
Add new features by:
- Creating new components in `src/components/`
- Adding new API routes in `src/app/api/`
- Extending the menu types in `src/types/menu.ts`

## Deployment

The application can be deployed to Vercel, Netlify, or any other hosting platform that supports Next.js.

```bash
npm run build
npm start
```

## License

This project is open source and available under the [MIT License](LICENSE).
