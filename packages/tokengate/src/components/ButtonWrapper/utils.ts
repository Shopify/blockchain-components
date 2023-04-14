export function getYearFormatOption(value: string): string | undefined {
  try {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    // Convert the provided value into a date.
    const providedDate = new Date(value);
    const providedYear = providedDate.getFullYear();

    // Get the difference in time from the provided date and the current date.
    const differenceInTime = providedDate.getTime() - currentDate.getTime();

    /**
     * Get the number of days between the provided date and the current date.
     *
     * 1000 * 3600 * 24 is the number of ms in a day. With this, we can
     * divide the time difference between the days to get the difference in days.
     */
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);

    if (differenceInDays > 90 && providedYear > currentYear) {
      return 'numeric';
    }

    return undefined;
  } catch {
    return 'numeric';
  }
}
