const goalCont = document.querySelectorAll(".goal-container");
const checkboxAll = document.querySelectorAll(".checkbox");
const inputAll = document.querySelectorAll(".input");
const error = document.querySelector(".error-label");
const progress_bar = document.querySelector(".progress-bar");
const progress = document.querySelector(".progrees");

console.log(inputAll);

const confettiDefaults = {
  spread: 360,
  ticks: 100,
  gravity: 0,
  decay: 0.94,
  startVelocity: 30,
};

// Function to trigger the confetti effect
function shoot() {
  confetti({
    ...confettiDefaults,
    particleCount: 30,
    scalar: 1.2,
    shapes: ["circle", "square"],
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
  });

  confetti({
    ...confettiDefaults,
    particleCount: 20,
    scalar: 2,
    shapes: ["emoji"],
    shapeOptions: {
      emoji: {
        value: ["🦄", "🌈"],
      },
    },
  });
}

// Function to update the progress bar if all inputs have values
function updateProgressIfAllInputsFilled() {
  const allInputsFilled = [...inputAll].every((input) => input.value !== "");

  if (allInputsFilled) {
    // Calculate progress percentage based on the number of completed tasks
    const completedTasks = document.querySelectorAll(
      ".goal-container.completed"
    ).length;
    const totalTasks = goalCont.length;
    const progressPercentage = (completedTasks / totalTasks) * 100;

    // Update progress bar width and text
    progress.style.width = `${progressPercentage}%`;
    progress.querySelector(
      "span"
    ).textContent = `${completedTasks}/${totalTasks} completed`;

    // If progress is 100%, show the alert
    if (progressPercentage === 100) {
      // Trigger the confetti effect multiple times for a celebration effect
      setTimeout(shoot, 0);
      setTimeout(shoot, 100);
      setTimeout(shoot, 200);

      // Confetti effect
      const duration = 15 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        // Generate confetti from two different locations on the screen
        confetti(
          Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          })
        );
        confetti(
          Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          })
        );
      }, 250);
    }
  } else {
    progress_bar.classList.add("show-error"); // Show error if inputs are not all filled
  }
}

// Helper function for random range generation
function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

// Event listeners for checkboxes
checkboxAll.forEach((checkbox, index) => {
  checkbox.addEventListener("click", (e) => {
    e.preventDefault();

    const allChecked = [...inputAll].every((input) => {
      return input.value;
    });

    if (allChecked) {
      // Toggle the 'completed' class on the parent container
      checkbox.parentElement.classList.toggle("completed");
      // Update progress only if all inputs are filled
      updateProgressIfAllInputsFilled();
    } else {
      progress_bar.classList.add("show-error");
    }
  });
});

// Event listeners for inputs to remove error on focus
inputAll.forEach((input) => {
  input.addEventListener("focus", () => {
    progress_bar.classList.remove("show-error");
  });
});

// https://github.com/Gladiator07/Harvestify


document.querySelector('.restart-button').addEventListener('click', function() {
    this.classList.add('bouncing');

    // Remove the class after the animation ends
    setTimeout(() => {
        this.classList.remove('bouncing');
    }, 500); // Duration of the bounce animation
});



