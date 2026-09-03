// seedData.ts - 25-Trade Marketplace Seed Data (Pipul MVP)

export interface WorkerProfile {
  id: string;
  name: string;
  email: string;
  trade: string;
  skills: string[];
  hourlyRate: number; // in INR
  experienceYears: number;
  location: string;
  verificationStatus: 'Verified' | 'Pending';
  rating: number;
  completedJobs: number;
  bio: string;
  availability: 'Immediate' | 'Part-time' | 'Full-time';
}

export interface JobOffer {
  id: string;
  recruiterId: string;
  recruiterName: string;
  recruiterCompany: string;
  title: string;
  trade: string;
  location: string;
  offeredRate: number; // in INR
  rateType: 'Fixed' | 'Hourly' | 'Per Job';
  requiredSkills: string[];
  description: string;
  status: 'Open' | 'In Negotiation' | 'Filled';
  matchScore: number; // Default dynamic threshold for initial rendering
}

// ---------------------------------------------------------------------------
// 1. MOCK RECRUITER & WORKER ACCOUNTS
// ---------------------------------------------------------------------------

export const mockAccounts = [
  {
    id: 'recruiter_harvey',
    name: 'Harvey Specter',
    email: 'harvey@pipul.com',
    role: 'Recruiter',
    location: 'Delhi / NCR',
    company: 'Pearson Specter Contracting',
    focus: 'High-end commercial contracting & emergency trades'
  },
  {
    id: 'recruiter_louis',
    name: 'Louis Litt',
    email: 'louislitt@pipul.com',
    role: 'Recruiter',
    location: 'Noida',
    company: 'Pearson Specter Litt Corporate Services',
    focus: 'Facility management, corporate maintenance, security'
  },
  {
    id: 'worker_mike',
    name: 'Mike Ross',
    email: 'mikeross@pipull.com',
    role: 'Job Seeker',
    location: 'Delhi / NCR',
    trade: 'Senior Electrician & Smart Lock Installer',
    verificationStatus: 'Verified'
  }
];

// ---------------------------------------------------------------------------
// 2. JOB SEEKER SEED DATABASE (25 ACTIVE WORKER PROFILES - 1 PER TRADE)
// ---------------------------------------------------------------------------

