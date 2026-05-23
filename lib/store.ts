import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface PassengerForm {
    fullName: string
    passportNo: string
    nationality: string
    dob: string
}

interface FlightStore {
    searchQuery: { origin: string; destination: string; date: string; passengers: number }
    selectedFlight: any
    selectedSeat: any
    bookingStep: number
    passengerForm: PassengerForm
    setSearchQuery: (q: any) => void
    setSelectedFlight: (f: any) => void
    setSelectedSeat: (s: any) => void
    setBookingStep: (step: number) => void
    setPassengerForm: (p: any) => void
    resetStore: () => void
}

export const useFlightStore = create<FlightStore>()(
    persist(
        (set) => ({
            searchQuery: { origin: '', destination: '', date: '', passengers: 1 },
            selectedFlight: null,
            selectedSeat: null,
            bookingStep: 1,
            passengerForm: { fullName: '', passportNo: '', nationality: '', dob: '' },
            setSearchQuery: (q) => set({ searchQuery: q }),
            setSelectedFlight: (f) => set({ selectedFlight: f }),
            setSelectedSeat: (s) => set({ selectedSeat: s }),
            setBookingStep: (step) => set({ bookingStep: step }),
            setPassengerForm: (p) => set({ passengerForm: p }),
            resetStore: () => set({
                selectedFlight: null,
                selectedSeat: null,
                bookingStep: 1,
                passengerForm: { fullName: '', passportNo: '', nationality: '', dob: '' },
            }),
        }),
        {
            name: 'flight-store',
            partialize: (state) => ({
                searchQuery: state.searchQuery,
                selectedFlight: state.selectedFlight,
                bookingStep: state.bookingStep,
            }),
        }
    )
)

interface UserStore {
    session: any
    cachedBookings: any[]
    setSession: (s: any) => void
    setCachedBookings: (b: any[]) => void
}

export const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            session: null,
            cachedBookings: [],
            setSession: (s) => set({ session: s }),
            setCachedBookings: (b) => set({ cachedBookings: b }),
        }),
        {
            name: 'user-store',
            partialize: (state) => ({ session: state.session }),
        }
    )
)