import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const pass = searchParams.get('pass');

    if (!pass) {
      return NextResponse.json({ 
        error: "Please provide a pass parameter in the URL. Example: /api/fix-login?pass=123456" 
      });
    }

    const hash = await bcrypt.hash(pass, 10);
    
    await prisma.admin.upsert({
      where: { username: 'admin' },
      update: { passwordHash: hash },
      create: { username: 'admin', passwordHash: hash }
    });

    return NextResponse.json({ 
      success: true, 
      message: `Admin password successfully reset to: ${pass}` 
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
