$(function() {
  $('#form').bootstrapValidator({
    // //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    // excluded: [':disabled', ':hidden', ':not(:visible)'],

    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    //3. 指定校验字段
    fields: {
      //校验用户名，对应name表单的name属性
      username: {
        validators: {
          //不能为空
          notEmpty: {
            message: '用户名不能为空'
          },
          //长度校验
          stringLength: {
            min: 2,
            max: 6,
            message: '用户名长度必须在2到6之间'
          },
          //配置会调提示
          callback: { message: '用户名不存在' }
        }
      },
      password: {
        validators: {
          //不能为空
          notEmpty: {
            message: '密码不能为空'
          },
          //长度校验
          stringLength: {
            min: 6,
            max: 12,
            message: '用户名长度必须在6到12之间'
          },
          //配置会调提示
          callback: { message: '密码错误' }
        }
      }
    }
  })
  // 2.注册表单校验成功事件
  $('#form').on('success.form.bv', function(e) {
    e.preventDefault()
    //使用ajax提交逻辑
    // console.log('a')
    $.ajax({
      type: 'post',
      url: '/employee/employeeLogin',
      data: $('#form').serialize(), //表单序列化
      dataType: 'json',
      success: function(info) {
        // console.log(info)
        if (info.success) {
          location.href = 'index.html'
        }
        if (info.error === 1000) {
          // alert('用户名不存在')
          $('#form')
            .data('bootstrapValidator')
            .updateStatus('username', 'INVALID', 'callback')
        }
        if (info.error === 1001) {
          // alert('密码错误')
          $('#form')
            .data('bootstrapValidator')
            .updateStatus('password', 'INVALID', 'callback')
        }
      }
    })
  })
  // 3,。表单重置功能
  $('[type = "reset"]').click(function() {
    $('#form')
      .data('bootstrapValidator')
      .resetForm()
  })
})
