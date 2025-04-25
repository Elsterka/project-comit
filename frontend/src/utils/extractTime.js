// This function takes a date string and returns the time in "HH:MM" format
export function extractTime(dateString) {
	// Convert the input string into a Date object
	const date = new Date(dateString);
	// Extract hours and minutes, and ensure both are 2 digits using padZero
	const hours = padZero(date.getHours());
	const minutes = padZero(date.getMinutes());
	// Return the formatted time string
	return `${hours}:${minutes}`;
}

// Helper function to pad single-digit numbers with a leading zero
// For example, 7 becomes "07"
function padZero(number) {
	return number.toString().padStart(2, "0");
}
