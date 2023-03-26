let arr = [
  {
    id: 2150361548,
    name: '张三',
    English: 54,
    Math: 64,
    Computer: 64,
    MySql: 88,
    Digital: 67,
    Circuitry: 99,
  },
  {
    id: 2150331548,
    name: '李四',
    English: 44,
    Math: 64,
    Computer: 64,
    MySql: 56,
    Digital: 60,
    Circuitry: 60,
  },
  {
    id: 2156261548,
    name: '王五',
    English: 54,
    Math: 64,
    Computer: 64,
    MySql: 98,
    Digital: 67,
    Circuitry: 99,
  },
  {
    id: 2150361569,
    name: '赵六',
    English: 54,
    Math: 64,
    Computer: 64,
    MySql: 58,
    Digital: 67,
    Circuitry: 99,
  },
  {
    id: 2150361537,
    name: '谢八',
    English: 54,
    Math: 64,
    Computer: 64,
    MySql: 82,
    Digital: 67,
    Circuitry: 99,
  },
]
let searchInput = document.querySelector('#searchUser')
let searchBtn = document.querySelector('#searchBtn')
let tobody = document.querySelector('.rander')
let resetBtn = document.querySelector('#resetBtn')
let addUser = document.querySelector('.addUser')
let addUserBtn = document.querySelector('.addUserBtn')
let closeBtn = document.querySelector('.addUser .closeBtn')
let myForm = document.querySelector('#myForm')
let postBtn = document.querySelector('.addUser .postBtn')

let token = localStorage.getItem('token')
if (!token) {
  window.location.href = 'login.html'
}
$('.sidebar-toggler').click(function () {
  $('.sidebar,.content').toggleClass('open')
  return false
})

// 获取用户信息
function getUserInfo() {
  $.ajax({
    url: 'http://127.0.0.1:3007/my/userinfo',
    type: 'GET',
    headers: {
      Authorization: localStorage.getItem('token'),
    },
    success: function (res) {
      // console.log(res)
      if (res.status !== 0) {
        alert(res.message)
      } else {
        $('#userPic').attr('src', res.data.user_pic)
        $('#nickname').text(res.data.nickname || res.data.username)
      }
    },
  })
}
getUserInfo()
rander(arr)
// 退出登录
$('#outLogin').click(function () {
  localStorage.setItem('token', '')
  window.location.href = 'login.html'
})

// 获取添加信息
postBtn.addEventListener('click', function () {
  let formData = new FormData(myForm)
  let name = formData.get('name')
  // console.log(formData)
  let userData = {}
  let r = /^\+?[1-9][0-9]*$/
  if (!r.test(formData.get('id'))) {
    alert('请输入数字')
    return
  }
  if (!r.test(formData.get('English'))) {
    alert('请输入数字')
    return
  }
  if (!r.test(formData.get('Computer'))) {
    alert('请输入数字')
    return
  }
  if (!r.test(formData.get('MySql'))) {
    alert('请输入数字')
    return
  }
  if (!r.test(formData.get('Digital'))) {
    alert('请输入数字')
    return
  }
  if (!r.test(formData.get('Circuitry'))) {
    alert('请输入数字')
    return
  }

  userData.id = Number(formData.get('id'))
  userData.name = formData.get('name')
  userData.English = Number(formData.get('English'))
  userData.Math = Number(formData.get('Math'))
  userData.Computer = Number(formData.get('Computer'))
  userData.MySql = Number(formData.get('MySql'))
  userData.Digital = Number(formData.get('Digital'))
  userData.Circuitry = Number(formData.get('Circuitry'))
  // console.log(userData)
  arr.push(userData)
  rander(arr)
  myForm.reset()
})
// 给查询框绑定查询事件
searchBtn.addEventListener('click', function () {
  let newArr = []
  let inputVal = Number(searchInput.value)
  // arr.forEach(item => {
  //   if (item.id === inputVal) {
  //     newArr.push(item)
  //   }
  // })
  newArr.push(arr.find(item => item.id === inputVal))
  // console.log(inputVal)
  console.log(newArr)
  searchInput.value = ''
  if (newArr[0] !== undefined) {
    rander(newArr)
  }
})
// 重置按钮
resetBtn.addEventListener('click', function () {
  rander(arr)
  input.value = ''
})
//  添加按钮
addUserBtn.addEventListener('click', function () {
  addUser.classList.toggle('active')
})
// 取消按钮
closeBtn.addEventListener('click', () => {
  addUser.classList.remove('active')
})
// 渲染函数
function rander(arr) {
  // console.log(arr)
  let str = ''
  arr.forEach((item, index) => {
    let zongfen = 0
    let status = 'success'
    let evaluate = '及格'
    zongfen += item.English + item.Math + item.Circuitry + item.Computer + item.Digital + item.MySql
    if (zongfen < 360) {
      status = 'danger'
      evaluate = '不及格'
    }
    str += `
                      <tr>
                          <th scope="row">${index + 1}</th>
                          <td>${item.id}</td>
                          <td>${item.name}</td>
                          <td>${item.English}</td>
                          <td>${item.Math}</td>
                          <td>${item.Computer}</td>
                          <td>${item.MySql}</td>
                          <td>${item.Digital}</td>
                          <td>${item.Circuitry}</td>
                          <td>${zongfen}</td>
                          <td>
                              <span class="badge text-bg-${status}">${evaluate}</span>
                          </td>
                        </tr>`
  })
  tobody.innerHTML = str
}
