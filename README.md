# SYSLIB Common Font Minification Tool.
Build 2013101701.

This is a tool to compress font and gen webfont.
It can convert TTF/OTF/SVG/WOFF/EOT.... to TTF/SVG/WOFF/EOT and gen webfont css,then pack with zip.

Now only windows are supported.
I'm working on the dependencies' compile script.

just head to test dir and have fun.

#Install

       npm install -g cfmin

#Useage

       cfmin [opitions] -f [file] [-n [name]] -m [map]

opitions

        --no_zip                        do not pack
        --no_css                        do not gen css
        --no_ttf                        do not gen ttf
        --no_svg                        do not gen svg
        --no_eot                        do not eot
        --no_woff                       do not gen woff