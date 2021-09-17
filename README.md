# Flashpoint Web browser (fpbrowser)

This is the source code for the Flashpoint Web Browser, a web browser based up on Basilisk which is then derrived from Firefox / Mozilla community code.

## Building
The browser uses Unified XUL Platform source as the browsers code and is referenced as a git submodule contained in the `platform/` directory and is required to build the application.
### Getting the platform sub-module
`git submodule init && git submodule update`

### Windows
Short-guide for building on Windows.
#### Windows Build Requirements
Make sure you have at least 3GB+ of free space and at least 4GB of ram with 2 or more cores, the more the better. Running Windows 7 or newer with 64-bit.
Make sure to clone the repository to a path without spaces! E.g: `C:\fpbrowser`

The following build tools is necessary:
- Microsoft Visual Studio 2015 (Community Edition (free) or Pro/Paid version -- Express won't work) with updates.
Make sure you install the correct components for "C++ development"; other languages are not necessary and not installing them will save you (heaps of) disk space.
- Exactly [Windows 10 SDK version 10.0.19041.0](https://developer.microsoft.com/en-us/windows/downloads/sdk-archive/) (with servicing update .685)
- [MozillaBuild 2.2](https://ftp.mozilla.org/pub/mozilla/libraries/win32/MozillaBuildSetup-2.2.0.exe)

#### Executing windows build
Start Mozilla Build Tools by lauching the script: `C:\mozilla-build\start-shell-msvc2015.bat` to enter a Linux-like environment (MSYS). Navigate to the directory of the soure code:
```bash
$ cd /c/fpbrowser
```
execute the pre-defined build script which will build and package it for you depending on what you want to build, e.g for Windows x86:
```bash
$ ./scripts/build_windows_x86.sh
```
When finished you will get a new folder named `obj-i686-pc-mingw32` that contains the finished build.
## License
License is [MPL 2.0](https://www.mozilla.org/en-US/MPL/2.0)
