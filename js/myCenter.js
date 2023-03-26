let userInfo = {}

$('.sidebar-toggler').click(function () {
  $('.sidebar,.content').toggleClass('open')
  return false
})

let token = localStorage.getItem('token')
if (!token) {
  window.location.href = 'login.html'
}
// 获取用户信息
function getUserInfo() {
  $.ajax({
    url: 'http://127.0.0.1:3007/my/userinfo',
    type: 'GET',
    headers: {
      Authorization: localStorage.getItem('token'),
    },
    success: function (res) {
      //   console.log(res)
      if (res.status !== 0) {
        alert(res.message)
      } else {
        userInfo = res.data
        randomUserInfo()
      }
    },
  })
}

getUserInfo()

function randomUserInfo() {
  console.log(userInfo)
  $('#userPic').attr('src', userInfo.user_pic)
  $('#nickname').text(userInfo.nickname || userInfo.username)
  $('#userName').val(userInfo.username)
  $('#email').val(userInfo.email)
  $('#nickName').val(userInfo.nickname)
}
// 退出登录
$('#outLogin').click(function () {
  localStorage.setItem('token', '')
  window.location.href = 'login.html'
})
