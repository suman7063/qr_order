import { NextResponse } from 'next/server';
import { fetchMenuData } from '@/lib/menuData';

// Cache for 30 minutes (1800 seconds)
export const revalidate = 1800;

export async function GET() {
  try {
    const menuData = await fetchMenuData();
    
    return NextResponse.json(menuData, {
      headers: {
        'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600',
        'CDN-Cache-Control': 'public, s-maxage=1800',
        'Vercel-CDN-Cache-Control': 'public, s-maxage=1800',
      },
    });
  } catch (error) {
    console.error('Error fetching menu data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch menu data' },
      { status: 500 }
    );
  }
}
