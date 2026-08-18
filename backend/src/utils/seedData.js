export const INITIAL_LOCATIONS = [
  {
    id: "loc_main_gate",
    name: "Main Gate & Welcome Plaza",
    category: "Entrance / Security",
    building: "Main Gate",
    floor: "Ground Floor",
    description: "Primary entry point to the campus. Anchors all external visitor and student arrivals.",
    coordinates: { x: 120, y: 520, lat: 12.9716, lng: 77.5946 },
    entrance: "Main Archway",
    facilities: ["Visitor Helpdesk", "Security Post", "Campus Map Kiosk", "Taxi Pick-up"],
    openingHours: "24/7 Open",
    accessibility: ["Ramp Access", "Wide Gates", "Tactile Paving", "Wheelchair Friendly"],
    contact: "Security Desk: +1 (555) 019-2831",
    status: "Open",
    qrCodeId: "QR_MAIN_GATE_01",
    buildingCode: "MG-01",
    icon: "ShieldCheck"
  },
  {
    id: "loc_admin_block",
    name: "Administration Block",
    category: "Administrative Services",
    building: "Admin Building",
    floor: "Ground + 2 Floors",
    description: "Central administrative building for fee payment, transcripts, student affairs, and university executive offices.",
    coordinates: { x: 260, y: 410, lat: 12.9722, lng: 77.5952 },
    entrance: "South Escalator & Ramp",
    facilities: ["Registrar Office", "Dean's Suite", "Finance & Fee Counter", "Admissions Help Desk"],
    openingHours: "9:00 AM – 5:00 PM",
    accessibility: ["Elevator", "Ramp Entrance", "Accessible Restroom"],
    contact: "Admin Office: Ext 101 / admin@campus.edu",
    qrCodeId: "QR_ADMIN_BLOCK_02",
    buildingCode: "AD-10",
    icon: "Building2"
  },
  {
    id: "loc_cse_block",
    name: "CSE & Data Science Block",
    category: "Academic / Department",
    building: "Tech Block A",
    floor: "Ground + 3 Floors",
    description: "State-of-the-art computer science laboratories, high-performance computing centers, and lecture halls.",
    coordinates: { x: 440, y: 260, lat: 12.9730, lng: 77.5960 },
    entrance: "Glass Atrium Doors",
    facilities: ["AI & Data Labs", "Computer Centre", "Seminar Room 302", "Robotics Lab", "Wi-Fi Hub"],
    openingHours: "8:00 AM – 9:00 PM",
    accessibility: ["Elevator", "Stairs", "Ramp Access at Rear Entrance"],
    contact: "CSE Dept Head: Ext 304",
    qrCodeId: "QR_CSE_BLOCK_03",
    buildingCode: "CS-03",
    icon: "Cpu"
  },
  {
    id: "loc_library",
    name: "Central Library & Digital Hub",
    category: "Study / Library",
    building: "Knowledge Center",
    floor: "Ground + 1st Floor",
    description: "The primary study and research hub on campus featuring silent reading zones, digital archives, and collaborative workspaces.",
    coordinates: { x: 620, y: 340, lat: 12.9735, lng: 77.5970 },
    entrance: "East Covered Portico",
    facilities: ["Quiet Reading Hall", "High-Speed Wi-Fi", "Computer Study Station", "Group Discussion Rooms", "Book Return Kiosk"],
    openingHours: "8:00 AM – 10:00 PM",
    accessibility: ["Ramp", "Elevator", "Accessible Restrooms", "Braille Section"],
    contact: "Library Circulation Desk: Ext 402",
    qrCodeId: "QR_LIBRARY_04",
    buildingCode: "LB-04",
    icon: "BookOpen"
  },
  {
    id: "loc_canteen",
    name: "Campus Canteen & Food Court",
    category: "Dining / Refreshment",
    building: "Student Activity Center",
    floor: "Ground Floor",
    description: "Multi-cuisine food court serving breakfast, lunch, coffee, snacks, and evening meals for students and faculty.",
    coordinates: { x: 600, y: 550, lat: 12.9725, lng: 77.5968 },
    entrance: "Paved Promenade Entrance",
    facilities: ["Hot Meals & Snacks", "Juice & Coffee Bar", "Seating Capacity 300", "Digital Order Kiosks", "Handwash Area"],
    openingHours: "7:30 AM – 9:30 PM",
    accessibility: ["Ground Level", "Wide Aisles", "Accessible Seating"],
    contact: "Canteen Manager: Ext 505",
    qrCodeId: "QR_CANTEEN_05",
    buildingCode: "FC-05",
    icon: "Utensils"
  },
  {
    id: "loc_hostel",
    name: "Student Residential Hostel",
    category: "Residential",
    building: "Hostel Block A",
    floor: "Ground + 4 Floors",
    description: "On-campus student residence block equipped with round-the-clock security and recreational common spaces.",
    coordinates: { x: 800, y: 580, lat: 12.9720, lng: 77.5985 },
    entrance: "Resident Security Turnstile",
    facilities: ["Student Rooms", "Common Room & TV", "Laundry Facility", "Night Mess", "Vending Machines"],
    openingHours: "24/7 Resident Access",
    accessibility: ["Elevator", "Ramp Entrance", "Ground Floor Accessible Rooms"],
    contact: "Warden Office: Ext 601",
    qrCodeId: "QR_HOSTEL_06",
    buildingCode: "HS-06",
    icon: "Home"
  },
  {
    id: "loc_auditorium",
    name: "Grand Campus Auditorium",
    category: "Events & Cultural",
    building: "Convention Complex",
    floor: "Ground + Gallery",
    description: "Venue for university convocations, guest lectures, cultural festivals, tech symposia, and performances.",
    coordinates: { x: 420, y: 580, lat: 12.9712, lng: 77.5958 },
    entrance: "Main Foyer Gates",
    facilities: ["1000 Seat Theater", "A/V Control Room", "Green Rooms", "Stage & Lighting", "Exhibition Foyer"],
    openingHours: "Event Scheduled",
    accessibility: ["Wheelchair Ramps", "Front Row Accessible Seating", "Accessible Restrooms"],
    contact: "Events Coordinator: Ext 702",
    qrCodeId: "QR_AUDITORIUM_07",
    buildingCode: "AU-07",
    icon: "Sparkles"
  },
  {
    id: "loc_medical_center",
    name: "Campus Health & Medical Center",
    category: "Healthcare / Emergency",
    building: "Health Block",
    floor: "Ground Floor",
    description: "Immediate emergency healthcare center providing doctor consultations, first aid, medicines, and ambulance services.",
    coordinates: { x: 280, y: 220, lat: 12.9738, lng: 77.5950 },
    entrance: "Emergency Ambulance Ramp",
    facilities: ["Resident Doctor", "First Aid Unit", "Ambulance Bay", "Basic Pharmacy", "Observation Beds"],
    openingHours: "24/7 Emergency Care",
    accessibility: ["Step-free Entrance", "Automatic Doors", "Accessible Restroom", "Emergency Ramp"],
    contact: "Medical Emergency Hotline: +1 (555) 911-0022",
    qrCodeId: "QR_MEDICAL_08",
    buildingCode: "HC-08",
    icon: "HeartPulse"
  },
  {
    id: "loc_sports_ground",
    name: "Sports Complex & Athletic Field",
    category: "Sports & Fitness",
    building: "Outdoor Arena",
    floor: "Outdoor Field",
    description: "Outdoor sports complex featuring athletic tracks, ball courts, fitness equipment, and match tournament hosting.",
    coordinates: { x: 760, y: 220, lat: 12.9745, lng: 77.5980 },
    entrance: "East Sports Gate",
    facilities: ["Football & Cricket Field", "Basketball Courts", "Running Track", "Equipment Room", "Changing Rooms"],
    openingHours: "6:00 AM – 8:00 PM",
    accessibility: ["Paved Perimeter Path", "Accessible Spectator Stand"],
    contact: "Sports Director: Ext 808",
    qrCodeId: "QR_SPORTS_09",
    buildingCode: "SP-09",
    icon: "Trophy"
  },
  {
    id: "loc_parking",
    name: "Central Visitor & Staff Parking",
    category: "Parking / Transport",
    building: "Parking Zone 1",
    floor: "Ground Level",
    description: "Organized multi-tier parking lot with EV charging ports and reserved accessible spots close to main walkways.",
    coordinates: { x: 120, y: 320, lat: 12.9728, lng: 77.5940 },
    entrance: "West Boom Barrier",
    facilities: ["Car & Two-Wheeler Bay", "EV Charging Station", "Bicycle Dock", "Security Guard"],
    openingHours: "24/7 Open",
    accessibility: ["Designated Accessible Parking Bays", "Paved Paths"],
    contact: "Parking Admin: Ext 105",
    qrCodeId: "QR_PARKING_10",
    buildingCode: "PK-10",
    icon: "Car"
  }
];

