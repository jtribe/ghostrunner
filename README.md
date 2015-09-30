# Ghostrunner

> A CLI for the Ghost blogging platform.

Ghostrunner is a command-line application that can create Ghost blogs and provides OS-specific
service wrappers (upstart, launchctl or initctl) so that the server is started on system startup.

See [this blog article](http://blog.jtribe.com.au/ghost-blog-on-aws/) for detailed setup 
instructions for AWS.

## Usage

```sh
npm install -g ghostrunner
```

### Creating a Blog

```sh
mkdir somewhere && cd somewhere
ghostrunner init
ghostrunner server
```

`ghostrunner init` will not overwrite any files - if you want to overwrite files then remove them first.

### Installing the blog as a service

```sh
ghostrunner install # uses ndm to install the appropriate service wrapper for your OS
ghostrunner start # to start the service now
```

## Deployment

1. Install ghostrunner on the server: `sudo npm install -g ghostrunner`
1. Deploy the blog to your server and `cd` into the directory
1. `npm install && sudo ghostrunner install && sudo ghostrunner start`
1. Confirm that it runs on system startup by rebooting

### Specifying user and group

If you want to run your blog as a different user you can use the `--uid` and `--gid` options. Be 
aware that running as root is probably a very bad idea.

```sh
ghostrunner install --uid myuser --gid myuser
```

## Troubleshooting

- If you change the package name (in package.json) you will also need to change the `ghostrunner-blog` key in service.json
