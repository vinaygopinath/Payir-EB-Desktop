#Payir EB Data Management 
##Desktop app

A desktop app built using AngularJS and Node-Webkit (NW.js) meant for use by people who perform electricity board (EB) online payments as a service. The app stores information about Tamil Nadu Electricity Board (EB) customers and tracks their online payments. Check out the accompanying Chrome extension

This app was built in collaboration with the data entry team at the rural empowerment NGO, Payir, in Thenur village, Tamil Nadu. To find out more or donate, visit [payir.org](http://payir.org)

##Installation

This app is based on nodejs and npm, so please make sure you have them installed. Check out this [article](https://nodesource.com/blog/nodejs-v012-iojs-and-the-nodesource-linux-repositories#installing-node-js-v0-12) for help on Linux distributions.

Download this repository and open it up in a terminal
> ```cd /path/to/eb_project_desktop/```

This app uses the [Bower](http://bower.io) package manager. To install the external dependencies of this project, run
>```bower install```

Subsequently, run this
>```npm install #may need sudo in some cases```

To run this app, you need nw. You can install this globally using
>```npm install -g nw #may need sudo in some cases```

You're all set up. Now you can run the app like so
>```nw /path/to/eb_project_desktop/app/```

##Additional Configuration

###MySQL

This app expects a MySQL server running on localhost. This can be installed on Ubuntu based systems as follows
>```sudo apt-get install mysql-server mysql-client```

Further, the app expects a MySQL account specific to the app with the following credentials
>  **Username**: `payir_eb`

>  **Password**: `payir_eb`

To create the user, use the [command line](https://www.digitalocean.com/community/tutorials/how-to-create-a-new-user-and-grant-permissions-in-mysql) or use [MySQL workbench](https://dev.mysql.com/downloads/workbench/)

Alternatively, you can also modify the hard-coded MySQL credentials in `scripts/services/dbservice.js`, particularly the `openConnection` function

###Server

This app runs an HTTP server on localhost (port 5555) to allow the Chrome extension to capture and submit bill payments. In case of a port conflict (already in use by an existing app), modify the port number in `app.js` of this app as well the Chrome extension

##Creating Windows and Linux builds

To create a Windows executable, open a terminal in the eb_project_desktop directory and run
>```grunt dist-win```

For Linux, run
>```grunt dist-linux```

The executables will be available in `dist`

##Credits

Janani, Sekar, Selvarani and Vanaja from the IT team at Payir

##Known quirks

To build the final packaged app for different platforms, it is necessary to create a node_modules directory in app/ and copy the mysql module into it. This is to prevent "module not found" errors in the app.

##Licence

Copyright 2015 Vinay Gopinath

This program is free software: you can redistribute it and/or modify it under the terms of the [GNU General Public License (version 3)](https://www.gnu.org/copyleft/gpl.html) as published by the Free Software Foundation