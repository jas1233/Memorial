import mongoose from 'mongoose';

const MemorialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters'],
  },
  birthDate: {
    type: Date,
    required: true,
  },
  deathDate: {
    type: Date,
    required: true,
  },
  biography: {
    type: String,
    required: true,
    maxlength: [5000, 'Biography cannot be more than 5000 characters'],
  },
  imageUrl: {
    type: String,
  },
  createdBy: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  tributes: [
    {
      name: String,
      message: String,
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

export default mongoose.models.Memorial || mongoose.model('Memorial', MemorialSchema);
