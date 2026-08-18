# Campus Pulse Technical Project Report

> **Hackverse 2026 Submission Document**

---

## 1. Executive Summary

Campus Pulse is an indoor navigation and smart accessibility platform designed for university campuses. It resolves GPS degradation in multi-story buildings by leveraging physical QR anchor tags, graph-based Dijkstra shortest path algorithms, wheelchair accessibility routing, and live dynamic detour handling.

---

## 2. Technical System Architecture

```
                       +-----------------------------+
                       |    React 18 + Vite Web App  |
                       |    (Tailwind CSS + Leaflet) |
                       +--------------+--------------+
                                      |
                                  REST API
                                      |
                       +--------------v--------------+
                       |   Node.js / Express Server  |
                       +--------------+--------------+
                                      |
                +---------------------+---------------------+
                |                                           |
    +-----------v-----------+                   +-----------v-----------+
    | Dijkstra Graph Engine |                   |  MongoDB Atlas Cloud  |
    |  (Path Calculation)   |                   |  (Mongoose Schemas)   |
    +-----------------------+                   +-----------------------+
```

---

## 3. Core Algorithms & Features

### Dijkstra Shortest Path Engine
- **Normal Walking Mode**: Standard distance & time optimization over 17 campus network paths.
- **Wheelchair Accessible Mode**: Stair penalty avoidance; reroutes via ramps and elevators.
- **Dynamic Closure Bypassing**: Excludes edges marked as `closed` by campus administrators and calculates alternative bypass routes.

---

## 4. Database & REST API Specs

- **Database**: MongoDB Atlas (`cluster0.p3wjozu.mongodb.net/campus_pulse`)
- **Authentication**: JWT Bearer Tokens with Bcrypt password hashing
- **Endpoints**:
  - `POST /api/auth/login`
  - `POST /api/auth/register`
  - `GET /api/locations`
  - `POST /api/navigate`
  - `POST /api/assistant/query`
  - `PATCH /api/admin/paths/:edgeId/toggle`
