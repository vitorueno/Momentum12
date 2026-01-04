# Domain Model

This document describes the core domain concepts of Momentum12.

---

## Cycle

A Cycle represents a fixed planning period composed of multiple weeks
(default: 12 weeks).

A Cycle:
- has a start date and end date
- contains multiple weeks
- groups Goals and Tasks
- has a status (`ACTIVE`, `COMPLETED`)
- is owned by a user

Only one Cycle can be active at a time per user.

---

## Week

A Week represents a planning and execution unit inside a Cycle.

A Week:
- belongs to a Cycle
- contains Tasks
- is used to evaluate execution and discipline
- is the primary unit for progress tracking

---

## Goal

A Goal represents a meaningful objective to be achieved within a Cycle.

A Goal:
- belongs to exactly one Cycle
- has a title and optional description
- can be categorized (user-defined)
- has progress calculated from its Tasks
- can be manually marked as completed
- follows SMART-inspired principles

A Goal does not exist outside a Cycle.

---

## Task

A Task represents a unit of execution planned for a specific Week.

A Task:
- belongs to a Week
- may optionally belong to a Goal
- has a title
- has a status (`PENDING`, `COMPLETED`, `MISSED`)
- may have a planned date
- has a completion date when completed

Tasks without a Goal are considered standalone tasks.

---

## Recurring Task

A Recurring Task defines a template that automatically generates Tasks
on a weekly or daily basis.

Each generated Task instance is evaluated independently.

---

## User

A User represents an authenticated person using the system.

A User:
- owns Cycles, Goals, and Tasks
- can define custom Goal categories
