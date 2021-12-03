        $('#exampleModal').on('show.bs.modal', function(event) {
            var button = $(event.relatedTarget) // Button that triggered the modal
            var recipient = button.data('id') // Extract info from data-* attributes
            var imge = button.data('filename1')
            var titleModal = button.data('title')
            var descriptModal = button.data('description1')
            var yearModal = button.data('dateTrue')
            var typeModal = button.data('typeTrue')
                console.log(recipient)

            //   If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
            //   Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
            var modal = $(this)
            modal.find('.modal-title').html(titleModal)
            // modal.find('.col-md-5').html('<img id="image2" src= "' + imge + '"></img>')
            modal.find('img').attr("src", imge)
            // modal.find('.modal-year').text(yearModal)
            // modal.find('.modal-type').text(typeModal)
            modal.find('.col-md-6').html('<strong>' + yearModal + '</strong>' + '<br>' + typeModal + '<br>' + descriptModal)
                magnify("imageMagnify", 1.5);

        })