export const preSeededWorkers: WorkerProfile[] = [
  {
    id: 'wrk_01',
    name: 'Mike Ross',
    email: 'mikeross@pipull.com',
    trade: 'Electrician',
    skills: ['Commercial Wiring', '3-Phase Circuits', 'MCB Tripping', 'Smart Lock Installation'],
    hourlyRate: 350,
    experienceYears: 6,
    location: 'Delhi / NCR',
    verificationStatus: 'Verified',
    rating: 4.9,
    completedJobs: 142,
    bio: 'Photographic memory for electrical schematics. Fast diagnostic and high-end wiring solutions.',
    availability: 'Immediate'
  },
  {
    id: 'wrk_02',
    name: 'Rajesh Kumar',
    email: 'rajesh.plumb@pipul.com',
    trade: 'Plumber',
    skills: ['PEX Piping', 'Drain Jetting', 'Leak Detection', 'Sanitary Fitting'],
    hourlyRate: 300,
    experienceYears: 8,
    location: 'Noida',
    verificationStatus: 'Verified',
    rating: 4.8,
    completedJobs: 210,
    bio: 'Specialist in high-pressure commercial plumbing and residential emergency leaks.',
    availability: 'Immediate'
  },
  {
    id: 'wrk_03',
    name: 'Sunita Devi',
    email: 'sunita.clean@pipul.com',
    trade: 'Bathroom Cleaner',
    skills: ['Acid Wash Treatment', 'Tile Descaling', 'Grout Sanitization', 'Hard Water Stain Removal'],
    hourlyRate: 200,
    experienceYears: 4,
    location: 'Delhi / NCR',
    verificationStatus: 'Verified',
    rating: 4.7,
    completedJobs: 98,
    bio: 'Deep chemical cleaning expert for luxury and commercial bath suites.',
    availability: 'Full-time'
  },
  {
    id: 'wrk_04',
    name: 'Priya Sharma',
    email: 'priya.maid@pipul.com',
    trade: 'Deep House Maid',
    skills: ['Deep Dusting', 'Upholstery Care', 'Floor Polishing', 'Move-in Sanitization'],
    hourlyRate: 220,
    experienceYears: 5,
    location: 'Gurugram',
    verificationStatus: 'Verified',
    rating: 4.9,
    completedJobs: 175,
    bio: 'Thorough residential sanitization and villa turn-over cleaning service.',
    availability: 'Immediate'
  },
  {
    id: 'wrk_05',
    name: 'Chef Anand Verma',
    email: 'anand.chef@pipul.com',
    trade: 'Cook / Home Chef',
    skills: ['North Indian', 'Continental', 'Diet Plan Prep', 'Party Catering'],
    hourlyRate: 450,
    experienceYears: 10,
    location: 'Delhi / NCR',
    verificationStatus: 'Verified',
    rating: 4.9,
    completedJobs: 310,
    bio: 'Ex-hotel line cook specializing in healthy home-cooked meals and private dining events.',
    availability: 'Part-time'
  },
  {
    id: 'wrk_06',
    name: 'Vikram Singh',
    email: 'vikram.ac@pipul.com',
    trade: 'AC Repair Technician',
    skills: ['Gas Refilling', 'Compressor Overhaul', 'Inverter AC PCB Fix', 'Jet Washing'],
    hourlyRate: 350,
    experienceYears: 7,
    location: 'Noida',
    verificationStatus: 'Verified',
    rating: 4.8,
    completedJobs: 185,
    bio: 'HVAC expert certified for split, cassette, and central cooling units.',
    availability: 'Immediate'
  },
  {
    id: 'wrk_07',
    name: 'Suresh Mistri',
    email: 'suresh.wood@pipul.com',
    trade: 'Carpenter',
    skills: ['Modular Kitchens', 'Lock Repairs', 'Custom Cabinets', 'Plywood Partitioning'],
    hourlyRate: 300,
    experienceYears: 12,
    location: 'Delhi / NCR',
    verificationStatus: 'Verified',
    rating: 4.7,
    completedJobs: 260,
    bio: 'Precision woodworker skilled in custom corporate fixtures and domestic repair.',
    availability: 'Full-time'
  },
  {
    id: 'wrk_08',
    name: 'Amit Painter',
    email: 'amit.paint@pipul.com',
    trade: 'Painter',
    skills: ['Texture Painting', 'Waterproofing Coating', 'Airless Spray Painting', 'Putty Finish'],
    hourlyRate: 250,
    experienceYears: 6,
    location: 'Faridabad',
    verificationStatus: 'Verified',
    rating: 4.6,
    completedJobs: 115,
    bio: 'Expert in Asian Paints Royale finishes, damp-proof coatings, and quick commercial touch-ups.',
    availability: 'Immediate'
  },
  {
    id: 'wrk_09',
    name: 'Dharmendra Yadav',
    email: 'dharmendra.mason@pipul.com',
    trade: 'Mason',
    skills: ['Brickwork', 'Concrete Slab Casting', 'Plastering', 'Structural Repairs'],
    hourlyRate: 280,
    experienceYears: 15,
    location: 'Ghaziabad',
    verificationStatus: 'Verified',
    rating: 4.8,
    completedJobs: 190,
    bio: 'Veteran masonry builder for boundary walls, concrete structural restoration, and paving.',
    availability: 'Full-time'
  },
  {
    id: 'wrk_10',
    name: 'Jaspal Singh',
    email: 'jaspal.weld@pipul.com',
    trade: 'Welder',
    skills: ['TIG/MIG Welding', 'SS Metal Railings', 'Structural Fabrication', 'Iron Gate Repairs'],
    hourlyRate: 350,
    experienceYears: 9,
    location: 'Noida',
    verificationStatus: 'Verified',
    rating: 4.9,
    completedJobs: 140,
    bio: 'Certified ARC and TIG welder for heavy-duty security gates, grilles, and beams.',
    availability: 'Immediate'
  },
  {
    id: 'wrk_11',
    name: 'Ramesh Chawla',
    email: 'ramesh.pest@pipul.com',
    trade: 'Pest Control Specialist',
    skills: ['Termite Chemical Injection', 'Bed Bug Heat Treatment', 'Rodent Baiting', 'Herbal Gel Spray'],
    hourlyRate: 250,
    experienceYears: 5,
    location: 'Delhi / NCR',
    verificationStatus: 'Verified',
    rating: 4.7,
    completedJobs: 130,
    bio: 'Government-certified pesticide handler providing non-toxic residential pest management.',
    availability: 'Immediate'
  },
  {
    id: 'wrk_12',
    name: 'Deepak Pradhan',
    email: 'deepak.pool@pipul.com',
    trade: 'Pool Maintenance Cleaner',
    skills: ['Chlorine Balance', 'Filter Backwashing', 'Vacuuming', 'Algae Scrubbing'],
    hourlyRate: 300,
    experienceYears: 6,
    location: 'Gurugram',
    verificationStatus: 'Verified',
    rating: 4.8,
    completedJobs: 80,
    bio: 'Commercial pool operator managing water pH, filtration pumps, and chemical safety.',
    availability: 'Part-time'
  },
  {
    id: 'wrk_13',
    name: 'Imran Khan',
    email: 'imran.sofa@pipul.com',
    trade: 'Sofa Dry-Cleaner',
    skills: ['Foam Extraction Cleaning', 'Leather Conditioning', 'Stain Removal', 'Mattress Sanitizing'],
    hourlyRate: 220,
    experienceYears: 4,
    location: 'Delhi / NCR',
    verificationStatus: 'Verified',
    rating: 4.6,
    completedJobs: 165,
    bio: 'Equipped with industrial German vacuum extractors for office furniture and home sofas.',
    availability: 'Immediate'
  },
  {
    id: 'wrk_14',
    name: 'Manoj Mechanic',
    email: 'manoj.fridge@pipul.com',
    trade: 'Refrigerator Mechanic',
    skills: ['R134a/R600 Gas Charging', 'Inverter Compressor Replacement', 'Thermostat Wiring', 'Defrost Timer Fix'],
    hourlyRate: 350,
    experienceYears: 8,
    location: 'Noida',
    verificationStatus: 'Verified',
    rating: 4.8,
    completedJobs: 205,
    bio: 'Authorized service technician for Samsung, LG, and Whirlpool double-door units.',
    availability: 'Immediate'
  },
  {
    id: 'wrk_15',
    name: 'Santosh Pal',
    email: 'santosh.wash@pipul.com',
    trade: 'Washing Machine Technician',
    skills: ['Front Load Drum Replacement', 'Motor Re-winding', 'Drain Pump Fix', 'Error Code Clearance'],
    hourlyRate: 300,
    experienceYears: 6,
    location: 'Delhi / NCR',
    verificationStatus: 'Verified',
    rating: 4.7,
    completedJobs: 155,
    bio: 'Specialist in fully-automatic front load and top load washer motherboard issues.',
    availability: 'Immediate'
  },
  {
    id: 'wrk_16',
    name: 'Ravi Kumar',
    email: 'ravi.solar@pipul.com',
    trade: 'Solar Panel Cleaner',
    skills: ['De-ionized Water Wash', 'PV Output Check', 'Bird Mesh Installation', 'Rooftop Safety Rigging'],
    hourlyRate: 250,
    experienceYears: 3,
    location: 'Gurugram',
    verificationStatus: 'Verified',
    rating: 4.9,
    completedJobs: 92,
    bio: 'Solar upkeep specialist ensuring maximum kW output via scratch-free soft brush cleaning.',
    availability: 'Immediate'
  },
  {
    id: 'wrk_17',
    name: 'Gurmeet Singh',
    email: 'gurmeet.driver@pipul.com',
    trade: 'Driver / Chauffeur',
    skills: ['Automatic & Manual SUVs', 'Outstation Driving', 'VIP Escort', 'Route Optimization'],
    hourlyRate: 200,
    experienceYears: 11,
    location: 'Delhi / NCR',
    verificationStatus: 'Verified',
    rating: 4.9,
    completedJobs: 340,
    bio: 'Punctual executive chauffeur with pristine commercial driving license and defensive driving background.',
    availability: 'Full-time'
  },
  {
    id: 'wrk_18',
    name: 'Hari Ram',
    email: 'hari.garden@pipul.com',
    trade: 'Gardener / Landscaper',
    skills: ['Lawn Mowing', 'Topiary Pruning', 'Organic Fertilization', 'Drip Irrigation Setup'],
    hourlyRate: 180,
    experienceYears: 8,
    location: 'Noida',
    verificationStatus: 'Verified',
    rating: 4.8,
    completedJobs: 128,
    bio: 'Horticulture lover providing corporate green wall and residential garden upkeep.',
    availability: 'Part-time'
  },
  {
    id: 'wrk_19',
    name: 'Bahadur Thapa',
    email: 'bahadur.guard@pipul.com',
    trade: 'Security Guard',
    skills: ['Frisking & Metal Detectors', 'Visitor Log Management', 'CCTV Monitoring', 'Fire Extinguisher Operation'],
    hourlyRate: 120,
    experienceYears: 7,
    location: 'Noida',
    verificationStatus: 'Verified',
    rating: 4.9,
    completedJobs: 290,
    bio: 'Ex-exserviceman certified security officer for commercial lobby and warehouse security.',
    availability: 'Full-time'
  },
  {
    id: 'wrk_20',
    name: 'Shanti Devi',
    email: 'shanti.iron@pipul.com',
    trade: 'Ironing Specialist',
    skills: ['Heavy Industrial Steam Press', 'Garment Creasing', 'Delicate Fabric Care', 'Bulk Flat Fold'],
    hourlyRate: 150,
    experienceYears: 9,
    location: 'Delhi / NCR',
    verificationStatus: 'Verified',
    rating: 4.7,
    completedJobs: 410,
    bio: 'Steam iron operator specializing in suit jackets, silk sarees, and corporate linen.',
    availability: 'Immediate'
  },
  {
    id: 'wrk_21',
    name: 'Subhash Chandra',
    email: 'subhash.tank@pipul.com',
    trade: 'Water Tank Cleaner',
    skills: ['Sludge Pump Evacuation', 'UV Lamp Disinfection', 'High-Pressure Jetting', 'Underground Sump Scrubming'],
    hourlyRate: 250,
    experienceYears: 5,
    location: 'Ghaziabad',
    verificationStatus: 'Verified',
    rating: 4.8,
    completedJobs: 110,
    bio: '6-stage hygienic water tank cleaning process using anti-bacterial treatments.',
    availability: 'Immediate'
  },
  {
    id: 'wrk_22',
    name: 'Karan Malhotra',
    email: 'karan.lock@pipul.com',
    trade: 'Smart Lock Installer',
    skills: ['Biometric Mortise Fitting', 'Yale/August Calibration', 'Door Frame Modification', 'WiFi Gateway Sync'],
    hourlyRate: 400,
    experienceYears: 4,
    location: 'Delhi / NCR',
    verificationStatus: 'Verified',
    rating: 4.9,
    completedJobs: 88,
    bio: 'Digital lock installation expert for wooden, glass, and armored security doors.',
    availability: 'Immediate'
  },
  {
    id: 'wrk_23',
    name: 'Mohan Lal',
    email: 'mohan.tile@pipul.com',
    trade: 'Wall Tile Fixer',
    skills: ['Epoxy Grouting', 'Laser Level Alignment', 'Large Format Vitrified Cut', 'Bathroom Renovation'],
    hourlyRate: 300,
    experienceYears: 10,
    location: 'Faridabad',
    verificationStatus: 'Verified',
    rating: 4.7,
    completedJobs: 175,
    bio: 'Precision tiler working with Italian marble tiles, ceramic backsplashes, and anti-skid flooring.',
    availability: 'Full-time'
  },
  {
    id: 'wrk_24',
    name: 'Pankaj Kumar',
    email: 'pankaj.chimney@pipul.com',
    trade: 'Chimney Cleaner',
    skills: ['Baffle Filter Degreasing', 'Duct Inspection', 'Motor Oil Extraction', 'Fume Hood Servicing'],
    hourlyRate: 250,
    experienceYears: 5,
    location: 'Gurugram',
    verificationStatus: 'Verified',
    rating: 4.8,
    completedJobs: 145,
    bio: 'Kitchen exhaust technician handling Faber, Glen, and Faber auto-clean chimneys.',
    availability: 'Immediate'
  },
  {
    id: 'wrk_25',
    name: 'Vikas Sharma',
    email: 'vikas.geyser@pipul.com',
    trade: 'Geyser Installation Expert',
    skills: ['Instant & Storage Geysers', 'Pressure Valve Calibration', 'Heating Element Swap', 'Safety Wire Earthing'],
    hourlyRate: 300,
    experienceYears: 6,
    location: 'Noida',
    verificationStatus: 'Verified',
    rating: 4.9,
    completedJobs: 195,
    bio: 'Electric and solar geyser specialist ensuring safe electrical grounding and leak-proof pipes.',
    availability: 'Immediate'
  }
];

