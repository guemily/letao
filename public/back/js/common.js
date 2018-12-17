$(document).ajaxStart(function() {
  NProgress.start()
  //   console.log(a)
})
$(document).ajaxStop(function() {
  NProgress.done()
  //   console.log(a)
})
$(function() {
  // 1. 二级分类切换功能
  $('.category').click(function() {
    $(this)
      .next()
      .stop()
      .slideToggle()
  })

  // 2. 顶部菜单栏切换显示功能
  $('.pull-left').click(function() {
    $('.lt_aside').toggleClass('hidemenu')
    $('.lt_main').toggleClass('hidemenu')
    $('.lt_topbar').toggleClass('hidemenu')
  })

  // 3. 点击退出图标显示退出模态框
  $('.pull-right').click(function() {
    // 让模态框显示
    console.log('a')

    $('#myModal').modal('show')
  })

  // 4. 在外面注册 logoutBtn 退出按钮, 点击事件
  $('#logoutBtn').click(function() {
    console.log('hehe')

    // 访问退出接口, 进行退出
    $.ajax({
      url: '/employee/employeeLogout',
      type: 'GET',
      dataType: 'json',
      success: function(info) {
        if (info.success) {
          location.href = 'login.html'
        }
      }
    })
  })
})
