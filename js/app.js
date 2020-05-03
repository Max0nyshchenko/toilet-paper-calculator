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

// RAIN ANIMATION

// class
class Drop {
  constructor(xPosition, yPosition, dropSpeed, dropWidth, dropHeight) {
    this.xPosition = xPosition;
    this.yPosition = yPosition;
    this.dropSpeed = dropSpeed;
    this.dropWidth = dropWidth;
    this.dropHeight = dropHeight;
    this.element;
  }

  show() {
    this.element = document.createElement('div');
    this.element.className += 'rainDrop';
    this.element.style.top = this.yPosition + 'px';
    this.element.style.left = this.xPosition + 'px';
    this.element.style.width = this.dropWidth / 2 + 'px';
    this.element.style.height = this.dropHeight + 'px';

    let el = document.getElementById('drop-section');
    el.appendChild(this.element);
  }

  fall() {
    const makeItRain = () => {
      this.yPosition += this.dropSpeed;
      this.element.style.top = this.yPosition + 'px';

      if (this.yPosition < window.innerHeight * 2) {
        requestAnimationFrame(makeItRain);
      } else {
        this.yPosition = -10;
        requestAnimationFrame(makeItRain);
      }
    };

    requestAnimationFrame(makeItRain);
  }
}

// complete rain
const pageWidth = window.innerWidth;
const pageHeight = window.innerHeight;
const defaultDropNumber = 300;

function makeItRain(num) {
  let elments = document.getElementById('drop-section');

  while (elments.hasChildNodes()) {
    elments.removeChild(element.lastChild);
  }

  for (let i = 0; i < num; i++) {
    let randomX = Math.floor(Math.random() * pageWidth);
    let randomY = Math.floor(Math.random() * pageHeight);
    let dropSpeed = Math.floor(Math.random() * (25 - 5)) + 1;
    let dropWidht = Math.floor(Math.random() * (dropSpeed / 10 - 1)) + 1;
    let dropHeight = Math.floor(Math.random() * (dropSpeed * 2 - 3)) + 3;
    let d = new Drop(randomX, randomY, dropSpeed, dropWidht, dropHeight);

    d.show();
    d.fall();
  }
}

makeItRain(defaultDropNumber);
