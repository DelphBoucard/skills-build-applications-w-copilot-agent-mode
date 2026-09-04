import mongoose from 'mongoose';
import { Activity } from '../models/Activity.js';
import { Leaderboard } from '../models/Leaderboard.js';
import { Team } from '../models/Team.js';
import { User } from '../models/User.js';
import { Workout } from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const [maya, jordan, priya, leo] = await User.insertMany([
      {
        displayName: 'Maya Chen',
        email: 'maya.chen@example.com',
        avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      },
      {
        displayName: 'Jordan Smith',
        email: 'jordan.smith@example.com',
        avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
      },
      {
        displayName: 'Priya Patel',
        email: 'priya.patel@example.com',
        avatarUrl: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce',
      },
      {
        displayName: 'Leo Garcia',
        email: 'leo.garcia@example.com',
        avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d',
      },
    ]);

    const [trailBlazers, coreCrew] = await Team.insertMany([
      {
        name: 'Trail Blazers',
        members: [maya._id, jordan._id],
      },
      {
        name: 'Core Crew',
        members: [priya._id, leo._id],
      },
    ]);

    await Activity.insertMany([
      {
        user: maya._id,
        type: 'Trail run',
        durationMinutes: 42,
        completedAt: new Date('2026-09-01T07:30:00.000Z'),
      },
      {
        user: jordan._id,
        type: 'Strength training',
        durationMinutes: 55,
        completedAt: new Date('2026-09-02T18:00:00.000Z'),
      },
      {
        user: priya._id,
        type: 'Yoga flow',
        durationMinutes: 35,
        completedAt: new Date('2026-09-03T06:45:00.000Z'),
      },
      {
        user: leo._id,
        type: 'Cycling intervals',
        durationMinutes: 48,
        completedAt: new Date('2026-09-03T16:15:00.000Z'),
      },
    ]);

    await Leaderboard.insertMany([
      {
        team: trailBlazers._id,
        score: 1840,
        period: 'September 2026',
      },
      {
        team: coreCrew._id,
        score: 1715,
        period: 'September 2026',
      },
    ]);

    await Workout.insertMany([
      {
        title: 'Morning Mobility Reset',
        difficulty: 'Beginner',
        estimatedMinutes: 20,
        exercises: ['Hip openers', 'World greatest stretch', 'Thoracic rotations'],
      },
      {
        title: 'Lunch Break Strength Circuit',
        difficulty: 'Intermediate',
        estimatedMinutes: 35,
        exercises: ['Goblet squats', 'Push-ups', 'Renegade rows', 'Plank holds'],
      },
      {
        title: 'Endurance Builder Ride',
        difficulty: 'Advanced',
        estimatedMinutes: 50,
        exercises: ['Warm-up spin', 'VO2 intervals', 'Tempo finish'],
      },
    ]);

    console.log('Database seeding complete');
    console.log('Inserted users, teams, activities, leaderboard entries, and workouts');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
