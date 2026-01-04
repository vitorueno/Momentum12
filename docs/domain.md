# Domain Model

This document describes the core domain concepts of Momentum12.
It focuses on *what the system is*, not on technical implementation details.

## Cycle

A cycle represents a fixed planning period (default: 12 weeks) in wich Goals and Tasks are defined and executed.

A Cycle:
- has a start date
- has an end date
- has a status (`ACTIVE`, `COMPLETED`)
- groups multiple goals
- is owned by a user

Only one Cycle can be active at a time for a given user.

## Goal

A Goal represents a meaningful objective that the user wants to achieve
within a Cycle.

A Goal:
- belongs to exactly one Cycle
- has a title and optional description
- can be marked as completed
- has progress calculated based on its tasks
- is owned by a user

A Goal does not exist outside a Cycle.

## Task

A Task represents an actionable unit of work related to a Goal.

A Task:
- belongs to exactly one Goal
- has a title
- has a status (`PENDING`, `COMPLETED`, `SKIPPED`)
- contributes to Goal progress
- is owned by a user

Tasks are the smallest unit of execution in the system.

## User

A User represents an authenticated person using the system.

A User:
- can have multiple Cycles over time
- can have only one active Cycle
- owns Cycles, Goals, and Tasks