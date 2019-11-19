(function IIFE() {
  var form = document.getElementById('form');
  var input = document.getElementById('word');

  var wordCounterNode = document.querySelector('#word-list .counter');
  var wordListNode = document.querySelector('#word-list .list');

  var duplicateCounterNode = document.querySelector('#duplicate-list .counter');
  var duplicateListNode = document.querySelector('#duplicate-list .list');

  var allWords = [];
  var duplicates = [];

  /**
   * Adds a word in the correct `ul` element regarding context.
   *
   * @param {string} context Where to append the word.
   * @param {string} value   The value to display.
   */
  function addWordToList(context, value) {
    var list = context === 'word' ? wordListNode : duplicateListNode;
    var counter = context === 'word' ? wordCounterNode : duplicateCounterNode;

    var li = document.createElement('li');
    li.appendChild(document.createTextNode(value));
    list.appendChild(li);

    counter.textContent = parseInt(counter.textContent, 10) + 1;
  }

  /**
   * Handles the form submit.
   *
   * @param {Event} event The form sumbit Event object.
   */
  function handleSubmit(event) {
    // Prevents page from reloading.
    event.preventDefault();

    // Get word from input.
    var value = input.value.toLowerCase();

    if (!value || !value.length) {
      return;
    }

    if (allWords.includes(value)) {
      if (!duplicates.includes(value)) {
        duplicates.push(value);
        addWordToList('duplicate', value);
      }
    } else {
      allWords.push(value);
      addWordToList('word', value);
    }

    // Clear input.
    input.value = null;
  }

  // Attach `onsubmit` form method `handleSubmit` function.
  form.onsubmit = handleSubmit;
})();
