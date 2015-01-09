# Ghostrunner

> A CLI for the Ghost blogging platform.

Ghostrunner is a command-line application that can create Ghost blogs, and provides OS-specific
service wrappers (upstart, launchctl or initctl) so that the server is started on system startup.

## Usage

```
npm install -g ghostrunner`
```

### Creating a Blog

```
mkdir somewhere && cd somewhere
ghostrunner init
ghostrunner server
```

### Installing the Blog as a Service

```
ghostrunner install
ghostrunner start # to start the server now
```
