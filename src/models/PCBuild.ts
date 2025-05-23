import mongoose from 'mongoose';

const pcBuildSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  components: {
    cpu: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Component',
    },
    motherboard: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Component',
    },
    gpu: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Component',
    },
    ram: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Component',
    },
    storage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Component',
    },
    psu: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Component',
    },
    case: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Component',
    },
    cooling: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Component',
    },
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  compatibility: {
    isCompatible: {
      type: Boolean,
      default: true,
    },
    issues: [{
      type: String,
    }],
  },
  status: {
    type: String,
    enum: ['draft', 'completed', 'quoted'],
    default: 'draft',
  },
  quotes: [{
    dealer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    price: Number,
    message: String,
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }],
}, {
  timestamps: true,
});

export const PCBuild = mongoose.models.PCBuild || mongoose.model('PCBuild', pcBuildSchema); 