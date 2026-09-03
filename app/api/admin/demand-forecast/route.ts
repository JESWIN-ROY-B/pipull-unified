import { db } from '@/lib/db'
import { jobOffers, workers } from '@/lib/db/schema'

export async function GET() {
  const [allWorkers, allJobOffers] = await Promise.all([db.select().from(workers), db.select().from(jobOffers)])

  const trades = Array.from(new Set([...allWorkers.map((worker) => worker.trade), ...allJobOffers.map((offer) => offer.trade)]))

  const forecast = trades
    .map((trade) => {
      const tradeWorkers = allWorkers.filter((worker) => worker.trade === trade)
      const openOffers = allJobOffers.filter((offer) => offer.trade === trade && offer.status === 'Open')
      const workerCount = tradeWorkers.length
      const openDemand = openOffers.length
      const gap = Math.max(openDemand - workerCount, 0)
      const demand = openDemand + workerCount > 0 ? Math.round((openDemand / (openDemand + workerCount)) * 100) : 0
      const locations = Array.from(new Set(openOffers.map((offer) => offer.location))).slice(0, 4)
      return { trade, demand, workers: workerCount, gap, locations }
    })
    .sort((a, b) => b.demand - a.demand)

  return Response.json({ forecast })
}
