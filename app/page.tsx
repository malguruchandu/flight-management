'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useFlightStore } from '@/lib/store'

export default function Home() {
    const router = useRouter()
    const { setSearchQuery } = useFlightStore()
    const [form, setForm] = useState({ origin: '', destination: '', date: '', passengers: 1 })

    const handleSearch = (e: any) => {
        e.preventDefault()
        setSearchQuery(form)
        router.push('/flights')
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center px-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg">
                <h1 className="text-3xl font-bold text-center text-blue-700 mb-2">✈️ FlightApp</h1>
                <p className="text-center text-gray-500 mb-6">Search and book flights instantly</p>
                <form onSubmit={handleSearch} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                        <select required className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={form.origin} onChange={e => setForm({ ...form, origin: e.target.value })}>
                            <option value="">Select origin</option>
                            <option>Delhi</option><option>Mumbai</option>
                            <option>Bangalore</option><option>Chennai</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                        <select required className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={form.destination} onChange={e => setForm({ ...form, destination: e.target.value })}>
                            <option value="">Select destination</option>
                            <option>Delhi</option><option>Mumbai</option>
                            <option>Bangalore</option><option>Chennai</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                        <input required type="date" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Passengers</label>
                        <input type="number" min={1} max={9} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={form.passengers} onChange={e => setForm({ ...form, passengers: parseInt(e.target.value) })} />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                        Search Flights
                    </button>
                </form>
            </div>
        </div>
    )
}