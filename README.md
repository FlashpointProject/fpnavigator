# Flashpoint Web browser (fpbrowser)

This is the source code for the Flashpoint Web Browser, a web browser based up on Basilisk which is then derrived from Firefox / Mozilla community code.

## Building

The browser uses Unified XUL Platform source as the browsers code and is referenced as a git submodule contained in the `platform/` directory and is required to build the application.

**Start with getting the platform sub-module by running the command:**

```bash
git submodule init && git submodule update
````

### Windows

Short-guide for building on Windows.

Make sure you have plenty of disk space and at least 8GB of ram with 2 or more cores, the more the better. Running Windows 7 or newer with 64-bit.
Make sure to clone the repository to a path without spaces, i.e.: `C:\fpbrowser`


**The following build tools is necessary:**

- Microsoft Visual Studio 2015 (Community Edition (free) or Pro/Paid version -- Express will not work) with updates.

  Make sure you install the correct components for "C++ development"; other languages are not necessary and not installing them will save you (heaps of) disk space.
- Exactly [Windows 10 SDK version 10.0.19041.0](https://developer.microsoft.com/en-us/windows/downloads/sdk-archive/) (with servicing update .685)
- [MozillaBuild 2.2](https://ftp.mozilla.org/pub/mozilla/libraries/win32/MozillaBuildSetup-2.2.0.exe)

#### Executing windows build
You need to launch the proper build tools ennvironment for target architecture

- x86: `C:\mozilla-build\start-shell-msvc2015.bat`
- or x64: `C:\mozilla-build\start-shell-msvc2015-x64.bat.bat`

to enter a Linux-like environment (MSYS).

 Navigate to the directory of the source code:

```bash
cd /c/fpbrowser
```

execute the pre-defined build script which will build and package it for you depending on what you want to build.

```bash
./scripts/build_windows_x86.sh
or
./scripts/build_windows_x64.sh
```

When finished you will get a new folder named `obj*` that contains the finished build inside `dist` folder

### Mac

To build for Mac you need to setup a proper build environment. You need will the following toolset listed below which are going to be installed following this short guide.

- OS X 10.13 (HighSierra)
- Xcode 8 (Or higher) + Command-line tools for Xcode
- Apple 10.13 SDK
- Autoconf-2.13
- ccache
- Python 2.7
- libidl
- yasm 1.2 or higher

At least 8GB of ram required along with plenty of disk space!

### Install brew

You need to install [Homebrew](https://brew.sh/) so that necessary third-party tools can be installed.

### Install Xcode

Install Xcode 8 (or higher) + Command line tools for Xcode

### Setting up the environment

Open a new terminal and run the following command to install necessary tools using Brew:
This will also install necessary Python 2.7 developing headers

```bash
brew tap matt-chapman/python2
brew update
brew install automake ccache libidl libtool python@2
```

Now bootstrap the environment by running the following command in the cloned directory where FPBrowser lives. This will fetch the necessary build tools required.
(Note that this will take a long time as pre-built packages may not be available and all the tools need to be compiled from source)

You will have to apply a patch first to fix boostraping on Mac.
```bash
patch < patches/001-fix-mach-bootstrap-on-osx.patch
./mach bootstrap
```

### Building
To build on mac, simple export the MOZCONFIG variable to predefined mozconfig
`export MOZCONFIG=configs/mozconfig-mac_x64`

Build the project as usual:
```bash
./mach build
```
When finished you will get a new folder named `obj*` that contains the finished build inside `dist` folder.

If you want to package for release run the command: ```./mach package```

## License

License is [MPL 2.0](https://www.mozilla.org/en-US/MPL/2.0)
