//bad
import { z } from "zod";
export const make_schema=(s:any)=>{return z.object({
bName:z.string().min(2),guests:z.number().min(1).max(10),
d:z.coerce.date().refine((d:any)=>!isNaN(d.getTime())&&d>new Date()),
timeSlot:z.string().refine((ts:any)=>s.includes(ts))})}

// GOOD

export const createBookingSchema = (availableTimeSlots: string[]) => {
  return z.object({
    bookerName: z
      .string()
      .min(2, 'Booker name must be at least 2 characters long'),

    numberOfGuests: z
      .number({ invalid_type_error: 'Number of Guests must be integer' })
      .int('Number of Guests must be integer')
      .min(1, 'Number of Guests must be at least 1')
      .max(10, 'Number of Guests must be less than or equal to 10'),

    eventDate: z.coerce
      .date()
      .refine((date) => !isNaN(date.getTime()) && date > new Date(), {
        message: 'Event date must be in the future',
      }),

    timeSlot: z
      .string()
      .refine((timeSlot) => availableTimeSlots.includes(timeSlot), {
        message: 'Selected time slot is unavailable',
      }),
  });
};

export type BookingFormData = z.infer<ReturnType<typeof createBookingSchema>>;
