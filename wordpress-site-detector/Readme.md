# WordPress Site Detector

This TamperMonkey script detects if a website is built with WordPress and displays theme and plugin information in a floating box. It also allows copying the information in a table format.

## Features
- Detects WordPress sites
- Displays theme and plugin information
- Floating, collapsible information box
- Copy button for copying information in table format

  ## Sample:
### On a WordPress site
  ![image](https://github.com/user-attachments/assets/3e485661-723e-4ba2-996c-bab6db60bf9d)

### On a Non-WordPress site
  ![image](https://github.com/user-attachments/assets/fdf4456e-13e0-40d0-86a2-59dd784a0d46)


## Installation
1. Install TamperMonkey extension in your browser.
2. Create a new userscript in TamperMonkey.
3. Paste the contents of `wordpress-site-detector.user.js` into the script editor.
4. Save and activate the script.

**Please Note**
The script works by making AJAX requests to known WordPress REST API endpoints. Note that this might not work on all sites due to CORS policies or disabled REST API.

## Usage
- The floating box will appear on the right side of the page.
- Click the WordPress logo to toggle the box.
- View the detected WordPress information or copy it to your clipboard.

## Changelog

See the [CHANGELOG.md](ChangeLog.md) file for details on changes made in each version.

## License
This project is licensed under the MIT License.
