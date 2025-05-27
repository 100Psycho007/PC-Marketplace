import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import connectDB from '@/lib/mongodb';
import { PCBuild } from '@/models/PCBuild';
import { Component } from '@/models/Component';

export const dynamic = 'force-dynamic';

// GET /api/builds - Get user's builds
export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();
    const builds = await PCBuild.find({ user: session.user.id })
      .populate('components.cpu')
      .populate('components.motherboard')
      .populate('components.gpu')
      .populate('components.ram')
      .populate('components.storage')
      .populate('components.psu')
      .populate('components.case')
      .populate('components.cooling')
      .sort({ createdAt: -1 });

    return NextResponse.json(builds);
  } catch (error) {
    console.error('Error fetching builds:', error);
    return NextResponse.json(
      { error: 'Failed to fetch builds' },
      { status: 500 }
    );
  }
}

// POST /api/builds - Create a new build
export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();
    const data = await request.json();

    // Calculate total price
    const components = await Component.find({
      _id: { $in: Object.values(data.components).filter(Boolean) }
    });

    const totalPrice = components.reduce((sum, component) => sum + component.price, 0);

    // Check compatibility
    const compatibility = await checkCompatibility(components);

    // Create new build
    const build = await PCBuild.create({
      ...data,
      user: session.user.id,
      totalPrice,
      compatibility,
    });

    return NextResponse.json(build, { status: 201 });
  } catch (error) {
    console.error('Error creating build:', error);
    return NextResponse.json(
      { error: 'Failed to create build' },
      { status: 500 }
    );
  }
}

// Helper function to check component compatibility
async function checkCompatibility(components: any[]) {
  const issues: string[] = [];
  let isCompatible = true;

  // Get CPU and motherboard
  const cpu = components.find(c => c.category === 'CPU');
  const motherboard = components.find(c => c.category === 'Motherboard');

  if (cpu && motherboard) {
    // Check CPU socket compatibility
    if (cpu.specifications.cpuSocket !== motherboard.specifications.mbChipset) {
      issues.push('CPU socket is not compatible with motherboard');
      isCompatible = false;
    }
  }

  // Get RAM and motherboard
  const ram = components.find(c => c.category === 'RAM');
  if (ram && motherboard) {
    // Check RAM type compatibility
    if (!motherboard.specifications.mbMemorySlots.includes(ram.specifications.ramType)) {
      issues.push('RAM type is not compatible with motherboard');
      isCompatible = false;
    }
  }

  // Get PSU and calculate power requirements
  const psu = components.find(c => c.category === 'PSU');
  const gpu = components.find(c => c.category === 'GPU');
  
  if (psu && (cpu || gpu)) {
    let totalPower = 0;
    if (cpu) totalPower += cpu.specifications.cpuTdp || 0;
    if (gpu) totalPower += gpu.specifications.gpuPowerConsumption || 0;
    
    if (totalPower > psu.specifications.psuWattage) {
      issues.push('Power supply wattage is insufficient');
      isCompatible = false;
    }
  }

  return {
    isCompatible,
    issues,
  };
} 