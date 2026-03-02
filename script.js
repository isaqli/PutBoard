// Braille keyboard functionality for words
document.addEventListener('DOMContentLoaded', () => {
  const wordDisplay = document.getElementById('word-display');
  const dots = document.querySelectorAll('.dot');
  const showChartBtn = document.getElementById('show-chart-btn');  
  const brailleChart = document.getElementById('braille-chart');
  let raisedDots = new Set(); 
  let currentWord = ''; 

  // Braille letters
  const brailleMap = {
    '1': 'A', '12': 'B', '14': 'C', '145': 'D', '15': 'E', '124': 'F', '1245': 'G', '125': 'H', '24': 'I', '245': 'J',
    '13': 'K', '123': 'L', '134': 'M', '1345': 'N', '135': 'O', '1234': 'P', '12345': 'Q', '1235': 'R', '234': 'S', '2345': 'T',
    '136': 'U', '1236': 'V', '2456': 'W', '1346': 'X', '13456': 'Y', '1356': 'Z'
  };

  // Function to speak text
  function speakText(text) {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Text-to-speech not supported in this browser.');
    }
  }

  // Function to update word display
  function updateDisplay() {
    wordDisplay.textContent = currentWord || '';
  }

  // Toggle dot raised/flat
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const dotNum = dot.getAttribute('data-dot');
      if (raisedDots.has(dotNum)) {
        raisedDots.delete(dotNum);
        dot.classList.remove('raised');
      } else {
        raisedDots.add(dotNum);
        dot.classList.add('raised');
      }
    });
  });

  // Submit button: Add letter to word and speak it
  document.getElementById('submit-btn').addEventListener('click', () => {
    const pattern = Array.from(raisedDots).sort().join('');
    const letter = brailleMap[pattern];
    if (letter) {
      currentWord += letter;
      updateDisplay();
      speakText(letter); // Speak the letter
    } else {
      speakText('Invalid pattern');
    }
    // Reset dots after submit
    raisedDots.clear();
    dots.forEach(dot => dot.classList.remove('raised'));
  });

  // Space button: Add space and speak the full word
  document.getElementById('space-btn').addEventListener('click', () => {
    if (currentWord.trim()) {
      speakText(currentWord); // Speak the full word
    }
    currentWord += ' ';
    updateDisplay();
    vibrate(50); // Light vibration

    // Reset dots
    raisedDots.clear();
    dots.forEach(dot => dot.classList.remove('raised'));
  });

  // Delete button: Remove last character
  document.getElementById('delete-btn').addEventListener('click', () => {
    currentWord = currentWord.slice(0, -1);
    updateDisplay();
  });

  // Clear button: Reset everything
  document.getElementById('clear-btn').addEventListener('click', () => {
    currentWord = '';
    updateDisplay();
    raisedDots.clear();
    dots.forEach(dot => dot.classList.remove('raised'));
  });
});


// Show Braille Chart 
const showChartBtn = document.getElementById('show-chart-btn');
const brailleChart = document.getElementById('braille-chart');

showChartBtn.addEventListener('click', () => {
  if (brailleChart.style.display === 'none' || brailleChart.style.display === '') {
    brailleChart.style.display = 'block';  // Show the image
    showChartBtn.textContent = 'Hide Braille Chart';
    speakText('Braille chart shown');
  } else {
    brailleChart.style.display = 'none';  // Hide the image
    showChartBtn.textContent = 'Show Braille Chart';
    speakText('Braille chart hidden');
  }
});

