import mongoose from 'mongoose'

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['CPU', 'GPU', 'RAM', 'Motherboard', 'Storage', 'PSU', 'Case', 'Cooling', 'Other'],
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  location: {
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
  },
  images: [{
    type: String,
    required: true,
  }],
  description: {
    type: String,
    required: true,
  },
  condition: {
    type: String,
    required: true,
    enum: ['New', 'Like New', 'Good', 'Fair', 'Poor'],
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  contactEmail: {
    type: String,
    required: true,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  featuredUntil: {
    type: Date,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'expired', 'sold'],
    default: 'active',
  },
  specifications: {
    brand: String,
    model: String,
    yearOfPurchase: Number,
    warranty: Boolean,
    warrantyDetails: String,
  },
}, {
  timestamps: true,
})

// Index for efficient querying
listingSchema.index({ category: 1, 'location.city': 1, price: 1 })
listingSchema.index({ isFeatured: 1, featuredUntil: 1 })
listingSchema.index({ expiresAt: 1 })

// Auto-expire listings after 30 days
listingSchema.pre('save', function(next) {
  if (!this.expiresAt) {
    this.expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
  }
  next()
})

export const Listing = mongoose.models.Listing || mongoose.model('Listing', listingSchema) 