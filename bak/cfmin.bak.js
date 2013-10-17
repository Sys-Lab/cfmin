

///////////////////////////svgmin node/////////////////////

function min_svg(data1,data2,name){
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
	flist=flist.replace(/font-family=\"([/s/S]*?)\"/,'font-family="'+name+'"');
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
var spawn = require( 'child_process' ).spawn;
var exec = require( 'child_process' ).exec;
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
	console.log("\nSYSLIB Common Font Minification Tool.\t\t\t\tBuild 2013100101.\n");
	console.log(clc.bgMagentaBright.black("Know Bug: SVG Headers may saved twice. graph space may missing.  \nSorry for those Bugs~"));
	console.log("Usage: node cfmin.js "+clc.greenBright("-f [file]")+" "+clc.yellowBright("[-n [name]]")+" "+clc.magentaBright("-m [map]")+"\n");
	console.log("");
	return 0;
}
if(!argv.f||!argv.m){
	clcerror("No File Specified !");
	return 1;
}
try{
	//var fdata=readfile(argv.f);
	var mdata=readfile(argv.m);
	var name=argv.f;
	name=(argv.n)?argv.n:name;
	var file2=(argv.f).split(".");
	var orgext=(file2.pop()).toUpperCase();
	var file3=file2.join(".")+".svg";
	var coned=function(){
		fs.stat(file3, function (err, stat) {
			  if (err) {
			  	clcerror("Convert Error ! Please Check Your Font File.");
				return 1;
			  }
			  var fdata=readfile(file3);
			  if(fdata&&mdata){
					savefile(name+".svg",min_svg(fdata,mdata,name));
					fName_to_conv=name+".svg";
					startconv();
			  }else{
					clcwarn("File Is Empty ! Abort ...")
			  }
		});
	}
	fName_to_conv=0;
	fList_to_conv=["ttf","woff","eot"];
	var cleaning=function(){
		clcnotice("Cleaning ...");
		exec("rm "+name+".ttf");
		exec("rm "+name+".eot");
		exec("rm "+name+".afm");
		exec("rm "+name+".css");
		exec("rm "+name+".svg");
		exec("rm "+name+".woff");
		clcallright("Cleaning done.");
		clcallright("All done.");
		return;
	}
	var packing=function(){
		packer = spawn( '7z', [ 'a',name+'.zip' ,name+'.ttf',name+'.woff',name+'.eot',name+'.afm',name+'.svg',name+'.css'] );
		packer.stdout.on('data', function (data) { 
			clcnotice("PACKER: "+data);
		});
		packer.on( 'exit', function () { if(!ERR){
			clcallright("Packing done.");cleaning();
	 	}else{clcerror("Packing error");return;}} );
		var ERR=0;
		packer.stderr.on('data', function (data) { clcerror("PACKER: "+data);ERR=1; });
	}
	var startconv=function(list){
		if(!fList_to_conv||!fList_to_conv.length){
			clcallright("Conv done.");
			clcnotice("Generate CSS ...");
			var cssDATA="@font-face {\n\tfont-family: '"+name+"';\n\tsrc: url('"+name+".eot');\n\tsrc: url("+name+".woff) format('woff'),url("+name+".ttf) format('truetype'),url("+name+".svg#"+name+") format('svg'),url('"+name+".eot?#iefix') format('embedded-opentype');\n}"
			savefile(name+".css",cssDATA);
			clcallright("CSS done.");
			clcnotice("Packing ...");
			packing();
			return;
		}
		var nlist=fList_to_conv.shift();
		clcnotice("Output As "+nlist.toUpperCase()+" ...");
		var confont = spawn( 'fontforge', [ "-script" ,"gen"+nlist+".pe",fName_to_conv] );
		confont.on( 'exit',startconv );
	}
	clcnotice("File is "+orgext);
	if(orgext=="SVG"){
		coned();
		
		return;
	}
	clcnotice("Converting To SVG ...");
	var consvg = spawn( 'fontforge', [ "-script" ,"gensvg.pe",argv.f] );
	consvg.on( 'exit',coned );
}catch(e){
	clcerror("Read File Error !\n"+e);
}


