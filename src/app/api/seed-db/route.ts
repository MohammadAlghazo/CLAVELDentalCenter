import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { seedSql } from '@/lib/seed-data';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Split queries by newline or semicolon, handling the generated format
    const queries = seedSql.split('\n').filter(q => q.trim().startsWith('INSERT') || q.trim().startsWith('SET'));

    let count = 0;
    for (const query of queries) {
      if (query.trim().length > 0) {
        await prisma.$executeRawUnsafe(query.trim());
        count++;
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Database seeded successfully directly from Vercel!',
      queriesExecuted: count
    });
  } catch (error: any) {
    console.error('Seeding error:', error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
