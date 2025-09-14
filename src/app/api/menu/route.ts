import { NextResponse } from 'next/server';
import { fetchMenuData } from '@/lib/menuData';

// Cache for 5 minutes (300 seconds)
export const revalidate = 300;

export async function GET() {
  try {
    const menuData = await fetchMenuData();
    
    return NextResponse.json(menuData, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        'CDN-Cache-Control': 'public, s-maxage=300',
        'Vercel-CDN-Cache-Control': 'public, s-maxage=300',
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