// ---------------------------------------------------------------------------
// 3. RECRUITER SEED DATABASE (25 ACTIVE JOB OFFERS - 1 PER TRADE)
// ---------------------------------------------------------------------------

export const preSeededJobOffers: JobOffer[] = [
  {
    id: 'job_01',
    recruiterId: 'recruiter_harvey',
    recruiterName: 'Harvey Specter',
    recruiterCompany: 'Pearson Specter Contracting',
    title: 'Urgent: Commercial DB Board Wiring & Circuit Balancing',
    trade: 'Electrician',
    location: 'Delhi / NCR',
    offeredRate: 700,
    rateType: 'Hourly',
    requiredSkills: ['Commercial Wiring', '3-Phase Circuits', 'MCB Tripping'],
    description: 'Require a master electrician to re-balance load across three distribution boards in a corporate floor setup.',
    status: 'Open',
    matchScore: 98
  },
  {
    id: 'job_02',
    recruiterId: 'recruiter_harvey',
    recruiterName: 'Harvey Specter',
    recruiterCompany: 'Pearson Specter Contracting',
    title: 'Emergency Main Line Pipe Burst Repair',
    trade: 'Plumber',
    location: 'Noida',
    offeredRate: 3500,
    rateType: 'Fixed',
    requiredSkills: ['Leak Detection', 'PEX Piping', 'Sanitary Fitting'],
    description: 'Immediate fix required for damaged water supply riser pipe on 4th floor balcony.',
    status: 'Open',
    matchScore: 95
  },
  {
    id: 'job_03',
    recruiterId: 'recruiter_louis',
    recruiterName: 'Louis Litt',
    recruiterCompany: 'Pearson Specter Litt Corporate Services',
    title: 'Executive Office Bathroom Acid Deep Wash',
    trade: 'Bathroom Cleaner',
    location: 'Noida',
    offeredRate: 1200,
    rateType: 'Per Job',
    requiredSkills: ['Acid Wash Treatment', 'Tile Descaling', 'Grout Sanitization'],
    description: 'Detailed descaling and stain removal for 4 executive washrooms before audit.',
    status: 'Open',
    matchScore: 92
  },
  {
    id: 'job_04',
    recruiterId: 'recruiter_louis',
    recruiterName: 'Louis Litt',
    recruiterCompany: 'Pearson Specter Litt Corporate Services',
    title: 'Full Floor Office Deep Sanitization & Dusting',
    trade: 'Deep House Maid',
    location: 'Delhi / NCR',
    offeredRate: 2500,
    rateType: 'Per Job',
    requiredSkills: ['Deep Dusting', 'Upholstery Care', 'Floor Polishing'],
    description: 'Overnight deep cleaning of 5,000 sq ft legal workspace including cubicles and glass panes.',
    status: 'Open',
    matchScore: 94
  },
  {
    id: 'job_05',
    recruiterId: 'recruiter_harvey',
    recruiterName: 'Harvey Specter',
    recruiterCompany: 'Pearson Specter Contracting',
    title: 'Executive Luncheon - 15 Pax Fine Dining Chef',
    trade: 'Cook / Home Chef',
    location: 'Delhi / NCR',
    offeredRate: 4000,
    rateType: 'Fixed',
    requiredSkills: ['North Indian', 'Continental', 'Party Catering'],
    description: 'High-profile lunch preparation for visiting partners. Ingredients supplied.',
    status: 'Open',
    matchScore: 96
  },
  {
    id: 'job_06',
    recruiterId: 'recruiter_louis',
    recruiterName: 'Louis Litt',
    recruiterCompany: 'Pearson Specter Litt Corporate Services',
    title: 'Cassette AC Jet Wash & Gas Top-Up (10 Units)',
    trade: 'AC Repair Technician',
    location: 'Noida',
    offeredRate: 6500,
    rateType: 'Fixed',
    requiredSkills: ['Jet Washing', 'Gas Refilling', 'Inverter AC PCB Fix'],
    description: 'Pre-summer maintenance of ceiling cassette ACs across building A.',
    status: 'Open',
    matchScore: 91
  },
  {
    id: 'job_07',
    recruiterId: 'recruiter_harvey',
    recruiterName: 'Harvey Specter',
    recruiterCompany: 'Pearson Specter Contracting',
    title: 'Conference Room Teak Table Repair & Polishing',
    trade: 'Carpenter',
    location: 'Delhi / NCR',
    offeredRate: 3000,
    rateType: 'Fixed',
    requiredSkills: ['Custom Cabinets', 'Plywood Partitioning', 'Lock Repairs'],
    description: 'Fixing loose veneer hinges and buffing solid mahogany board table.',
    status: 'Open',
    matchScore: 90
  },
  {
    id: 'job_08',
    recruiterId: 'recruiter_louis',
    recruiterName: 'Louis Litt',
    recruiterCompany: 'Pearson Specter Litt Corporate Services',
    title: 'Reception Area Wall Odorless Touch-Up Painting',
    trade: 'Painter',
    location: 'Noida',
    offeredRate: 2000,
    rateType: 'Per Job',
    requiredSkills: ['Putty Finish', 'Airless Spray Painting', 'Texture Painting'],
    description: 'Quick night-shift paint job using VOC-free washable velvet acrylic paint.',
    status: 'Open',
    matchScore: 89
  },
  {
    id: 'job_09',
    recruiterId: 'recruiter_harvey',
    recruiterName: 'Harvey Specter',
    recruiterCompany: 'Pearson Specter Contracting',
    title: 'Boundary Wall Structural Crack Repair',
    trade: 'Mason',
    location: 'Delhi / NCR',
    offeredRate: 4000,
    rateType: 'Fixed',
    requiredSkills: ['Structural Repairs', 'Brickwork', 'Plastering'],
    description: 'Reinforcing compound wall with cement mortar injection and fresh plaster.',
    status: 'Open',
    matchScore: 88
  },
  {
    id: 'job_10',
    recruiterId: 'recruiter_harvey',
    recruiterName: 'Harvey Specter',
    recruiterCompany: 'Pearson Specter Contracting',
    title: 'Heavy Duty Metal Entry Gate Hinge Welding',
    trade: 'Welder',
    location: 'Delhi / NCR',
    offeredRate: 1500,
    rateType: 'Per Job',
    requiredSkills: ['TIG/MIG Welding', 'Iron Gate Repairs', 'Structural Fabrication'],
    description: 'On-site portable MIG welding machine required to align dropped steel driveway gate.',
    status: 'Open',
    matchScore: 93
  },
  {
    id: 'job_11',
    recruiterId: 'recruiter_louis',
    recruiterName: 'Louis Litt',
    recruiterCompany: 'Pearson Specter Litt Corporate Services',
    title: 'Basement Storage Termite Chemical Drilling Treatment',
    trade: 'Pest Control Specialist',
    location: 'Noida',
    offeredRate: 2800,
    rateType: 'Fixed',
    requiredSkills: ['Termite Chemical Injection', 'Rodent Baiting', 'Herbal Gel Spray'],
    description: 'Drill-and-fill chemical barrier treatment for subterranean wood borers.',
    status: 'Open',
    matchScore: 91
  },
  {
    id: 'job_12',
    recruiterId: 'recruiter_harvey',
    recruiterName: 'Harvey Specter',
    recruiterCompany: 'Pearson Specter Contracting',
    title: 'Penthouse Swimming Pool Vacuum & Chemical Balance',
    trade: 'Pool Maintenance Cleaner',
    location: 'Gurugram',
    offeredRate: 1800,
    rateType: 'Per Job',
    requiredSkills: ['Chlorine Balance', 'Filter Backwashing', 'Vacuuming'],
    description: 'Complete water test, shock treatment, and sand filter backwashing.',
    status: 'Open',
    matchScore: 94
  },
  {
    id: 'job_13',
    recruiterId: 'recruiter_louis',
    recruiterName: 'Louis Litt',
    recruiterCompany: 'Pearson Specter Litt Corporate Services',
    title: 'Corporate Auditorium 30-Chair Upholstery Cleaning',
    trade: 'Sofa Dry-Cleaner',
    location: 'Noida',
    offeredRate: 4500,
    rateType: 'Fixed',
    requiredSkills: ['Foam Extraction Cleaning', 'Stain Removal', 'Leather Conditioning'],
    description: 'Wet vacuum extraction cleaning for fabric upholstered seminar seating.',
    status: 'Open',
    matchScore: 92
  },
  {
    id: 'job_14',
    recruiterId: 'recruiter_harvey',
    recruiterName: 'Harvey Specter',
    recruiterCompany: 'Pearson Specter Contracting',
    title: 'Commercial Double-Door Display Refrigerator Gas Leak Fix',
    trade: 'Refrigerator Mechanic',
    location: 'Delhi / NCR',
    offeredRate: 2200,
    rateType: 'Per Job',
    requiredSkills: ['R134a/R600 Gas Charging', 'Inverter Compressor Replacement', 'Thermostat Wiring'],
    description: 'Locate copper line pinhole leak, braze joint, evac and charge R134a refrigerant.',
    status: 'Open',
    matchScore: 95
  },
  {
    id: 'job_15',
    recruiterId: 'recruiter_louis',
    recruiterName: 'Louis Litt',
    recruiterCompany: 'Pearson Specter Litt Corporate Services',
    title: 'Pantry Heavy-Duty Front Load Washer Noise Repair',
    trade: 'Washing Machine Technician',
    location: 'Noida',
    offeredRate: 1400,
    rateType: 'Per Job',
    requiredSkills: ['Front Load Drum Replacement', 'Motor Re-winding', 'Drain Pump Fix'],
    description: 'Diagnose thumping noise during spin cycle; replace worn drum bearing assembly.',
    status: 'Open',
    matchScore: 89
  },
  {
    id: 'job_16',
    recruiterId: 'recruiter_harvey',
    recruiterName: 'Harvey Specter',
    recruiterCompany: 'Pearson Specter Contracting',
    title: '50kW Rooftop Solar Array Cleaning & Inspection',
    trade: 'Solar Panel Cleaner',
    location: 'Gurugram',
    offeredRate: 3000,
    rateType: 'Fixed',
    requiredSkills: ['De-ionized Water Wash', 'PV Output Check', 'Rooftop Safety Rigging'],
    description: 'Clean dust buildup off 120 panels using telescopic soft water brushes.',
    status: 'Open',
    matchScore: 96
  },
  {
    id: 'job_17',
    recruiterId: 'recruiter_harvey',
    recruiterName: 'Harvey Specter',
    recruiterCompany: 'Pearson Specter Contracting',
    title: 'Weekly Chauffeur for Corporate Guest Escort',
    trade: 'Driver / Chauffeur',
    location: 'Delhi / NCR',
    offeredRate: 800,
    rateType: 'Hourly',
    requiredSkills: ['Automatic & Manual SUVs', 'Outstation Driving', 'VIP Escort'],
    description: 'Driving Mercedes E-Class for visiting client delegation across Delhi NCR meetings.',
    status: 'Open',
    matchScore: 97
  },
  {
    id: 'job_18',
    recruiterId: 'recruiter_louis',
    recruiterName: 'Louis Litt',
    recruiterCompany: 'Pearson Specter Litt Corporate Services',
    title: 'Courtyard Lawn Mowing & Hedge Trimming',
    trade: 'Gardener / Landscaper',
    location: 'Noida',
    offeredRate: 1500,
    rateType: 'Per Job',
    requiredSkills: ['Lawn Mowing', 'Topiary Pruning', 'Organic Fertilization'],
    description: 'Trim boxwood hedges, clear fallen foliage, and apply organic lawn tonic.',
    status: 'Open',
    matchScore: 91
  },
  {
    id: 'job_19',
    recruiterId: 'recruiter_louis',
    recruiterName: 'Louis Litt',
    recruiterCompany: 'Pearson Specter Litt Corporate Services',
    title: 'Night Shift Gate Security Officer (12hr Shift)',
    trade: 'Security Guard',
    location: 'Noida',
    offeredRate: 1000,
    rateType: 'Fixed',
    requiredSkills: ['Visitor Log Management', 'Frisking & Metal Detectors', 'CCTV Monitoring'],
    description: 'Manning front gate entrance, managing parking slips, and performing perimeter patrols.',
    status: 'Open',
    matchScore: 93
  },
  {
    id: 'job_20',
    recruiterId: 'recruiter_louis',
    recruiterName: 'Louis Litt',
    recruiterCompany: 'Pearson Specter Litt Corporate Services',
    title: 'Bulk Hotel Linen Steam Pressing (200 Sets)',
    trade: 'Ironing Specialist',
    location: 'Delhi / NCR',
    offeredRate: 2500,
    rateType: 'Fixed',
    requiredSkills: ['Heavy Industrial Steam Press', 'Bulk Flat Fold', 'Delicate Fabric Care'],
    description: 'On-site industrial steam pressing for banquet tablecloths and cloth napkins.',
    status: 'Open',
    matchScore: 90
  },
  {
    id: 'job_21',
    recruiterId: 'recruiter_harvey',
    recruiterName: 'Harvey Specter',
    recruiterCompany: 'Pearson Specter Contracting',
    title: '10,000L Underground Water Storage Sump Scrubbing',
    trade: 'Water Tank Cleaner',
    location: 'Ghaziabad',
    offeredRate: 3200,
    rateType: 'Fixed',
    requiredSkills: ['Underground Sump Scrubming', 'High-Pressure Jetting', 'UV Lamp Disinfection'],
    description: 'Drain sludge, pressure wash concrete interior walls, and perform UV sanitization.',
    status: 'Open',
    matchScore: 95
  },
  {
    id: 'job_22',
    recruiterId: 'recruiter_harvey',
    recruiterName: 'Harvey Specter',
    recruiterCompany: 'Pearson Specter Contracting',
    title: 'Installation of 3 Yale Fingerprint Smart Mortise Locks',
    trade: 'Smart Lock Installer',
    location: 'Delhi / NCR',
    offeredRate: 2400,
    rateType: 'Fixed',
    requiredSkills: ['Biometric Mortise Fitting', 'Door Frame Modification', 'WiFi Gateway Sync'],
    description: 'Chisel heavy wooden doors for mortise lock placement and sync mobile application.',
    status: 'Open',
    matchScore: 99
  },
  {
    id: 'job_23',
    recruiterId: 'recruiter_louis',
    recruiterName: 'Louis Litt',
    recruiterCompany: 'Pearson Specter Litt Corporate Services',
    title: 'Executive Washroom Damaged Tile Replacement',
    trade: 'Wall Tile Fixer',
    location: 'Noida',
    offeredRate: 1800,
    rateType: 'Per Job',
    requiredSkills: ['Epoxy Grouting', 'Large Format Vitrified Cut', 'Laser Level Alignment'],
    description: 'Remove cracked vitrified tiles without disturbing plumbing; apply epoxy grout.',
    status: 'Open',
    matchScore: 89
  },
  {
    id: 'job_24',
    recruiterId: 'recruiter_harvey',
    recruiterName: 'Harvey Specter',
    recruiterCompany: 'Pearson Specter Contracting',
    title: 'Commercial Restaurant Hood & Baffle Filter Degreasing',
    trade: 'Chimney Cleaner',
    location: 'Gurugram',
    offeredRate: 2000,
    rateType: 'Per Job',
    requiredSkills: ['Baffle Filter Degreasing', 'Fume Hood Servicing', 'Motor Oil Extraction'],
    description: 'Chemical hot-water soak for heavy grease buildup on stainless baffle filters.',
    status: 'Open',
    matchScore: 93
  },
  {
    id: 'job_25',
    recruiterId: 'recruiter_harvey',
    recruiterName: 'Harvey Specter',
    recruiterCompany: 'Pearson Specter Contracting',
    title: 'Mounting & Plumbing 25L Vertical Storage Geyser',
    trade: 'Geyser Installation Expert',
    location: 'Noida',
    offeredRate: 850,
    rateType: 'Per Job',
    requiredSkills: ['Instant & Storage Geysers', 'Pressure Valve Calibration', 'Safety Wire Earthing'],
    description: 'Secure wall mounting, connection with multi-function safety valve, and earthing test.',
    status: 'Open',
    matchScore: 97
  }
];

// Helper to lookup worker or job by trade
export const getWorkerByTrade = (tradeName: string) => 
  preSeededWorkers.find(w => w.trade.toLowerCase() === tradeName.toLowerCase());

export const getJobByTrade = (tradeName: string) => 
  preSeededJobOffers.find(j => j.trade.toLowerCase() === tradeName.toLowerCase());