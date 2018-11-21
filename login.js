// document.addEventListener('DOMContentLoaded', function () {
//     var loginForm = document.forms['login-form'];
//     if (loginForm == null || loginForm['btn-submit'] == null) {
//         alert('Vui lòng thử lại!');
//         return;
//     }
//     loginForm['btn-submit'].onclick = function () {
//         var pwdPassword = loginForm['password'];
//         var txtEmail = loginForm['email'];
//         if (pwdPassword == null || txtEmail == null) {
//             alert('Vui lòng thử lại!');
//             return;
//         }
//         var jsMemberLogin = {
//             password: pwdPassword.value,
//             email: txtEmail.value,
//         }
//         doLogin(jsMemberLogin);
//     }
// });
//
// function doLogin(jsMemberLogin) {
//     var xhr = new XMLHttpRequest();
//     xhr.onreadystatechange = function () {
//         if (this.readyState == 4 && this.status == 201) {
//             var tokenObject = JSON.parse(this.responseText);
//             alert(`Đăng nhập thành công. Token là ${tokenObject.token}`);
//             localStorage.setItem('token-key', tokenObject.token);
//         }
//     }
//     xhr.open('POST', LOGIN_API, true);
//     xhr.setRequestHeader("Content-type", "application/json");
//     xhr.send(JSON.stringify(jsMemberLogin));
// }



var validate = $('#register-form').vaidate({
    rules: {
        email: {
            email: true,
        },
        password: {
            required: true,
        },
    },
    message: {
        email: {
            required: 'Vui lòng nhập email của bạn',
        },
        password: {
            required: 'Vui lòng nhập tên của bạn',
        },
    },
    submitHandler: function(form, event){
        event.preventDefault();
        var senderObject = {
            email: $(form['email']).val(),
            password: $(form['password']).val(),
        };
        $.ajax({
            url: REGISTER_API,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(senderObject),
            beforeSend: function (xhr) {
                xhr.setRequestHeader(localStorage.getItem('token-key'));
            },

            success: function (data, textStatus, jqXHR) {
                console.log('success');
                console.log(data);
                console.log('----');
                console.log(data.responseText);
                console.log('----');
                console.log(textStatus);
                console.log('----');
                console.log(jqXHR);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (Object.keys(jqXHR.responseJSON.error).length > 0) {
                    $('#summary')
                        .text(`Please fix ${Object.keys(jqXHR.responseJSON.error).length} below!`);
                    validator.showErrors(jqXHR.responseJSON.error);
                };
            }
        });
        return false;
    },
});

