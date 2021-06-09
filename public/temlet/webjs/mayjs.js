 $('#supmit').click(function(event){
        var trangthai = $('#trangthai').val();
        var vitri = $('#vitri').val();
        if(trangthai==""){
        $("#trangthai").css('border-color','red');
        $("#trangthai").addClass("is-invalid");
        $("#trangthaierrr").text("Trạng thái không được để trống!!"); 
        }
        if(vitri==""){
          $("#vitri").css('border-color','red');
          $("#vitri").addClass("is-invalid");
        $("#vitrierrr").text("Vị trí không được để trống !!"); 
        }
        if(trangthai!=""&&vitri!=""){
          $('#myform').submit();
        }
      });