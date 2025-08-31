import { NextResponse } from 'next/server';
import { fetchMenuData } from '@/lib/menuData';

export async function GET() {
  try {
    const menuData = await fetchMenuData();
    return NextResponse.json(menuData);
  } catch (error) {
    console.error('Error fetching menu data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch menu data' },
      { status: 500 }
    );
  }
}
