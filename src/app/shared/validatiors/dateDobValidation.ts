import { AbstractControl, ValidationErrors } from '@angular/forms';

export async function validateDateOfBirth(control: AbstractControl): Promise<ValidationErrors | null> {
  const today = new Date();
  const driverDob = new Date(control.value);
  // Check if the entered date is in the future
  if (driverDob > today) {
    return Promise.resolve({ futureDate: true });
  }
  // Calculate age based on the difference in years
  const age = today.getFullYear() - driverDob.getFullYear();
  // If the age is less than 21, return an "underage" error
  if (age < 21) {
    return Promise.resolve({ underage: true });
  }
  // If all checks pass, return null (no errors)
  return Promise.resolve(null);
}
