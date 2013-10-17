@echo off
echo "This is cfmin's test script, MAY DELETE ALL YOUR DATA UNDER OUTPUT DIR"
pause
cd ..
del /q output\*
echo "TEST --no_css"
node cfmin.js -f test\test.ttf -n testfont -m map\CHSOnly.svg --no_css
pause
del /q output\*
echo "TEST --no_zip"
node cfmin.js -f test\test.svg -n testfont -m map\CHSOnly.svg --no_zip
pause
del /q output\*
echo "TEST --no_woff"
node cfmin.js -f test\test.svg -n testfont -m map\CHSOnly.svg --no_woff
pause
del /q output\*
echo "TEST --no_eot"
node cfmin.js -f test\test.svg -n testfont -m map\CHSOnly.svg --no_eot
pause
del /q output\*
echo "TEST --no_svg"
node cfmin.js -f test\test.svg -n testfont -m map\CHSOnly.svg --no_svg
pause
del /q output\*
echo "TEST --no_ttf"
node cfmin.js -f test\test.svg -n testfont -m map\CHSOnly.svg --no_ttf
pause
del /q output\*
echo "FULL TEST"
node cfmin.js -f test\test.svg -n testfont -m map\CHSOnly.svg --no_ttf
pause
echo "done"
del /q output\*
cd test
del test.svg
pause