export const INITIAL_QRS = INITIAL_LOCATIONS.map(l => ({
  qrCodeId: l.qrCodeId,
  locationId: l.id,
  name: `${l.name} Anchor QR`,
  description: `Official placement tag at ${l.entrance} of ${l.name}`,
  active: true
}));

export const INITIAL_PATHS = [
  { id: "edge_gate_to_west_junc", name: "Main Entrance Avenue", startLocationId: "loc_main_gate", endLocationId: "junc_west_walkway", distance: 90, walkingTime: 1, hasStairs: false, accessible: true, hasElevator: false, status: "open", closureReason: "" },
  { id: "edge_parking_to_west_junc", name: "Parking Pedestrian Lane", startLocationId: "loc_parking", endLocationId: "junc_west_walkway", distance: 110, walkingTime: 2, hasStairs: false, accessible: true, hasElevator: false, status: "open", closureReason: "" },
  { id: "edge_west_junc_to_admin", name: "Admin Walkway", startLocationId: "junc_west_walkway", endLocationId: "loc_admin_block", distance: 80, walkingTime: 1, hasStairs: false, accessible: true, hasElevator: false, status: "open", closureReason: "" },
  { id: "edge_parking_to_medical", name: "North Medical Access Drive", startLocationId: "loc_parking", endLocationId: "loc_medical_center", distance: 140, walkingTime: 2, hasStairs: false, accessible: true, hasElevator: false, status: "open", closureReason: "" },
  { id: "edge_medical_to_north_junc", name: "Medical Academic Pathway", startLocationId: "loc_medical_center", endLocationId: "junc_north_corridor", distance: 90, walkingTime: 1, hasStairs: false, accessible: true, hasElevator: false, status: "open", closureReason: "" },
  { id: "edge_north_junc_to_cse", name: "CSE Entrance Corridor", startLocationId: "junc_north_corridor", endLocationId: "loc_cse_block", distance: 80, walkingTime: 1, hasStairs: false, accessible: true, hasElevator: false, status: "open", closureReason: "" },
  { id: "edge_admin_to_central_quad", name: "Admin Lawn Crossing (Stairs)", startLocationId: "loc_admin_block", endLocationId: "junc_central_quad", distance: 150, walkingTime: 2, hasStairs: true, accessible: false, hasElevator: false, status: "open", closureReason: "" },
  { id: "edge_admin_to_canteen", name: "Paved Central Spine (Ramp)", startLocationId: "loc_admin_block", endLocationId: "loc_canteen", distance: 180, walkingTime: 3, hasStairs: false, accessible: true, hasElevator: false, status: "open", closureReason: "" },
  { id: "edge_cse_to_central_quad", name: "CSE South Stair Corridor", startLocationId: "loc_cse_block", endLocationId: "junc_central_quad", distance: 100, walkingTime: 2, hasStairs: true, accessible: false, hasElevator: false, status: "open", closureReason: "" },
  { id: "edge_cse_to_library", name: "North Science Walkway", startLocationId: "loc_cse_block", endLocationId: "loc_library", distance: 170, walkingTime: 3, hasStairs: false, accessible: true, hasElevator: false, status: "open", closureReason: "" },
  { id: "edge_central_quad_to_library", name: "Library Plaza Path", startLocationId: "junc_central_quad", endLocationId: "loc_library", distance: 140, walkingTime: 2, hasStairs: false, accessible: true, hasElevator: false, status: "open", closureReason: "" },
  { id: "edge_admin_to_auditorium", name: "South Campus Boulevard", startLocationId: "loc_admin_block", endLocationId: "loc_auditorium", distance: 180, walkingTime: 3, hasStairs: false, accessible: true, hasElevator: false, status: "open", closureReason: "" },
  { id: "edge_gate_to_auditorium", name: "Gate South Express Path", startLocationId: "loc_main_gate", endLocationId: "loc_auditorium", distance: 260, walkingTime: 4, hasStairs: false, accessible: true, hasElevator: false, status: "open", closureReason: "" },
  { id: "edge_auditorium_to_canteen", name: "Auditorium East Promenade", startLocationId: "loc_auditorium", endLocationId: "loc_canteen", distance: 180, walkingTime: 3, hasStairs: false, accessible: true, hasElevator: false, status: "open", closureReason: "" },
  { id: "edge_east_corridor_library_canteen", name: "East Covered Corridor", startLocationId: "loc_library", endLocationId: "loc_canteen", distance: 110, walkingTime: 2, hasStairs: false, accessible: true, hasElevator: false, status: "closed", closureReason: "East Corridor closed for tile maintenance & renovation work" },
  { id: "edge_library_to_sports", name: "Library-Sports Connector", startLocationId: "loc_library", endLocationId: "loc_sports_ground", distance: 190, walkingTime: 3, hasStairs: false, accessible: true, hasElevator: false, status: "open", closureReason: "" },
  { id: "edge_canteen_to_hostel", name: "Hostel Dining Walkway", startLocationId: "loc_canteen", endLocationId: "loc_hostel", distance: 160, walkingTime: 3, hasStairs: false, accessible: true, hasElevator: false, status: "open", closureReason: "" }
];

