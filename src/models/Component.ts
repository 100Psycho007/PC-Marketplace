import mongoose from 'mongoose';

const componentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['CPU', 'GPU', 'RAM', 'Motherboard', 'Storage', 'PSU', 'Case', 'Cooling'],
  },
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  specifications: {
    // CPU
    cpuSocket: String,
    cpuCores: Number,
    cpuThreads: Number,
    cpuBaseSpeed: Number,
    cpuBoostSpeed: Number,
    cpuTdp: Number,

    // GPU
    gpuMemory: Number,
    gpuMemoryType: String,
    gpuCoreClock: Number,
    gpuBoostClock: Number,
    gpuPowerConsumption: Number,

    // RAM
    ramCapacity: Number,
    ramSpeed: Number,
    ramType: String,
    ramModules: Number,

    // Motherboard
    mbChipset: String,
    mbMemorySlots: Number,
    mbMaxMemory: Number,
    mbPciSlots: Number,
    mbFormFactor: String,

    // Storage
    storageCapacity: Number,
    storageType: String,
    storageInterface: String,
    storageReadSpeed: Number,
    storageWriteSpeed: Number,

    // PSU
    psuWattage: Number,
    psuEfficiency: String,
    psuModular: String,
    psuConnectors: [String],

    // Case
    caseFormFactor: String,
    caseExpansionSlots: Number,
    caseDriveBays: Number,
    caseIncludedFans: Number,

    // Cooling
    coolingType: String,
    coolingSockets: [String],
    coolingNoiseLevel: Number,
    coolingFanSpeed: Number,
  },
  compatibility: {
    sockets: [String],
    formFactors: [String],
    memoryTypes: [String],
    powerRequirements: {
      minWattage: Number,
      recommendedWattage: Number,
    },
  },
  stock: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

// Indexes for efficient querying
componentSchema.index({ category: 1, brand: 1, model: 1 });
componentSchema.index({ 'specifications.cpuSocket': 1 });
componentSchema.index({ 'specifications.mbFormFactor': 1 });
componentSchema.index({ price: 1 });

export const Component = mongoose.models.Component || mongoose.model('Component', componentSchema); 