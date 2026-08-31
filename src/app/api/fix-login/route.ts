import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // The exact hash for "admin123$$"
    const targetHash = '$2b$10$2exoU1KsXaLnAi5M.pzaVOgPVmMomJscVhjYBL1MpnfrBDZMnA9AW';
    
    // Check if admin exists
    const adminExists = await prisma.admin.findUnique({ where: { username: 'admin' } });
    
    if (adminExists) {
      await prisma.admin.update({
        where: { username: 'admin' },
        data: { passwordHash: targetHash }
      });
    } else {
      await prisma.admin.create({
        data: {
          username: 'admin',
          passwordHash: targetHash
        }
      });
    }

    return NextResponse.json({ success: true, message: 'Admin password reset to admin123$$' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
