# Momentum12

Momentum12 is a goal and task management system built around **12-week cycles**.  
The project focuses on helping users plan, execute, and track progress toward meaningful goals in a structured and measurable way.

> This application was created as a portfolio project to exercise backend and frontend development, domain modeling, and clean software architecture skills.

## 🧠 Motivation

I currently use the 12-week cycle methodology to organize my goals and tasks.  
While tools like Notion are flexible, they lack built-in metrics and domain rules specifically designed for this approach.

Momentum12 was created to explore:
- clear domain modeling (cycles, goals, tasks)
- business rules around progress tracking
- dashboards and statistics based on real data
- a clean and maintainable full-stack architecture

## ✨ Core Concepts

- **Cycle**: A fixed planning period (default: 12 weeks) that groups related goals.

- **Goal**: A measurable objective that belongs to a cycle.

- **Task**: An actionable item linked to a goal, used to track execution and progress.

Progress is derived from task completion and aggregated at the goal and cycle levels.

## 📊 Planned Features

- Create and manage 12-week cycles
- Define goals within a cycle
- Create tasks linked to goals
- Automatic progress calculation
- Cycle and goal dashboards
- Basic authentication (JWT)

## 🛠️ Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- TanStack Query (React Query)

### Backend
- Node.js
- TypeScript
- NestJS
- Prisma ORM
- PostgreSQL
- JWT Authentication

## 📄 License

This project is for educational and portfolio purposes.