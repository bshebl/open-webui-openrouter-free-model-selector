# Open Web UI - Free Model Selector Script

A simple browser console script to automatically enable **only the free models** when using OpenRouter with the [Open Web UI](https://github.com/open-webui/open-webui). This script helps you avoid accidentally spending money by ensuring all paid models are disabled.

---

## The Problem

OpenRouter provides access to a huge variety of models, many of which are paid. When you're using Open Web UI, you might have to manually go through a long list of models to find and enable only the free ones. This process is tedious, and if the page refreshes or you clear your settings, you have to do it all over again. It's easy to miss one or accidentally leave a paid model enabled.

## The Solution

This script automates the entire process. It scans the models page on your Open Web UI instance, identifies which models are marked as free, and toggles their switches **ON**. At the same time, it ensures every other model's switch is toggled **OFF**.

The script identifies free models by looking for:
* A `(free)` tag in the model's title.
* A `:free` flag in the model's slug or ID.

---

## How to Use

1.  Navigate to your Open Web UI instance in your browser.
2.  Go to **Settings** > **Models**.
3.  Make sure you have pulled or refreshed your models from OpenRouter.
4.  Open your browser's **Developer Tools**.
    * **Chrome/Edge:** `Ctrl + Shift + J` (Windows/Linux) or `Cmd + Option + J` (Mac).
    * **Firefox:** `Ctrl + Shift + K` (Windows/Linux) or `Cmd + Option + K` (Mac).
5.  Select the **Console** tab.
6.  Copy the entire `script.js` code from this repository.
7.  Paste the code into the console and press **Enter**.

The script will run immediately. You'll see a log in the console detailing which models were turned on, which were turned off, and which were already in the correct state.



---

## Features

* **Automated Selection:** No more manual clicking. Run the script and you're done.
* **Cost Savings:** Peace of mind that no paid models are accidentally enabled.
* **Idempotent:** You can run the script multiple times without any negative effects. It will only change a switch if it's not already in the desired state.
* **Clear Logging:** The console output tells you exactly what the script did for each model.

## Disclaimer

This script relies on the specific HTML structure and CSS classes of the Open Web UI. If the UI is updated in the future, this script may need to be adjusted. It is provided as-is with no warranty.
