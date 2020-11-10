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