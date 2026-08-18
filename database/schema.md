# Campus Pulse Database Schemas & Models

## MongoDB Mongoose Collections

### 1. `User` Collection (`users`)
- `_id`: ObjectId / String
- `name`: String (Required)
- `email`: String (Required, Unique)
- `passwordHash`: String (Required)
- `role`: Enum `['admin', 'user', 'student', 'faculty']`
- `createdAt`: Date

### 2. `Location` Collection (`locations`)
- `id`: String (Unique)
- `name`: String (Required)
- `category`: String
- `description`: String
- `building`: String
- `floor`: String
- `coordinates`: `{ x: Number, y: Number, lat: Number, lng: Number }`
- `entrance`: String
- `facilities`: Array of Strings
- `openingHours`: String
- `accessibility`: Array of Strings
- `status`: Enum `['Open', 'Closed', 'Maintenance']`
- `qrCodeId`: String

### 3. `PathModel` Collection (`paths`)
- `id`: String (Unique)
- `name`: String
- `startLocationId`: String (Location ID)
- `endLocationId`: String (Location ID)
- `distance`: Number (Meters)
- `walkingTime`: Number (Minutes)
- `hasStairs`: Boolean
- `accessible`: Boolean
- `hasElevator`: Boolean
- `status`: Enum `['open', 'closed']`
- `closureReason`: String

### 4. `QRLocation` Collection (`qrlocations`)
- `qrCodeId`: String (Unique)
- `locationId`: String
- `name`: String
- `description`: String
- `active`: Boolean

### 5. `Facility` Collection (`facilities`)
- `id`: String (Unique)
- `name`: String
- `category`: String
- `locationId`: String
- `openingHours`: String
- `contact`: String

### 6. `CampusCondition` Collection (`campusconditions`)
- `id`: String (Unique)
- `type`: String (`Closure`, `Maintenance`, `Hazard`)
- `title`: String
- `affectedLocationId`: String
- `affectedPathId`: String
- `status`: String (`Active`, `Resolved`)

### 7. `AssistantIntent` Collection (`assistantintents`)
- `category`: String
- `keywords`: Array of Strings
- `recommendedLocationId`: String
- `reason`: String
