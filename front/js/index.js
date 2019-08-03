(function() {
  function printWidget(widget) {
    const gallery = $(".gallery");
    let color = widget.color ? widget.color : '#2d9bad';
    let width = getNumber();
    let height = getNumber();
    $(".gallery").append('<a class="widget open-modal" id="' + widget._id.$oid + '" name="' + color + '" title="' + widget.title +'" style="background-color: ' + color + '; width: ' + width + '; height: ' + height + '"></a>');
  }

  function printWidgets(widgets){
    widgets.forEach(function(widget, index){
      printWidget(widget);    
    });
  }

  function getNumber() {
    let control = true;
    let number = 0;
    while (control) {
      number = Math.round((Math.random() + 1) * 200 );
      if(number >= 100 && number % 2 == 0) {
        control = false;
      }     
    }
    return number;
  }

  function getImages() {
    $.ajax({
        url: "http://localhost:8000/api/v1/widgets", 
        success: function(data){
          printWidgets(data);
    }});
  };
  $(document).on('click', '.open-modal', function() {
    $('.modal').addClass('show-modal');
    if (this.id) {
      var widget = this;
      $('.modal-title').html('<h1>Editar<h1>');
      $('.delete').show();
      $('.title').val(widget.title);
      $('.color').val(widget.name); // color
      $('.color').css('backgroundColor', widget.name); //color
      $('.confirm').on('click', function() {
        var data = {
          title: $('.title').val(),
          color: $('.color').val()
        }
        $.ajax({
          url: "http://localhost:8000/api/v1/widget/" + widget.id,
          method:'POST', 
          data: data,
          success: function(response){
            $(widget).attr('title', response.title);
            $(widget).attr('name', response.color);
            $(widget).css('backgroundColor', response.color);
            $('.modal').removeClass('show-modal');
          },
          error: function(response) {
            alert(response);
          }
        });
      });

      $('.delete').on('click', function() {
        var option = confirm("Seguro quieres eleiminar este Widget?")
        if (option) {
          $.ajax({
            url: "http://localhost:8000/api/v1/widget/" + widget.id,
            method:'DELETE', 
            success: function(response){
              $(widget).remove();
              $('.modal').removeClass('show-modal');
            },
            error: function(response) {
              alert(response);
            }
          });
        }
      });

    } else {
      $('.modal-title').html('<h1>Agreager Nuevo<h1>');
      $('.delete').hide();
      $('.confirm').on('click', function() {
        var data = {
          title: $('.title').val(),
          color: $('.color').val()
        }
        if (data.title == '') {
          alert('El widget debe tener titulo');
          return;
        }
        $.ajax({
          url: "http://localhost:8000/api/v1/widget/",
          method:'POST', 
          data: data,
          success: function(response){
            data._id = response;
            printWidget(data);
            $('.modal').removeClass('show-modal');
          },
          error: function(response) {
            alert(response);
          }
        });
      });
    }
  });
  $('.close-button').on('click', function() {
    $('.modal').removeClass('show-modal');
  });
  $(document).ready(function() {    
    getImages();
    $('.color').ColorPicker({
      color: '#0000ff',
      onShow: function (colpkr) {
        $(colpkr).fadeIn(500);
        return false;
      },
      onHide: function (colpkr) {
        $(colpkr).fadeOut(500);
        return false;
      },
      onChange: function (hsb, hex, rgb) {
        $('.color').val('#' + hex);
        $('.color').css('backgroundColor', '#' + hex);
      }
    });
  });
})();