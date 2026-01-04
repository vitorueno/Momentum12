# Business Rules

---

## Cycle Rules

1. A user can have only one active Cycle at a time.
2. A Cycle consists of a fixed number of Weeks.
3. A Cycle can be completed manually or automatically at the end date.

---

## Goal Rules

4. A Goal must belong to a Cycle.
5. Goals cannot exist without a Cycle.
6. Goal progress is derived from its Tasks.
7. A Goal can be manually marked as completed.
8. A Goal is considered successful if:
   - progress ≥ user-defined threshold (default 80%)
   - and no Tasks are in `PENDING` status
   - or it is manually completed by the user

---

## Task Rules

9. A Task must belong to a Week.
10. A Task may optionally belong to a Goal.
11. Task status can be:
    - `PENDING`
    - `COMPLETED`
    - `MISSED`
12. Tasks not completed by the end of the Week are automatically marked as `MISSED`.
13. Tasks completed after the planned date are marked as completed late.
14. Standalone Tasks do not contribute to Goal or Cycle progress.

---

## Recurring Task Rules

15. Recurring Tasks generate independent Task instances.
16. Each generated Task contributes individually to progress calculations.

---

## Progress Rules

17. Goal progress is calculated as:
    completed_tasks / total_tasks
18. Cycle progress is calculated as the average progress of its Goals.
19. Progress values range from 0 to 100.

---

## Success Rules

20. A Cycle is considered successful if X% of its Goals are successful.
21. Success indicators are informational and do not alter system behavior.
