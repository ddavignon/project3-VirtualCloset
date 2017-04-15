
 $(document).ready(function(){
        // click on button submit
        $("#submit").on('click', function(){
            // send ajax
            $.ajax({
                url: 'https://blockwood-blockwood.c9users.io/auth', // url where to submit the request
                processData: false,
                type : "POST", // type of action POST || GET
                contentType: 'application/json',
                data : JSON.stringify(
            [{username: $("#username"), password: $("#password")}, 
        ]), // post data || get data
                dataType:"json",
                success : function(result) {
                    // you can see the result from the console
                    // tab of the developer tools
                    console.log(result);
                },
                error: function(xhr, resp, text) {
                    console.log(xhr, resp, text);
                }
            })
        });
    });
