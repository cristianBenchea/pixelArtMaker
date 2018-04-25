
$(document).ready(function () {
    const colorPicker = $("#colorPicker");
    const grid = $("#pixel_canvas");
    var gridWidth;
    var gridHeight;
    function draw(){
        $(grid).on("mousedown", "td", function (e) {
            e.preventDefault();
            $(this).css("background-color", currentColor);
        });
        $(grid).on("mousemove", "td", function (e) {
            e.preventDefault();
            if (e.buttons === 1) {
                $(this).css("background-color", currentColor);
            }
        });
    }
    $("#sizePicker").submit(function (e) {

        grid.empty();

        gridHeight = $("#input_height").val();
        gridWidth = $("#input_width").val();


        for (let i = 0; i < gridHeight; i++) {
            let thisRow = $("<tr></tr>");
            for (let j = 0; j < gridWidth; j++)
                thisRow.append('<td class="hover"></td>');
            $("#pixel_canvas").append(thisRow);
        }

        $(".items").css("display", "inline-block");
        $("#tableToImage").css("display", "none");
        e.preventDefault();
        $("table, tr, td").css("border", "1px solid white");
        $("#brush").css("box-shadow", "0 0 10px white");

        draw();
    });


    let currentColor = $(colorPicker).val();

    $(colorPicker).on("change", function () {
        currentColor = $("#colorPicker").val();
    });
    function bindClicks() {
        $("#erase").click(function () {
            currentColor = "RGBA(255,255,255,0)";
            $("#erase").css("box-shadow", "0 0 10px white");
            $("#brush").css("box-shadow", "none");
        });
        $("#brush").click(function () {
            currentColor = $("#colorPicker").val();
            $("#brush").css("box-shadow", "0 0 10px white");
            $("#erase").css("box-shadow", "none");
        });

        $("#addRow").click(function () {
            let addRow = $("<tr></tr>");
            for (let i = 0; i < gridWidth; i++)
                addRow.append('<td class="hover"></td>');
            grid.append(addRow);
            $("#previewDiv").empty();
            $("table, tr, td").css("border", "1px solid white");
        });
        $("#addColumn").click(function () {
            $("#pixel_canvas").find("tr").append('<td class="hover"></td>');
            gridWidth++;
            $("#previewDiv").empty();
            $("table, tr, td").css("border", "1px solid white");
        });
        $('#deleteRow').click(function () {
            $('#pixel_canvas').find('tr').last().remove();
            if ($("#pixel_canvas").find("tr").length === 0 || $("#pixel_canvas").find("tr td").length === 0) {
                $(".items").css("display", "none");
                alert("Create a new grid!");
            }
            $("#previewDiv").empty();
            $("table, tr, td").css("border", "1px solid white");
        });

        $("#deleteColumn").click(function () {
            $("#pixel_canvas").find("tr td:last-child").remove();

            if ($("#pixel_canvas").find("tr").length === 0 || $("#pixel_canvas").find("tr td").length === 0)     {
                $(".items").css("display", "none");
                alert("Create a new grid!");
            }
            gridWidth--;
            $("#previewDiv").empty();
            $("table, tr, td").css("border", "1px solid white");
        });
    }

    bindClicks();
    var getCanvas;
    //Download Table as Image
    $("#previewImage").click(function () {

        if($("#previewImage").text() === "Preview as Image"){
            $(".hover").removeClass("hover");
            $("table, tr, td").css("border", "none");
            $(grid).off("mousedown mousemove mouseover").css("border", "1px solid white");
            $('#addRow, #addColumn, #deleteColumn, #deleteRow').unbind('click');
            $("#previewImage").text("Back to Drawing");
            $("#pixel_canvas").find("*").attr("disabled", "disabled");
            $("#tableToImage").css("display", "inline-block");
            html2canvas(grid, {
                onrendered: function (canvas) {
                    getCanvas = canvas;
                }
            });
        }
        else {
            $("#previewImage").text("Preview as Image");
            $("table, tr, td").css("border", "1px solid white");
            $("table tr td").addClass("hover");
            $(grid).on("mousedown mousemove");
            $("#tableToImage").css("display", "none");
            draw();
            bindClicks();
        }
    });
    $("#tableToImage").click(function () {
        var imageData = getCanvas.toDataURL("image/png");
        var newData = imageData.replace(/^data:image\/png/, "data:application/octet-stream");
        $("#tableToImage").attr("download", "your_pic_name.png").attr("href", newData);
    });
});