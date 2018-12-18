$(function(){
	listBooks('./../../json/nvi.json');
	listCaps('./../../json/nvi.json');
	listTitle('./../../json/nvi.json');
	readJson('./../../json/acf.json', '#acf', getUrlVars()['book'], getUrlVars()['chapter']);
 	readJson('./../../json/nvi.json', '#nvi', getUrlVars()['book'], getUrlVars()['chapter']);
});

console.log();

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function listBooks(file) {
	$.get(file, function(data) {
		data.forEach(function(o, index) {
			$('#list-books').append('<li><a href="?book='+index+'">'+o.name+'</a></li>');
		});
	});

	return ;
}

function listCaps(file) {
	var book = getUrlVars()['book'];
	var chapters = '';

	$.get(file, function(data) {
		var bookCurrent = data[book];

		for(var i = 0; i < bookCurrent.chapters.length; i++) {
			chapters += '<li class="list-inline-item"><a href="?book='+book+'&chapter='+i+'">'+ (i+1) +'</a></li>';
		}

		$('#list-caps').append(chapters);
	});

	return ;
}

function listTitle(file) {
	var book = getUrlVars()['book'];
	var chapter = getUrlVars()['chapter'];

	chapter = parseInt(chapter);

	$.get(file, function(data) {
		var bookCurrent = data[book];

		$('#book-title').append(bookCurrent.name + ' <small>'+ (chapter+1) +'</small>');
	});

	return ;
}

function readJson(file, local, book=0, chapter=0){
	if(!book) book = 0;
	if(!chapter) chapter = 0;

	chapter = parseInt(chapter);

	$.get(file, function(data) {
		var content = '',
			options = '',
			chapters = '';

		var bookCurrent = data[book];

		bookCurrent.chapters.slice(chapter, (chapter+1)).forEach(function(o, index) {
			o.forEach(function(v, index) {
				options += '<p><small>'+(index+1)+'.</small> <span>'+v+'</span></p>';
			});
		});
		content += '<div>'+options+'</div>';
		$(local).append('<div class="list-item">'+content+'</div>');
	});

	return ;
}