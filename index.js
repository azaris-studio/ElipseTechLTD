// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form-container');

  // Define validation rules
  const validators = {
    first_name: (val) => val.trim().length >= 2,
    last_name: (val) => val.trim().length >= 2,
    company_name: (val) => val.trim().length > 0,
    email: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
    phone: (val) => /^\d{3}-\d{3}-\d{4}$/.test(val), // Matches 123-456-7890
    subject: (val) => val !== "" && val !== null
  };

  // Function to show/hide error styles
 const validateInput = (input) => {
  const name = input.getAttribute('name');
  const isValid = validators[name] ? validators[name](input.value) : true;
  const errorSpan = input.nextElementSibling; // Targets the .error-msg span

  if (isValid) {
    input.classList.remove('input-invalid');
    if (errorSpan) errorSpan.style.display = 'none';
    input.style.borderColor = '#28a745';
  } else {
    input.classList.add('input-invalid');
    if (errorSpan) errorSpan.style.display = 'block';
    input.style.borderColor = '#e74c3c';
  }
  return isValid;
};

  // Attach "input" event listeners for real-time validation
  const inputs = form.querySelectorAll('input, select');
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      validateInput(input);
    });
  });

  // Final validation check on Form Submit
  form.addEventListener('submit', (event) => {
    let isFormValid = true;

    inputs.forEach(input => {
      if (!validateInput(input)) {
        isFormValid = false;
      }
    });

    if (!isFormValid) {
      event.preventDefault(); // Stop form from sending
      alert('Please fix the errors before submitting.');
    }
  });
});