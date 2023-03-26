const inputs = document.querySelectorAll('.form-control')
const loginForm = document.querySelector('#loginForm')
loginForm.addEventListener('submit', event => {
  //阻止默认事件
  event.preventDefault()
  //   //阻止冒泡事件
  //   event.stopPropagation()
  //表单验证  验证不通过的话不执行下面语句
  for (let i = 0; i < inputs.length; i++) {
    if (!inputs[i].checkValidity()) {
      loginForm.classList.add('was-validated')
    } else {
      let formData = new FormData(loginForm)
      let postData = {}
      postData.username = formData.get('username').trim()
      postData.password = formData.get('password').trim()
      $.ajax({
        url: 'http://127.0.0.1:3007/api/login',
        type: 'POST',
        data: postData,
        success: function (res) {
          if (res.status !== 0) {
            $('#modalMsg').text(res.message)
            $('#btn').click()
          } else {
            localStorage.setItem('token', res.token)
            $('#modalMsg').text('登陆成功!')
            $('#btn').click()
            window.location.href = 'index.html'
          }
        },
      })
      loginForm.reset()
    }
  }
})
