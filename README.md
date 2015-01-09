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

- `ghostrunner init` will not overwrite any files - if you want to overwrite files then remove them first

### Installing the Blog as a Service

```
ghostrunner install
ghostrunner start # to start the server now
```

## Troubleshooting

- If you change the package name (in package.json) you will also need to change the `ghostrunner-blog` key in service.json
