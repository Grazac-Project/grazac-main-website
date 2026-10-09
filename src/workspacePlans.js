// Single source of truth for co-working prices.
// Used by the booking flow (components/bookSpace.js) and the plans page
// (pages/CoworkingSpaces.js) — change a price here and both update.
// `days` is how long the plan runs; picking exactly that many custom days
// is charged at the plan price instead of the daily rate.

export const paymentOptions = [
  { label: "Daily", value: "daily", amount: 3000, days: 1 },
  { label: "Weekly", value: "weekly", amount: 15000, days: 7 },
  { label: "Monthly", value: "monthly", amount: 60000, days: 31 },
  { label: "Quarterly", value: "quarterly", amount: 165000, days: 91 },
  { label: "Yearly", value: "yearly", amount: 600000, days: 365 },
];

export const DAILY_RATE = paymentOptions[0].amount;

// Standard (pre-discount) daily price. Shown crossed out next to the daily
// rate, and used to work out the "Save %" on the longer plans. Display only —
// checkout always charges the amounts above.
export const REGULAR_DAILY_RATE = 5000;

export const customPlan = { label: "Custom", value: "custom", amount: 0 };

// Price for a hand-picked set of days: bundle price when the count matches a
// plan exactly, otherwise the daily rate per day.
export const priceForDays = (count) => {
  const bundle = paymentOptions.find((option) => option.days === count);
  return bundle ? bundle.amount : count * DAILY_RATE;
};
