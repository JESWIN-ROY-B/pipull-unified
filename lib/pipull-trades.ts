export const blueCollarCategories = [
  'Plumber', 'Electrician', 'Bathroom Cleaner', 'Deep House Maid', 'Cook / Home Chef',
  'AC Repair Technician', 'Carpenter', 'Painter', 'Mason', 'Welder', 'Pest Control Specialist',
  'Pool Maintenance Cleaner', 'Sofa Dry-Cleaner', 'Refrigerator Mechanic', 'Washing Machine Technician',
  'Solar Panel Cleaner', 'Driver / Chauffeur', 'Gardener / Landscaper', 'Security Guard',
  'Ironing Specialist', 'Water Tank Cleaner', 'Smart Lock Installer', 'Wall Tile Fixer',
  'Chimney Cleaner', 'Geyser Installation Expert',
] as const

export const seededTradeCounts = blueCollarCategories.map((name, index) => ({
  name,
  activeWorkers: 25 + (index * 7) % 42,
  activeOffers: 9 + (index * 3) % 18,
}))
