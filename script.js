/**
 * =================================================================================
 * Refactored Switch Control with Action Logging
 * =================================================================================
 * This script iterates through all model items on the page. For each item, it
 * determines if it should be enabled (i.e., it's a "free" item) and updates its
 * toggle switch accordingly, logging every action to the console.
 */

// --- 1) HELPER FUNCTIONS ---

/**
 * Gets a human-readable identifier for a model item for logging purposes.
 * @param {HTMLElement} modelItem The container element for the item.
 * @returns {string} The item's title text or, as a fallback, its ID.
 */
function getItemIdentifier(modelItem) {
  const titleEl = modelItem.querySelector('.font-semibold');
  if (titleEl && titleEl.textContent.trim()) {
    return titleEl.textContent.trim();
  }
  return modelItem.id || 'Unknown Item';
}

/**
 * Checks if a model item is designated as "free" based on its text or ID.
 * @param {HTMLElement} modelItem The container element for the item.
 * @returns {boolean} True if the item is considered free.
 */
function isFreeItem(modelItem) {
  const title = modelItem.querySelector('.font-semibold');
  const titleText = title ? title.textContent : '';
  const altLabel = modelItem.querySelector('.text-xs, .line-clamp-1');
  const altText = altLabel ? altLabel.textContent : '';
  const idText = modelItem.id || '';

  return (
    /\(free\)/i.test(titleText) || // Check for a visible "(free)" tag
    /:free\b/i.test(altText) ||   // Check if a slug contains ":free"
    /:free\b/i.test(idText)       // Check if the element ID contains ":free"
  );
}

/**
 * Sets the state of a switch within a model item, ensuring the UI and
 * underlying input are synced. It only performs an action if the current
* state is different from the desired state.
 *
 * @param {HTMLElement} modelItem The container element for the item.
 * @param {boolean} shouldBeOn The desired state (true for ON, false for OFF).
 */
function setSwitchState(modelItem, shouldBeOn) {
  const identifier = getItemIdentifier(modelItem);
  const switchBtn = modelItem.querySelector('button[role="switch"]');
  const hiddenInput = modelItem.querySelector('[data-melt-switch-input]');

  // Ensure the necessary switch components exist
  if (!switchBtn || !hiddenInput) {
    console.warn(`[SKIPPED] Could not find a switch for: "${identifier}"`);
    return;
  }
  
  const isCurrentlyOn = hiddenInput.checked || switchBtn.getAttribute('aria-checked') === 'true';

  // Do nothing if the switch is already in the correct state
  if (isCurrentlyOn === shouldBeOn) {
    console.log(`[NO CHANGE] "${identifier}" is already ${shouldBeOn ? 'ON' : 'OFF'}.`);
    return;
  }

  // Log the action we are about to take
  console.log(`[ACTION] Turning ${shouldBeOn ? 'ON' : 'OFF'}: "${identifier}"`);
  
  // To ensure robust toggling, we simulate a click if possible, as it's the
  // most reliable way to trigger all component event handlers.
  if (!switchBtn.disabled) {
    switchBtn.click();
  }

  // As a fallback for stubborn components, we also directly set the state
  // and dispatch events that modern frameworks might listen for.
  if (hiddenInput.checked !== shouldBeOn) {
      hiddenInput.checked = shouldBeOn;
      hiddenInput.dispatchEvent(new Event('input',  { bubbles: true }));
      hiddenInput.dispatchEvent(new Event('change', { bubbles: true }));
  }
}

// --- 2) MAIN EXECUTION LOGIC ---

console.log('--- Synchronizing Item Switches ---');

const allModelItems = document.querySelectorAll('div[id^="model-item-"]');

if (allModelItems.length === 0) {
    console.warn("Execution finished: No model items found on the page.");
} else {
    allModelItems.forEach(item => {
        // Determine the target state: ON for free items, OFF for all others.
        const shouldBeEnabled = isFreeItem(item);
        // Apply the target state.
        setSwitchState(item, shouldBeEnabled);
    });
    console.log(`--- Synchronization Complete: Processed ${allModelItems.length} items. ---`);
}
