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
    })  .options('n', {
        alias : 'name'
    })
	.options('m', {
        alias : 'map'
    })
    .argv
;
if((!argv.f&&!argv.m)||argv.help){
	console.log("\nSYSLIB Common Font Minification Tool.\t\t\t\tBuild 2013101701.\n");
	console.log("\nMaps are on https://github.com/Sys-Lab/cfmin/tree/master/map .\n");
	console.log("Usage: node cfmin.js "+clc.greenBright("[opitions]")+" "+clc.greenBright("-f [file]")+" "+clc.yellowBright("[-n [name]]")+" "+clc.magentaBright("-m [map]")+"\n");
	console.log("");
	console.log("");
	console.log("\t--no_zip\t\t\tdo not pack");
	console.log("\t--no_css\t\t\tdo not gen css");
	console.log("\t--no_ttf\t\t\tdo not gen ttf");
	console.log("\t--no_svg\t\t\tdo not gen svg");
	console.log("\t--no_eot\t\t\tdo not eot");
	console.log("\t--no_woff\t\t\tdo not gen woff");
	console.log("");
	console.log("");
	return 0;
}
if(!argv.f||!argv.m){
	clcerror("No File Specified !");
	return 1;
}
try{
	//var fdata=readfile(argv.f);
	exec("mkdir output");
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
					savefile('output/'+name+".svg",min_svg(fdata,mdata,name));
					fName_to_conv='output/'+name+".svg";
					if(!argv.no_ttf){
						fList_to_conv.push("ttf");
					}
					if(!argv.no_eot){
						fList_to_conv.push("eot");
					}
					if(!argv.no_woff){
						fList_to_conv.push("woff");
					}
					startconv();
			  }else{
					clcwarn("File Is Empty ! Abort ...")
			  }
		});
	}
	fName_to_conv=0;
	fList_to_conv=[];
	var cleaning=function(){
		if(!argv.no_zip){
				clcnotice("Cleaning ...");
				if(!argv.no_ttf){
					exec("del output/"+name+".ttf");
				}
				if(!argv.no_eot){
					exec("del output/"+name+".eot");
					exec("del output/"+name+".afm");
				}
				if(!argv.no_css){
					exec("del output/"+name+".css");
				}
				if(!argv.no_svg){
					exec("del output/"+name+".svg");
				}
				if(!argv.no_woff){
					exec("del output/"+name+".woff");
				}
				clcallright("Cleaning done.");
		}
		clcallright("All done.");
		return;
	}
	var packing=function(){
		var tt=[ 'a','output/'+name+'.zip'] ;
		if(!argv.no_woff){
			tt.push('output/'+name+'.woff');
		}
		if(!argv.no_ttf){
			tt.push('output/'+name+'.ttf');
		}
		if(!argv.no_svg){
			tt.push('output/'+name+'.svg');
		}
		if(!argv.no_eot){
			tt.push('output/'+name+'.eot');
			tt.push('output/'+name+'.afm');
		}
		if(!argv.no_css){
			tt.push('output/'+name+'.css');
		}
		packer = spawn( 'win32/7z', tt);
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
			if(!argv.no_css){
				clcnotice("Generate CSS ...");
				var opt="@font-face {\n\tfont-family: '"+name+"';\n\t";
				if(!argv.no_eot){
					opt=opt+"src: url('"+name+".eot');\n\t";
				}
				opt=opt+"src: ";
				var tt=[];
				if(!argv.no_woff){
					tt.push("url('"+name+".woff') format('woff')");
				}
				if(!argv.no_ttf){
					tt.push("url('"+name+".ttf') format('truetype')");
				}
				if(!argv.no_svg){
					tt.push("url('"+name+".svg#"+name+"') format('svg')");
				}
				if(!argv.no_eot){
					tt.push("url('"+name+".eot?#iefix') format('embedded-opentype')");
				}
				var cssDATA=opt+(tt.join(","))+";\n}";
				savefile("output/"+name+".css",cssDATA);
				clcallright("CSS done.");
			}
			if(!argv.no_zip){
				clcnotice("Packing ...");
				packing();
			}else{
				cleaning();
			}
			return;
		}
		var nlist=fList_to_conv.shift();
		clcnotice("Output As "+nlist.toUpperCase()+" ...");
		var confont = spawn( 'win32/fontforge', [ "-script" ,"res/gen"+nlist+".pe",fName_to_conv] );
		confont.on( 'exit',startconv );
	}
	clcnotice("File is "+orgext);
	if(orgext=="SVG"){
		coned();
		
		return;
	}
	clcnotice("Converting To SVG ...");
	var consvg = spawn( 'win32/fontforge', [ "-script" ,"res/gensvg.pe",argv.f] );
	consvg.on( 'exit',coned );
}catch(e){
	clcerror("Read File Error !\n"+e);
}


