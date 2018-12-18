$(function() {
  var currentPage = 2
  var pageSize = 5
  var currentId //当前修改的用户id
  var isDelete //当前修改的状态
  render()
  function render() {
    $.ajax({
      type: 'get',
      url: '/user/queryUser',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function(info) {
        //   console.log(info)
        var htmlStr = template('tpl', info)
        $('tbody').html(htmlStr)
        //   分页
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: info.page, //当前页
          totalPages: Math.ceil(info.total / info.size), //总页数
          size: 'small', //设置控件的大小，mini, small, normal,large
          onPageClicked: function(event, originalEvent, type, page) {
            //为按钮绑定点击事件 page:当前点击的按钮值
            console.log(page)
            currentPage = page
            render()
          }
        })
      }
    })
  }
  //   按钮添加点击事件
  $('tbody').on('click', '.btn', function() {
    console.log('a')

    $('#userModal').modal('show')
    // 获取存储的id
    currentId = $(this)
      .parent()
      .data('id')
    var isDelete = $(this).hasClass('btn-success') ? 1 : 0
    $('#submitBtn').click(function() {
      $.ajax({
        type: 'post',
        url: '/user/updateUser',
        data: {
          id: currentId,
          isDelete: isDelete
        },
        success: function(info) {
          console.log(info)
          if (info.success) {
            // 关闭模态框
            $('#userModal').modal('hide')
            // 重新渲染
            render()
          }
        }
      })
    })
  })
})
