$(function () {
  function calculate() {
    const total = Number($('#total-length').val()) * 100;
    let usedPerDay = 0;
    let result = 0;

    $('.control_input', '#users-list').each(function (index, item) {
      usedPerDay += Number($(item).val());
    });

    if ($('.active').data('type') === 'paper') {
      const paperCount = total / $('#paper-length').val();
      result = paperCount / usedPerDay;
    } else {
      result = total / usedPerDay;
    }

    $('#result').html(result.toFixed(0));
  }

  function generateUsers() {
    $('#users-list').empty();

    const currentType =
      $('.active').data('type') === 'paper'
        ? { unit: 'Leaflets', defaultValue: '1' }
        : {
            unit: 'centimeters',
            defaultValue: '10',
          };

    for (let i = 1; i <= $('#users-count').val(); i++) {
      $('#users-list').append(
        `
          <div class="form-group row">
          <div class="form-group_title">
            Person ${i} (${currentType.unit})
          </div>
          <div class="form-group_control control">
            <input type="text" class="control_input" value=${currentType.defaultValue} />
          </div>
        </div>
          `
      );
    }
    calculate();
  }

  $('#users-count').blur(generateUsers);
  $('#total-length, #paper-length').blur(calculate);

  $('body').on('change', '#users-list .control_input', function () {
    calculate();
  });

  $('.control_button').click(function () {
    $(this).addClass('active').siblings().removeClass('active');

    // paper-length-block

    if ($(this).data('type') === 'paper') {
      $('#paper-length-block').removeClass('hidden');
    } else {
      $('#paper-length-block').addClass('hidden');
    }

    generateUsers();
  });

  generateUsers();
  calculate();
});
