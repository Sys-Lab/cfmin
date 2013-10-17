

///////////////////////////svgmin node/////////////////////

function min_svg(data1,data2){
	var map={};
	var patt = /unicode=\"([\s\S]*?)\"/g;
	var result=0;
	while ((result = patt.exec(data2)) != null)  {
			var yy=(result[1]!=" ")?result[1]:"FUCK";
			map[yy]=1;
	}
	var flist='';
	
	var finfo=data1.match(/([\s\S]*?)<glyph[\s\S]{0,3}glyph-name=\"([\s\S]*?)\"[\s\S]{0,3}unicode/);
	flist='';
	
	
	
	var patt = /<([\s\S]*?)unicode=\"([\s\S]*?)\"([\s\S]*?)\/>/g;
	var result=0;
	var i=0;
	var j=0;
	while ((result = patt.exec(data1)) != null)  {
		i++;
		var yy=(result[2]!=" ")?result[2]:"FUCK";
		if(map[yy]||map[String.fromCharCode(yy)]){
			flist=flist+result[0]+"\n";
			j++;
		}
	}
	flist=flist+"</font></defs></svg>";
	if(!flist.match(/xml/)){
		flist=finfo[1]+flist;
	}
	clcnotice("ORG: "+i);
	clcnotice("NOW: "+j);
	clcnotice("Ratio: "+parseInt((j/i)*100));
	console.log(clc.bgMagentaBright.black("Know Bug: SVG Headers may saved twice. graph space may missing.  \nSorry for those Bugs~"));
	return flist;
}
/////////////////////////////////////////////////////
////////////////////////load file////////////////////////////////
var fs = require("fs");

function readfile(filepath){
	clcnotice("Loading file ...");
	var data=fs.readFileSync(filepath);
	return data.toString();
}
function savefile(filepath,data){
	clcnotice("Minifying & Saving ...");
	fs.writeFileSync(filepath,data);
	clcallright("Minified.");
	
	return;
}
///////////////////////get arg//////////////////////////////
var clc = require('cli-color');
var clcerror = function(e){
	console.log(clc.bgRedBright.black(" ERROR! ")+" "+e);
}
var clcwarn = function(e){
	console.log(clc.bgMagentaBright.black("  WARN  ")+" "+e);
}
var clcnotice = function(e){
	console.log(clc.bgCyanBright.black(" NOTICE ")+" "+e);
}
var clcallright = function(e){
	console.log(clc.bgGreenBright.black("   OK   ")+" "+e);
}
var argv = require('optimist')
	.options('f', {
        alias : 'file'
    })
	.options('m', {
        alias : 'map'
    })
    .argv
;
if((!argv.f&&!argv.m)||argv.help){
	console.log("\nSYSLIB SVG Font Minification Tool.\t\t\t\tBuild 2013091010.\n");
	console.log(clc.bgMagentaBright.black("Know Bug: SVG Headers may saved twice. graph space may missing.  \nSorry for those Bugs~"));
	console.log("Usage: node svgfontmin.js "+clc.greenBright("-f [file]")+" "+clc.magentaBright("-m [map]")+"\n");
	console.log("");
	return 0;
}
if(!argv.f||!argv.m){
	clcerror("No File Specified !");
	return 1;
}
try{
	var fdata=readfile(argv.f);
	var mdata=readfile(argv.m);

	if(fdata&&mdata){
		savefile('output.svg',min_svg(fdata,mdata));
	}else{
		clcwarn("File Is Empty ! Abort ...")
	}
}catch(e){
	clcerror("Read File Error !\n"+e);
}


