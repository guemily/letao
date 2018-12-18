$(function() {
  // 发送ajax 通过模板引擎渲染
  var currentPage = 1
  var pageSize = 5
  render()
  function render() {
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function(info) {
        console.log(info)
        var htmlStr = template('secondTpl', info)
        $('tbody').html(htmlStr)

        // 进行分页初始化
        $('#paginator').bootstrapPaginator({
          // 配置bootstrap版本
          bootstrapMajorVersion: 3,
          // 当前页
          currentPage: info.page,
          // 总页数
          totalPages: Math.ceil(info.total / info.size),
          // 注册每个页码的点击事件
          onPageClicked: function(a, b, c, page) {
            // 重新渲染页面
            currentPage = page
            render()
          }
        })
      }
    })
  }

  //   点击添加分类 显示模态框
  $('.addBtn').click(function() {
    $('#addModal').modal('show')
    $.ajax({
      url: '/category/queryTopCategoryPaging',
      type: 'get',
      data: {
        page: 1,
        pageSize: 100
      },
      success: function(info) {
        var htmlStr = template('dropdownTpl', info)
        $('.dropdown-menu').html(htmlStr)
      }
    })
  })
  //   注册委托事件，给a添加点击事件
  $('.dropdown-menu').on('click', 'a', function() {
    // 选中的文本
    console.log('a')

    var txt = $(this).text()

    // 修改文本内容
    $('#dropdownText').text(txt)
  })

  // 4. 配置图片上传
  $('#fileupload').fileupload({
    // 指定数据类型为 json
    dataType: 'json',
    // done, 当图片上传完成, 响应回来时调用
    done: function(e, data) {
      console.log(data)
      // 获取上传成功的图片地址
      var picAddr = data.result.picAddr
      // 设置图片地址
      $('#imgBox img').attr('src', picAddr)
      // 将图片地址存在隐藏域中
      $('[name="brandLogo"]').val(picAddr)

      // 重置校验状态
      $('#form').data('bootstrapValidator')
      // .updateStatus('brandLogo', 'VALID')
    }
  })
})
