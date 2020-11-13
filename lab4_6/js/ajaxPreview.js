$('#xml-btn').click(function () {
    $.ajax({
        type: "GET",
        url: "data.xml",
        dataType: "xml",
        success: function (xml) {
            $(xml).find('man').each(function () {
                document.writeln($(this).attr("id"))
                $(this).find('name').each(function () {
                    document.writeln($(this).text())
                })
            })
        }
    })
})

function f(n) {
    $.getJSON('data.json', {}, function (json) {
        $("#username").val(json["data"][n].name)
        $("#userage").val(json["data"][n].age)
    })
}

function loadTxt(txt) {
    var xmlhttp;
    if (window.XMLHttpRequest) {
        // код для IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else  {
        // код для IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            document.getElementById('load-text').innerHTML = xmlhttp.responseText;
        }
    }
    xmlhttp.open("GET", 'resources/' + txt + ".txt",true);
    xmlhttp.send();
}