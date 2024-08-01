# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.9] - 2024-08-01
### Added
- Ensured that the copy button's style is not overridden on various sites.
- Implemented copying of the table as rich text (HTML) instead of plain text.
- Enhanced the script to store the detected plugins in the browser's local storage and update the list as we navigate different pages. This way, it can accumulate a more complete list over time.

### Fixed
- Fixed the issue where the handle for showing/hiding the floating box was not appearing.
- Prevented duplicate plugin names from being displayed.

## [1.8] - 2024-07-31
### Added
- Display a handle with the WordPress logo to show/hide the floating box.
- Copy button to copy the table content to the clipboard.
- Detect and display the theme and plugins used by the WordPress site.
- Ensured compatibility across different sites.

## [1.7] - 2024-07-28
### Added
- Initial release with basic detection of WordPress sites.
- Displays a message if the site is not a WordPress site.

### Fixed
- Adjusted the position and style of the floating information box.
- Enhanced the detection mechanism for WordPress themes and plugins.

## [1.0] - 2024-07-25
### Added
- Created the initial version of the script to detect if a site is using WordPress.
