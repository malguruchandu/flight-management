'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBookings = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { setLoading(false); return }
      const { data } = await supabase.from('bookings').select(`
        *, flights(*), seats(*), passengers(*)
      `).eq('user_id', user.id).order('booked_at', { ascending: false })
      setBookings(data || [])
      setLoading(false)
    }
    fetchBookings()
  }, [])

  const handleCancel = async (bookingId: string) => {
    if (!confirm('Are you sure you want to cancel this booking?')) return
    const { error } = await supabase.from('bookings').update({ status: 'cancelled' }).eq('id', bookingId)
    if (error) { alert(error.message); return }
    setBookings(prev => prev.map(b => b.id === bookingId ? {...b, status: 'cancelled'} : b))
  }

  const statusColor = (status: string) => {
    if (status === 'confirmed') return 'bg-green-100 text-green-700'
    if (status === 'cancelled') return 'bg-red-100 text-red-700'
    return 'bg-yellow-100 text-yellow-700'
  }

  if (loading) return <div className="text-center py-20">Loading bookings...</div>

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6">My Bookings</h2>
      {bookings.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          No bookings yet. <a href="/" className="text-blue-600 underline">Search flights</a>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map(booking => (
            <div key={booking.id} className="bg-white rounded-xl shadow p-6">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="font-bold text-lg text-blue-700">{booking.pnr_code}</div>
                  <div className="text-gray-600">{booking.flights?.flight_no}: {booking.flights?.origin} → {booking.flights?.destination}</div>
                  <div className="text-sm text-gray-400">{new Date(booking.flights?.departs_at).toLocaleString()}</div>
                  <div className="text-sm text-gray-600 mt-1">Seat: {booking.seats?.seat_number} ({booking.seats?.class})</div>
                  {booking.passengers?.[0] && <div className="text-sm text-gray-600">Passenger: {booking.passengers[0].full_name}</div>}
                </div>
                <div className="text-right">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusColor(booking.status)}`}>
                    {booking.status}
                  </span>
                  <div className="font-bold text-gray-800 mt-2">₹{booking.total_price}</div>
                </div>
              </div>
              {booking.status === 'confirmed' && (
                <button onClick={() => handleCancel(booking.id)}
                  className="text-red-600 border border-red-600 px-4 py-1 rounded-lg text-sm hover:bg-red-50">
                  Cancel Booking
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}