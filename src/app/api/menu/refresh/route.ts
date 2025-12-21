import { NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { fetchMenuData } from '@/lib/menuData';

// This endpoint clears the cache and fetches fresh data
export async function POST() {
  try {
    // Revalidate the menu API path to clear cache
    revalidatePath('/api/menu');
    
    // Revalidate the cache tag to clear fetch cache
    revalidateTag('menu-data');
    
    // Fetch fresh data to ensure it's updated
    const menuData = await fetchMenuData();
    
    return NextResponse.json({
      success: true,
      message: 'Cache cleared successfully. Fresh data fetched.',
      timestamp: new Date().toISOString(),
      data: menuData,
    });
  } catch (error) {
    console.error('Error clearing cache:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to clear cache and fetch fresh data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Also support GET method for easy browser access
export async function GET() {
  return POST();
}

