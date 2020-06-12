# Ande (Beta)

Ande (ANcilla DEsktop) is a desktop app for working with 3D printers for setup, diagnostics, etc. Ande joins the 
family of 3D printing tools and utilies:

- [LayerKeep](https://layerkeep.com)
- [Ancilla](https://ancilla.app)
- [Pluck.io](https://pluck.io)


## Screenshots

Terminal             |  Editor
:-------------------------:|:-------------------------:
![](screenshots/ande-terminal.png?raw=true)  |  ![](screenshots/ande-editor-console.png?raw=true)


## Features
- Terminal
- Built in commands (they start with /)
- Macros for simplifying and minimizing running the same commands over and over.
- More coming.

## Installation

The easiest way to install is to download the installer for your OS (currently just Mac and Windows)

- [macOS](https://github.com/frenzylabs/ande/releases/download/v0.0.1/Ande-0.0.1.dmg)
- [windows](https://github.com/frenzylabs/ande/releases/download/v0.0.1/Ande-Setup-0.0.1.exe)
- Linux coming soon.

## Usage

- Connect your computer to your printer over USB
- Launch Ande
- Select USB port and baudrate in top toolbar and hit the power button

In terminal, type `/help` to see a list of built in commands or enter any G/M/T (GCode) command (with out `/`) and hit enter.

For Macros, click `+` (new) and start writing your macro in the editor. You can right-click next to the line number 
to run just that line in the editor, or you can click play button in the top right of editor to run the everything. A
built-in console view is available at the bottom of the editor, click the "Window" icon in the bottom right of the icon to 
expand the console.

All saved macros can be run from the terminal using: `/run <macro name>`

## Building

To build from source for your current OS:

```
$ make package
```

To build from source for a different OS:

```
$ yarn install --check-files
$ yarn build
```

Followed by:

- windows: `$ yarn pack:win`
- macOS: `$ yarn pack:macos`
- linux: `$ yarn pack:linux`

## Running in dev:

```
$ make run
```

## License
*Ande* is licensed under Apache2. See LICENSE for more details.

## Contact us
Any questions comments or concerts? Email us at [hi@frenzylabs.com](mailto:hi@frenzylabs.com)