export const INITIAL_INTENTS = [
  { category: "study", keywords: ["study", "quiet", "books", "read", "reading", "silent", "research", "exam", "revision"], recommendedLocationId: "loc_library", reason: "Central Library features quiet reading halls, private study booths, and digital research terminals." },
  { category: "medical", keywords: ["medical", "doctor", "sick", "unwell", "first aid", "health", "injury", "medicine", "emergency", "hospital", "clinic", "fever"], recommendedLocationId: "loc_medical_center", reason: "Campus Health & Medical Center has 24/7 resident doctors, emergency first aid, and ambulance support." },
  { category: "food", keywords: ["food", "eat", "hungry", "canteen", "lunch", "breakfast", "dinner", "snack", "coffee", "tea", "drink", "dining"], recommendedLocationId: "loc_canteen", reason: "Campus Canteen & Food Court serves fresh hot meals, beverages, coffee, and quick snacks." },
  { category: "sports", keywords: ["sports", "play", "game", "football", "cricket", "basketball", "gym", "workout", "exercise", "run", "track", "field"], recommendedLocationId: "loc_sports_ground", reason: "Sports Complex & Athletic Field includes open grounds, basketball courts, and running tracks." },
  { category: "admin", keywords: ["fee", "fees", "admission", "register", "transcript", "dean", "principal", "registrar", "form", "certificate", "office"], recommendedLocationId: "loc_admin_block", reason: "Administration Block handles official paperwork, fee payments, admissions, and academic verification." },
  { category: "labs", keywords: ["computer", "code", "coding", "programming", "python", "ai", "lab", "data science", "hardware", "software"], recommendedLocationId: "loc_cse_block", reason: "CSE & Data Science Block provides access to high-performance AI labs and computer centers." },
  { category: "parking", keywords: ["park", "parking", "car", "bike", "scooter", "vehicle", "ev", "charging"], recommendedLocationId: "loc_parking", reason: "Central Parking Area offers designated vehicle parking spaces with security supervision and EV charging." },
  { category: "events", keywords: ["event", "seminar", "talk", "conference", "auditorium", "culture", "performance", "show", "stage"], recommendedLocationId: "loc_auditorium", reason: "Grand Campus Auditorium hosts all campus events, guest speaker keynotes, and cultural shows." }
];

