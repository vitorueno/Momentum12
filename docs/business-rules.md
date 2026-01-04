# Business Rules

This document defines the rules that govern how the system behaves.
These rules must be enforced at the service layer.

## Cycle Rules

1. A user can have only one active Cycle at a time.
2. A Cycle cannot be deleted if it contains Goals.
3. Completing a Cycle automatically marks it as `COMPLETED`.
4. A Cycle duration is configurable, but defaults to 12 weeks.

## Goal Rules

5. A Goal must belong to an existing Cycle.
6. A Goal cannot be created outside an active Cycle.
7. A Goal progress is derived from its Tasks.
8. A Goal can be manually marked as completed only if all Tasks are completed or skipped.

## Task Rules

9. A Task must belong to a Goal.
10. A Task status can be one of:
    - `PENDING`
    - `COMPLETED`
    - `SKIPPED`
11. Only `COMPLETED` and `SKIPPED` tasks count toward progress.
12. A Task can be updated or marked as completed independently of other tasks.

## Progress Rules

13. Goal progress is calculated as: $(completed\_tasks + skipped\_tasks) / total\_tasks $

```
    (completed_tasks + skipped_tasks) / total_tasks
```
14. Cycle progress is calculated as the average progress of its Goals.
15. Progress values are always between 0 and 100.

## Deletion Rules

16. Deleting a Cycle is not allowed if it has Goals.
17. Deleting a Goal is not allowed if it has Tasks.
18. Tasks can always be deleted.
