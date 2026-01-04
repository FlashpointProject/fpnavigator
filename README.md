# Flashpoint Navigator

This is the source code for the Flashpoint Navigator, a web browser based up on Basilisk which is then derrived from Firefox / Mozilla community code.

## Building Flashpoint Navigator

The browser uses Unified XUL Platform source as the browsers code and is referenced as a git submodule contained in the `platform/` directory and is required to build the application.

**Start with getting the platform sub-module by running the command:**

```bash
git submodule init && git submodule update
```

### Windows

Make sure you have plenty of disk space and at least 8GB of ram with 2 or more cores, the more the better. Running Windows 10 or Windows 11 is recommended.
Make sure to clone the repository to a path without spaces, i.e.: `C:\fpnavigator`

* At least Windows 10 64-bit (32-bit build environments or Windows versions < 10 are not supported)
* Microsoft Visual Studio 2022 (Community Edition (free) or Pro/Paid version. Express won't work).
Component selection during installation:
  * "Desktop development with C++"
  * "Game development with C++".
  * MSVC v143 (v14.44-17.14) toolset
  * Windows 11 SDK 10.0.26100.0
* [MozillaBuild 3.4](https://ftp.mozilla.org/pub/mozilla/libraries/win32/MozillaBuildSetup-3.4.exe)
* At least 6GB RAM or more (8GB+ recommended)
* Plenty of disk space (at least 10GB free recommended)

**NB**: If you plan to build for 32-bit Windows, you need to install Windows 11 SDK 10.0.22621.0 as well.

#### Preapre the build environment

After installing MozillaBuild, you need to set up the build environment. 

Clone the repository to a path without spaces, i.e.: `C:\fpbrowser` then open Git bash and pull the submodules:

```bash
git submodule init && git submodule update
```

It is also recommened to add  MSVC build scripts the Mozbuild environment. These were previously included with MozillaBuild but are no longer included by default. Downloed the scripts from [here](https://repo.palemoon.org/FranklinDM/msvc-build-scripts-for-uxp) and place them in `C:\mozilla-build\` folder.

Close git bash and follow build instructions below.

#### Build Instructions

##### Configure

Update the variable `WIN32_REDIST_DIR` in the mozconfig files to point to the location of your Visual Studio redist files.
* For x86 build edit `mozconfigs/windows/win32/win32_fpnavigator.mozconfig`
* For x64 build edit `mozconfigs/windows/win64/win64_fpnavigator.mozconfig`

You should also probably update `MOZ_MAKE_FLAGS` to match your CPU core count for faster builds.

##### Build

1. Go to C:\mozilla-build (or wherever you installed MozillaBuild) and run the appropriate batch file to start the build environment: `start-shell.bat`. This will open a UNIX-like shell.
2. In the shell navigate to the directory where you cloned the source code, e.g. `cd /c/fpbrowser`
3. Set the MOZCONFIG variable to point to the appropriate mozconfig file for your target architecture:

    * For x86 build: `export MOZCONFIG=$(pwd)/mozconfigs/windows/win32/win32_fpnavigator.mozconfig`
    * For x64 build: `export MOZCONFIG=$(pwd)/mozconfigs/windows/win64/win64_fpnavigator.mozconfig`

4. Start the build process by running: `./mach build`

#### Strip Package

To create a stripped package for release run the command: 
```bash
./mach package
```

This will create a zip file inside the `obj*` folder under `dist` directory.
```bash
C:\fpbrowser\obj-i686-pc-mingw32\dist\flashpointnavigator-<timestamp>.win32.zip
```

### Mac

**Needs to be updated!!**

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
