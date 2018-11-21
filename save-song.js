document.addEventListener('DOMContentLoaded', function () {
    var songForm = document.forms['song-form'];
    if (songForm == null || songForm['btn-submit'] == null) {
        alert('Vui lòng thử lại!');
        return;
    }
    songForm['btn-submit'].onclick = function () {
        var txtName = songForm['name'];
        var txtDescription = songForm['description'];
        var txtSinger = songForm['singer'];
        var txtAuthor = songForm['author'];
        var txtThumbnail = songForm['thumbnail'];
        var txtLink = songForm['link'];
        if (txtName == null
            || txtDescription == null
            || txtSinger == null
            || txtAuthor == null
            || txtThumbnail == null
            || txtLink == null) {
            alert('Vui lòng thử lại!');
            return;
        }

        var jsSong = {
            name: txtName.value,
            description: txtDescription.value,
            singer: txtSinger.value,
            author: txtAuthor.value,
            thumbnail: txtThumbnail.value,
            link: txtLink.value
        }
        createSong(jsSong);
    }
});

function createSong(jsSong) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 201) {
            var song = JSON.parse(this.responseText);
            alert(`Lưu thành công bài hát ${song.name}`);
        } else if (this.readyState == 4 && (this.status == 401 || this.status == 403)) {
            alert('This action required logged in to continue!')
            window.location.href = "login.html";
        }
    }
    xhr.open('POST', CREATE_SONG_API, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("Authorization", "Basic " + localStorage.getItem('token-key'));
    xhr.send(JSON.stringify(jsSong));
}



