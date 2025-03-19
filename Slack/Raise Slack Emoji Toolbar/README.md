# Raise Slack Emoji Toolbar (Tampermonkey Script)

## Description
This Tampermonkey script raises the Slack emoji reaction toolbar by 25px to prevent it from obstructing chat thread link when you hover your mouse.

### Why?
When hovering over a person's name in a Slack chat thread to click on the thread’s channel, the emoji toolbar often blocks the link, making it difficult to navigate. Expanding the sidebar width is a workaround, but it reduces the workspace area, which isn't ideal. This script provides a simple fix by shifting the emoji toolbar upwards.

## Installation
1. Install the [Tampermonkey extension](https://www.tampermonkey.net/) for your browser.
2. Click on **Create a new script**.
3. Copy and paste the contents of [`slack-emoji-toolbar.user.js`](https://raw.githubusercontent.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME/main/slack-emoji-toolbar.user.js) into the editor.
4. Save the script and ensure it is enabled.
5. Reload your Slack tab.

## How It Works
- The script continuously monitors the DOM for Slack’s emoji toolbar and moves it **25px higher** when it appears.
- This ensures that important UI elements remain clickable and accessible.

## Updates
This script will automatically check for updates from GitHub.

## License
This project is licensed under the MIT License - feel free to use, modify, and share it.

## Contributing
Feel free to submit an issue or a pull request if you have improvements or bug fixes!

---

### Screenshots
#### Issue Before Applying the Script
<img width="413" alt="image" src="https://github.com/user-attachments/assets/2d1bf888-57d7-4ff9-857e-1f0b55da250f" />


#### After Applying the Script
<img width="410" alt="image" src="https://github.com/user-attachments/assets/942ca459-8a54-4a87-8afe-914dc808fc13" />


