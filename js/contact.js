const emailRegex = /^([a-z0-9](?!.*([\.\-\_]{2,}))[a-z0-9\.\-\_]+[a-z0-9]|[a-z0-9]{1,2})@([a-z0-9\-]+\.[a-z]+|\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\]|\[ipv6:([a-f0-9]{1,4}|):(([a-f0-9]{1,4}|):){2,6}([a-f0-9]{1,4}|)\])$/i

function verifyEmail() {
    let email = document.getElementById('email').value;
    console.log('email updated');
    if (!emailRegex.test(email)) {
        console.log('email failed test')
        document.getElementById('bademail').style.display = 'block';
        return false;
    } else {
        console.log('email test passed')
        document.getElementById('bademail').style.display = 'none';
        return email;
    }
}

function submitForm() {
    let email = verifyEmail();
    let name = document.getElementById('name').value;
    let message = document.getElementById('message').value;

    if (!name) document.getElementById('badname').style.display = 'inline';
    else document.getElementById('badname').style.display = 'none';
    if (!message) document.getElementById('badmessage').style.display = 'inline';
    else document.getElementById('badmessage').style.display = 'none';
    
    if (!email || !name || !message) return;
    message = `Email: ${email}\n${message}`;
    console.log(name, message)

    $.ajax({
        method: 'POST',
        url: 'https://formsubmit.co/ajax/rebeccakayanleeaudio@gmail.com',
        dataType: 'json',
        accepts: 'application/json',
        data: {
            name,
            message
        },
        success: (data) => {
            document.getElementById('main').innerHTML = "<div style='text-align: center'><h3>Contact</h3>Thank you for sending your query.  I will try to get back to you as soon as possible.</div>"
            console.log(data);
        },
        error: (err) => {
            console.log(err)
        }
    });
}