export const INITIAL_FACILITIES = INITIAL_LOCATIONS.map(l => ({
  id: `fac_${l.id}`,
  name: l.name,
  category: l.category,
  locationId: l.id,
  description: l.description,
  facilities: l.facilities,
  openingHours: l.openingHours,
  accessibility: l.accessibility,
  status: l.status,
  contact: l.contact
}));

export const INITIAL_CONDITIONS = [
  {
    id: "cond_east_corridor_closure",
    type: "Closure",
    title: "East Covered Corridor Maintenance",
    description: "East Corridor closed for tile maintenance & renovation work",
    affectedLocationId: "loc_library",
    affectedPathId: "edge_east_corridor_library_canteen",
    status: "Active",
    createdBy: "Admin",
    startTime: new Date()
  }
];

// In-Memory Datastore Fallback Container
class InMemoryStore {
  constructor() {
    this.locations = [...INITIAL_LOCATIONS];
    this.qrs = [...INITIAL_QRS];
    this.paths = [...INITIAL_PATHS];
    this.intents = [...INITIAL_INTENTS];
    this.facilities = [...INITIAL_FACILITIES];
    this.conditions = [...INITIAL_CONDITIONS];
    this.users = [{
      _id: 'user_admin_01',
      name: 'System Admin',
      email: 'admin@campus.edu',
      passwordHash: '$2a$10$WqB3b0vS2.1/zMhXk3E5x.6v.lK0q0z2fE4iY4kZ.7v1.8m.9u.0u', // admin123
      role: 'admin',
      createdAt: new Date()
    }];
  }

