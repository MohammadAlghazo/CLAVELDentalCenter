import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Default settings if database is empty
const defaultSettings = [
  { key: "workingDays", value: "طوال أيام الأسبوع" },
  { key: "workingHoursGeneral", value: "من 9 صباحاً إلى 12 ظهراً\nومن 1 ظهراً إلى 12 صباحاً" },
  { key: "bookingShifts", value: JSON.stringify([
    { id: "morning", label: "صباحاً (9ص - 12م)" },
    { id: "evening", label: "مساءً (1م - 12ص)" }
  ])}
];

export async function GET() {
  try {
    const settings = await prisma.setting.findMany();
    
    // Convert array of key-value pairs to an object
    const settingsObject: Record<string, string> = {};
    settings.forEach(s => {
      settingsObject[s.key] = s.value;
    });

    // Merge with defaults if missing
    defaultSettings.forEach(def => {
      if (!settingsObject[def.key]) {
        settingsObject[def.key] = def.value;
      }
    });

    return NextResponse.json(settingsObject);
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // We expect { workingDays, workingHoursGeneral, bookingShifts }
    
    const updatePromises = Object.keys(data).map(async (key) => {
      return prisma.setting.upsert({
        where: { key },
        update: { value: typeof data[key] === 'string' ? data[key] : JSON.stringify(data[key]) },
        create: { key, value: typeof data[key] === 'string' ? data[key] : JSON.stringify(data[key]) },
      });
    });

    await Promise.all(updatePromises);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating settings:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