  reset() {
    this.locations = [...INITIAL_LOCATIONS];
    this.qrs = [...INITIAL_QRS];
    this.paths = [...INITIAL_PATHS];
    this.intents = [...INITIAL_INTENTS];
    this.facilities = [...INITIAL_FACILITIES];
    this.conditions = [...INITIAL_CONDITIONS];
  }
}

export const inMemoryDB = new InMemoryStore();

export async function seedInitialData() {
  try {
    const { Location } = await import('../models/Location.js');
    const { QRLocation } = await import('../models/QRLocation.js');
    const { PathModel } = await import('../models/Path.js');
    const { Facility } = await import('../models/Facility.js');
    const { CampusCondition } = await import('../models/CampusCondition.js');
    const { AssistantIntent } = await import('../models/AssistantIntent.js');
    const { User } = await import('../models/User.js');
    const bcrypt = (await import('bcryptjs')).default;

    const locCount = await Location.countDocuments();
    if (locCount === 0) {
      await Location.insertMany(INITIAL_LOCATIONS);
      await QRLocation.insertMany(INITIAL_QRS);
      await PathModel.insertMany(INITIAL_PATHS);
      await Facility.insertMany(INITIAL_FACILITIES);
      await CampusCondition.insertMany(INITIAL_CONDITIONS);
      await AssistantIntent.insertMany(INITIAL_INTENTS);

      const adminHash = await bcrypt.hash('admin123', 10);
      const studentHash = await bcrypt.hash('student123', 10);

      await User.create([
        { name: 'System Admin', email: 'admin@campus.edu', passwordHash: adminHash, role: 'admin' },
        { name: 'Alex Johnson', email: 'alex@campus.edu', passwordHash: studentHash, role: 'student' }
      ]);

      console.log('✅ [MongoDB Seed] Seeded 10 locations, 17 network paths, QR anchors, facilities, and demo users into MongoDB!');
    }
  } catch (err) {
    console.error('MongoDB seedInitialData warning:', err.message);
  }
}
